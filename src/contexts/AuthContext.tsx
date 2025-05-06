import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContextType, User } from '../types';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { app, db } from '../firebase';

const auth = getAuth(app);

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Firestoreからユーザー情報を取得
  const fetchUserData = async (uid: string) => {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as User;
    }
    return null;
  };

  // Firestoreにユーザー情報を保存
  const saveUserData = async (uid: string, userData: Partial<User>) => {
    await setDoc(doc(db, 'users', uid), {
      ...userData,
      updatedAt: serverTimestamp()
    }, { merge: true });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Firestoreからユーザー情報を取得
        let userData = await fetchUserData(firebaseUser.uid);
        
        if (!userData) {
          // 新規ユーザーの場合、初期データを作成
          userData = {
            id: firebaseUser.uid,
            username: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'user',
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'user',
            email: firebaseUser.email || '',
            avatar: firebaseUser.photoURL || 'https://images.pexels.com/photos/1074882/pexels-photo-1074882.jpeg?auto=compress&cs=tinysrgb&w=600',
            bio: '',
            joinDate: new Date(firebaseUser.metadata.creationTime || Date.now()),
            isPremium: false,
            savedPosts: [],
            following: [],
            followers: [],
            createdAt: serverTimestamp()
          };
          // Firestoreに保存
          await saveUserData(firebaseUser.uid, userData);
        }
        
        setUser(userData);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    try {
      setIsLoading(true);
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(firebaseUser, { displayName: username });
      
      // 新規ユーザーの初期データを作成
      const userData: User = {
        id: firebaseUser.uid,
        username,
        displayName: username,
        email,
        avatar: 'https://images.pexels.com/photos/1074882/pexels-photo-1074882.jpeg?auto=compress&cs=tinysrgb&w=600',
        bio: '',
        joinDate: new Date(),
        isPremium: false,
        savedPosts: [],
        following: [],
        followers: [],
        createdAt: serverTimestamp()
      };
      
      // Firestoreに保存
      await saveUserData(firebaseUser.uid, userData);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
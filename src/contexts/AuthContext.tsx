import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { User } from '../types/firestore';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          let userData: User;

          if (userDoc.exists()) {
            userData = userDoc.data() as User;
          } else {
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
              createdAt: serverTimestamp() as Timestamp
            };

            await setDoc(doc(db, 'users', firebaseUser.uid), userData);
          }

          setUser(userData);
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError('ユーザーデータの取得に失敗しました');
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error('Login error:', err);
      setError('ログインに失敗しました');
      throw err;
    }
  };

  const signup = async (email: string, password: string, displayName: string) => {
    try {
      setError(null);
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(firebaseUser, { displayName });
      
      const userData: User = {
        id: firebaseUser.uid,
        username: displayName,
        displayName,
        email: firebaseUser.email || '',
        avatar: firebaseUser.photoURL || 'https://images.pexels.com/photos/1074882/pexels-photo-1074882.jpeg?auto=compress&cs=tinysrgb&w=600',
        bio: '',
        joinDate: new Date(firebaseUser.metadata.creationTime || Date.now()),
        isPremium: false,
        savedPosts: [],
        following: [],
        followers: [],
        createdAt: serverTimestamp() as Timestamp
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
    } catch (err) {
      console.error('Signup error:', err);
      setError('アカウント作成に失敗しました');
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
      setError('ログアウトに失敗しました');
      throw err;
    }
  };

  const updateUserProfile = async (data: Partial<User>) => {
    if (!user) return;

    try {
      setError(null);
      const userRef = doc(db, 'users', user.id);
      await setDoc(userRef, {
        ...data,
        updatedAt: serverTimestamp()
      }, { merge: true });

      setUser(prev => prev ? { ...prev, ...data } : null);
    } catch (err) {
      console.error('Profile update error:', err);
      setError('プロフィールの更新に失敗しました');
      throw err;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    signup,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
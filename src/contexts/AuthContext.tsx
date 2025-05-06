import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContextType, User } from '../types';

// Mock user data for demo purposes
const mockUser: User = {
  id: '1',
  username: 'kitsune_lover',
  displayName: 'Kitsune Fan',
  email: 'demo@kitsunote.com',
  avatar: 'https://images.pexels.com/photos/1074882/pexels-photo-1074882.jpeg?auto=compress&cs=tinysrgb&w=600',
  bio: 'Fox enthusiast and shrine explorer from Kyoto',
  joinDate: new Date('2023-05-12'),
  isPremium: true,
  savedPosts: ['1', '2', '3'],
  following: ['2', '3'],
  followers: ['2', '4', '5']
};

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

  useEffect(() => {
    // Simulate checking for stored authentication
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('kitsunoteUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // This is a mock login - in a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setUser(mockUser);
      localStorage.setItem('kitsunoteUser', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    try {
      setIsLoading(true);
      // This is a mock signup - in a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      const newUser = { ...mockUser, email, username, displayName: username };
      setUser(newUser);
      localStorage.setItem('kitsunoteUser', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kitsunoteUser');
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
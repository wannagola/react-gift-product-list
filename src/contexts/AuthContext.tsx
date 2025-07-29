import { createContext, useState, useEffect, ReactNode } from 'react';
import {
  getUserFromStorage,
  setUserToStorage,
  clearUserStorage,
} from '@/utils/localStorage';

export type User = {
  email: string;
  name: string;
  authToken: string;
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = getUserFromStorage();
    if (stored) setUser(stored);
    setIsLoading(false);
  }, []);

  const login = (u: User) => {
    setUser(u);
    setUserToStorage(u);
  };

  const logout = () => {
    setUser(null);
    clearUserStorage();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

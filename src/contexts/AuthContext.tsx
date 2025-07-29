import { createContext, useState, useEffect } from 'react';
import {
  getUserFromStorage,
  setUserToStorage,
  clearUserStorage,
} from '@/utils/localStorage';
import type { ReactNode } from 'react';

export type User = {
  email: string;
  name: string;
  authToken: string;
};

type AuthContextType = {
  user: User | null;
  login: (params: { email: string; password: string }) => Promise<void>;
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

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    // 응답 JSON 파싱을 구현한 부분입니다.
    const json = await response.json().catch(() => null);

    if (!response.ok || !json?.data) {
      const msg = json?.data?.message ?? '로그인에 실패했습니다.';
      throw new Error(msg);
    }

    const { email: userEmail, name, token } = json.data;
    const userInfo: User = {
      email: userEmail,
      name,
      authToken: token,
    };

    setUser(userInfo);
    setUserToStorage(userInfo);
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

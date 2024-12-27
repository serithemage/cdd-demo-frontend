'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { AuthContextType, AuthUser, SignInData, SignUpData } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      const token = (await Auth.currentSession()).getIdToken().getJwtToken();
      
      setUser({
        id: userData.attributes.sub,
        email: userData.attributes.email,
        token,
      });
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function signUp({ email, password }: SignUpData) {
    try {
      setError(null);
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },
      });
    } catch (error: any) {
      setError(error.message || '회원가입 중 오류가 발생했습니다.');
      throw error;
    }
  }

  async function verifyEmail(email: string, code: string) {
    try {
      setError(null);
      await Auth.confirmSignUp(email, code);
    } catch (error: any) {
      setError(error.message || '이메일 인증 중 오류가 발생했습니다.');
      throw error;
    }
  }

  async function signIn({ email, password }: SignInData) {
    try {
      setError(null);
      const userData = await Auth.signIn(email, password);
      const token = (await Auth.currentSession()).getIdToken().getJwtToken();
      
      setUser({
        id: userData.attributes.sub,
        email: userData.attributes.email,
        token,
      });
    } catch (error: any) {
      setError(error.message || '로그인 중 오류가 발생했습니다.');
      throw error;
    }
  }

  async function signOut() {
    try {
      setError(null);
      await Auth.signOut();
      setUser(null);
    } catch (error: any) {
      setError(error.message || '로그아웃 중 오류가 발생했습니다.');
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        signUp,
        signIn,
        signOut,
        verifyEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

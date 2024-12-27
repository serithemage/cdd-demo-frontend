'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [needsVerification, setNeedsVerification] = useState(false);
  const { signIn, signUp, verifyEmail, error } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (needsVerification) {
        await verifyEmail(email, verificationCode);
        setNeedsVerification(false);
        await signIn({ email, password });
        router.push('/');
        return;
      }

      if (isSignUp) {
        await signUp({ email, password });
        setNeedsVerification(true);
      } else {
        await signIn({ email, password });
        router.push('/');
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            {needsVerification
              ? '이메일 인증'
              : isSignUp
              ? '회원가입'
              : '로그인'}
          </h1>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {needsVerification ? (
            <Input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="인증 코드"
              label="인증 코드"
              required
              fullWidth
            />
          ) : (
            <>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일"
                label="이메일"
                required
                fullWidth
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                label="비밀번호"
                required
                fullWidth
              />
            </>
          )}

          <Button type="submit" fullWidth>
            {needsVerification
              ? '인증하기'
              : isSignUp
              ? '회원가입'
              : '로그인'}
          </Button>
        </form>

        {!needsVerification && (
          <div className="text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              {isSignUp
                ? '이미 계정이 있으신가요? 로그인하기'
                : '계정이 없으신가요? 회원가입하기'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { AuthProvider } from '@/contexts/AuthContext';
import '@/lib/amplify';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todo 앱',
  description: 'Next.js로 만든 Todo 앱입니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-gray-900 transition-colors dark:bg-gray-900 dark:text-gray-100`}>
        <AuthProvider>
          <ThemeProvider>
            <ThemeToggle />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

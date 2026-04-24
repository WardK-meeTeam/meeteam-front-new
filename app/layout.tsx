import type { Metadata } from 'next';
import { Jua } from 'next/font/google';
import LoginPromptModal from '@/components/features/auth/LoginPromptModal';
import ToastViewport from '@/components/shared/ToastViewport';

import './globals.css';

const jua = Jua({
  variable: '--font-brand-display',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'meeTeam',
  description: '대학생 프로젝트 팀원을 찾고 연결하는 meeTeam',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${jua.variable} antialiased`}>
        {children}
        <LoginPromptModal />
        <ToastViewport />
      </body>
    </html>
  );
}

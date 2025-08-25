import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { TRPCProvider } from '@/lib/trpc/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'متجر شي-إن | Shein Clone',
  description: 'أفضل مكان لشراء الأزياء العصرية | The best place to buy modern fashion',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}

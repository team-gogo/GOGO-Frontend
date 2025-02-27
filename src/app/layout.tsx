import '../shared/styles/globals.css';
import TanstackProviders from '@/shared/libs/TanstackProviders';
import { gmarketSans } from '@/shared/styles/fonts';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={gmarketSans.variable}>
      <body>
        <TanstackProviders>{children}</TanstackProviders>
      </body>
    </html>
  );
}

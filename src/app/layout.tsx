import GoogleAnalytics from '@/shared/libs/GoogleAnalytics';
import TanstackProviders from '@/shared/libs/TanstackProviders';
import ToastProvider from '@/shared/libs/ToastProvider';
import '../shared/styles/globals.css';
import { suit } from '@/shared/styles/fonts';
import InspectionModal from '@/shared/ui/InspectionModal';
import { cn } from '@/shared/utils/cn';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GOGO',
  description: 'GOGO는 학교 스포츠를 관리하는 플랫폼 입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={suit.variable}>
      <body className={cn('min-h-screen')}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <TanstackProviders>
          <ToastProvider>
            {children}
            {process.env.NEXT_PUBLIC_IS_INSPECTION === 'true' && (
              <InspectionModal service="GOGO" />
            )}
          </ToastProvider>
        </TanstackProviders>
      </body>
    </html>
  );
}

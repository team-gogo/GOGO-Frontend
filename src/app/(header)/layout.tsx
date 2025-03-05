import Header from '@/shared/ui/header';
import { cn } from '@/shared/utils/cn';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className={cn('w-full', 'h-full')}>{children}</main>
    </>
  );
}

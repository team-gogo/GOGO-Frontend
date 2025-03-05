import Header from '@/shared/ui/header';
import { cn } from '@/shared/utils/cn';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <main className={cn('w-full', 'flex-grow', 'overflow-auto')}>
        {children}
      </main>
    </div>
  );
}

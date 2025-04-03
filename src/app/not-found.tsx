import Image from 'next/image';
import Link from 'next/link';
import { RightArrowIcon } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

export default function NotFound() {
  return (
    <div
      className={cn('flex', 'min-h-screen', 'items-center', 'justify-center')}
    >
      <div
        className={cn(
          'max-w-[417px]',
          'flex',
          'flex-col',
          'items-center',
          'px-16',
        )}
      >
        <Image src="/404Logo.png" alt="404" width={417} height={300} />
        <div className={cn('flex', 'items-center', 'gap-16')}>
          <Link href="/stage" className={cn('text-main-600', 'text-body1s')}>
            홈페이지로 바로가기
          </Link>
          <RightArrowIcon color="#2F52FE" size="32" />
        </div>
      </div>
    </div>
  );
}

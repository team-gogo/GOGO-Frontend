'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';
import SetTimeContainer from '@/widgets/stage/time/ui/SetTimeContainer';

const SetTimePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const matchId = searchParams.get('matchId');

  const handleConfirm = () => {
    if (matchId) {
      sessionStorage.setItem(`isConfirmed_${matchId}`, 'true');
      setTimeout(() => {
        router.push(`/stage`);
      }, 100);
    } else {
      router.push(`/stage`);
    }
  };

  return (
    <div className={cn('flex', 'justify-center', 'w-full')}>
      <div
        className={cn(
          'w-full',
          'max-w-[1320px]',
          'flex',
          'flex-col',
          'mt-28',
          'align-middle',
          'justify-center',
          'relative',
          'pb-28',
        )}
      >
        <div className={cn('m-30')}>
          <BackPageButton type="back" label="팀들 날짜와 시간 설정하기" />
        </div>

        <SetTimeContainer />

        <div
          className={cn(
            'fixed',
            'bottom-0',
            'left-0',
            'right-0',
            'p-30',
            'bg-[#1F1F1F]',
            'z-10',
            'flex',
            'justify-center',
          )}
        >
          <div className={cn('max-w-[1320px]', 'w-full', 'px-24')}>
            <Button onClick={handleConfirm}>확인</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetTimePage;

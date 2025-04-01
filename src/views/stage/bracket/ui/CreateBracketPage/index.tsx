'use client';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';
import { Bracket } from '@/widgets/stage/bracket';

const CreateBracketPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const gameId = parseInt(searchParams.get('gameId') || '0', 10);
  const isConfirmNavigationRef = useRef(false);

  useEffect(() => {
    return () => {
      if (!isConfirmNavigationRef.current) {
        sessionStorage.removeItem(`placedTeams_${gameId}`);
      }
    };
  }, [gameId]);

  const handleConfirmClick = () => {
    isConfirmNavigationRef.current = true;
    router.push(`/stage/time?gameId=${gameId}&system=TOURNAMENT`);
  };

  const handleBackClick = () => {
    sessionStorage.removeItem(`placedTeams_${gameId}`);
    router.back();
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
        )}
      >
        <div className={cn('m-30')}>
          <BackPageButton
            type="back"
            label="대진표"
            onClick={handleBackClick}
          />
        </div>

        <Bracket />
        <div className={cn('p-30', 'mt-28')}>
          <Button onClick={handleConfirmClick}>확인</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateBracketPage;

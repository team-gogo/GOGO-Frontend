'use client';

import { useSearchParams } from 'next/navigation';
import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';
import { Bracket } from '@/widgets/stage/bracket';

const CreateBracketPage = () => {
  const searchParams = useSearchParams();
  const matchId = parseInt(searchParams.get('matchId') || '0', 10);

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
          <BackPageButton type="back" label="대진표" />
        </div>

        <Bracket matchId={matchId} />
        <div className={cn('p-30', 'mt-28')}>
          <Button>확인</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateBracketPage;

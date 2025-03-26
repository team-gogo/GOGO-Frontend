'use client';

import LeftBracketLine from '@/shared/assets/svg/BarcketLine/LeftBarcketLine';
import MiddleBracketLine from '@/shared/assets/svg/BarcketLine/MiddleBarcketLine';
import RightBracketLine from '@/shared/assets/svg/BarcketLine/RightBarcketLine';
import { cn } from '@/shared/utils/cn';

const Bracket = () => {
  const finalStage = 4;

  return (
    <div className={cn('h-[50vh]', 'bg-black', 'p-30', 'flex', 'flex-col')}>
      <header className={cn('mb-30')}>
        <h1 className={cn('text-h3e', 'text-white')}>{finalStage}강</h1>
      </header>
      <div className={cn('h-[100%]', 'bg-gray-700', 'rounded-lg', 'p-20')}>
        <div
          className={cn(
            'w-full',
            'h-full',
            'flex',
            'items-center',
            'justify-center',
            'gap-20',
          )}
        >
          <LeftBracketLine />
          <MiddleBracketLine />
          <RightBracketLine />
        </div>
      </div>
    </div>
  );
};

export default Bracket;

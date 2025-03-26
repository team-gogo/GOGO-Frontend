'use client';

import { cn } from '@/shared/utils/cn';

const Bracket = () => {
  const finalStage = 4;

  return (
    <div className={cn('h-[50vh]', 'bg-black', 'p-30', 'flex', 'flex-col')}>
      <header className={cn('mb-30')}>
        <h1 className={cn('text-h3e', 'text-white')}>{finalStage}강</h1>
      </header>
      <div className={cn('h-[100%]', 'bg-gray-700', 'rounded-lg')}>
        {/*  */}
      </div>
    </div>
  );
};

export default Bracket;

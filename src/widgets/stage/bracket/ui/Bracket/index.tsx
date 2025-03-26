'use client';

import { cn } from '@/shared/utils/cn';
import TeamItem from '../TeamItem/index';

const Bracket = () => {
  const finalStage = 4;

  return (
    <div className={cn('h-[75vh]', 'bg-black', 'p-30', 'flex', 'flex-col')}>
      <header className={cn('mb-30')}>
        <h1 className={cn('text-h3e', 'text-white')}>{finalStage}강</h1>
      </header>
      <div className={cn('h-[50%]', 'bg-gray-700', 'rounded-lg')}>{/*  */}</div>
      <TeamItem />
    </div>
  );
};

export default Bracket;

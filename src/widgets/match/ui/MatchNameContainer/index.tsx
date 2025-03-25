'use client';

import { useState } from 'react';
import { cn } from '@/shared/utils/cn';

const matchNames = ['경기 이름 1', '경기 이름 2', '경기 이름 3'];

const MatchNameContainer = () => {
  const [selected, setSelected] = useState(matchNames[0]);

  return (
    <div className={cn('flex', 'gap-[2.25rem]')}>
      {matchNames.map((name) => (
        <div
          key={name}
          className={cn(
            'flex',
            'pb-[1.25rem]',
            'flex-col',
            'justify-center',
            'items-center',
            selected === name && 'border-b-2 border-solid border-main-600',
          )}
        >
          <button
            className={cn(
              'text-body1e',
              'text-center',
              selected === name ? 'text-white' : 'text-gray-500',
            )}
            onClick={() => setSelected(name)}
          >
            {name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default MatchNameContainer;

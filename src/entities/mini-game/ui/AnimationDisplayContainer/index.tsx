import React, { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

const AnimationDisplayContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={cn(
        'w-full',
        'rounded-lg',
        'max-h-[432px]',
        'overflow-hidden',
        'flex',
        'justify-center',
        'items-center',
        'aspect-video',
        'min-h-[300px]',
      )}
    >
      {children}
    </div>
  );
};

export default AnimationDisplayContainer;

import React from 'react';
import { GoogleLogo } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

const GoogleButton = () => {
  return (
    <button
      className={cn(
        'flex',
        'w-full',
        'items-center',
        'justify-between',
        'rounded-lg',
        'bg-white',
        'p-16',
      )}
    >
      <GoogleLogo />
      <span
        className={cn('text-body2s', 'flex-grow', 'text-center', 'text-black')}
      >
        Google 계정으로 시작하기
      </span>
    </button>
  );
};

export default GoogleButton;

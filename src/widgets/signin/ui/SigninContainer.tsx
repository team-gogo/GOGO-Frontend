import React from 'react';
import { GoogleButton } from '@/entities/signin';
import { Logo } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

const SigninContainer = () => {
  return (
    <div
      className={cn(
        'mx-auto',
        'w-full',
        'max-w-[648px]',
        'space-y-[100px]',
        'px-16',
      )}
    >
      <div className={cn('flex', 'justify-center')}>
        <Logo width={420} height={144} />
      </div>
      <GoogleButton />
    </div>
  );
};

export default SigninContainer;

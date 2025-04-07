import React, { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

interface InfoContainerProps {
  icon: ReactNode;
  title: string;
  rightContent: ReactNode;
}

const InfoContainer = ({ icon, title, rightContent }: InfoContainerProps) => {
  return (
    <div className={cn('flex', 'items-center', 'justify-between')}>
      <div className={cn('flex', 'items-center', 'gap-12')}>
        {icon}
        <p className={cn('mobile:text-body1e', 'text-white', 'text-body3e')}>
          {title}
        </p>
      </div>
      {rightContent}
    </div>
  );
};

export default InfoContainer;

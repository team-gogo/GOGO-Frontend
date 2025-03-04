import React from 'react';
import { cn } from '@/shared/utils/cn';
import { FaqContainer } from '@/widgets/faq';

const FaqPage = () => {
  return (
    <div
      className={cn('flex', 'h-screen', 'w-screen', 'justify-center', 'pb-16')}
    >
      <FaqContainer />
    </div>
  );
};

export default FaqPage;

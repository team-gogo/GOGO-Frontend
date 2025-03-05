import React from 'react';

import { FaqItem, FaqSearch } from '@/entities/faq';
import { QuestionIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';
import faqData from '../../model/faqData';

const FaqContainer = () => {
  return (
    <div
      className={cn(
        'w-full',
        'max-w-[1144px]',
        'px-16',
        'space-y-[36px]',
        'overflow-y-auto',
        'pt-[40px]',
      )}
    >
      <div className={cn('flex', 'items-center', 'justify-center', 'gap-16')}>
        <QuestionIcon size={60} color="#fff" />
        <h1 className={cn('text-white', 'text-h1e')}>FAQ</h1>
      </div>
      <div className={cn('space-y-24')}>
        <FaqSearch placeholder="질문 검색하기" />
        <div className={cn('space-y-[27px]')}>
          {faqData.faqItems.map((item) => (
            <FaqItem
              key={item.id}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqContainer;

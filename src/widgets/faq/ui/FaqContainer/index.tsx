'use client';

import { useState } from 'react';
import { FaqItem, FaqSearch } from '@/entities/faq';
import { QuestionIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';
import faqData from '../../model/faqData';

const FaqContainer = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqItems = faqData.faqItems.filter((item) => {
    return item.question.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div
      className={cn(
        'w-full',
        'h-full',
        'max-w-[1144px]',
        'space-y-[36px]',
        'pt-[40px]',
      )}
    >
      <div className={cn('flex', 'items-center', 'justify-center', 'gap-16')}>
        <QuestionIcon size={60} color="#fff" />
        <h1 className={cn('text-white', 'text-h1e')}>FAQ</h1>
      </div>
      <div className={cn('space-y-24')}>
        <FaqSearch placeholder="질문 검색하기" onSearch={handleSearch} />
        <div className={cn('space-y-[27px]')}>
          {filteredFaqItems.length > 0 ? (
            filteredFaqItems.map((item) => (
              <FaqItem
                key={item.id}
                question={item.question}
                answer={item.answer}
              />
            ))
          ) : (
            <p className={cn('text-white')}>검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaqContainer;

'use client';

import React, { useState } from 'react';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BlueQuestionIcon,
  QuestionIcon,
} from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

interface Props {
  question: string;
  answer: string;
}

const FaqItem = ({ question, answer }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button
      type="button"
      className={cn('w-full', 'bg-gray-700', 'px-20', 'py-28', 'rounded-lg')}
      onClick={toggleOpen}
    >
      <div className={cn('flex', 'items-center', 'gap-24', 'justify-between')}>
        <div className={cn('space-y-20')}>
          <div className={cn('flex', 'items-center', 'gap-20')}>
            {isOpen ? <BlueQuestionIcon /> : <QuestionIcon />}
            <p className={cn('text-white', 'text-body2s')}>{question}</p>
          </div>
          {isOpen && (
            <>
              <div className="my-4 h-px w-full bg-gray-600" />
              <p
                className={cn(
                  'block',
                  'text-left',
                  'text-gray-400',
                  'text-body3s',
                  'mt-2',
                )}
              >
                {answer}
              </p>
            </>
          )}
        </div>
        <div className={cn('flex', 'items-center', 'gap-4')}>
          <p
            className={cn(
              'text-body2s',
              'whitespace-nowrap',
              isOpen ? 'text-main-300' : 'text-gray-400',
            )}
          >
            답변 보기
          </p>
          {isOpen ? <ArrowUpIcon color="#97A9FF" /> : <ArrowDownIcon />}
        </div>
      </div>
    </button>
  );
};

export default FaqItem;

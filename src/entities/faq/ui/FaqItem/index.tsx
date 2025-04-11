'use client';

import { useState } from 'react';
import {
  ArrowDownIcon,
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
      className={cn(
        'w-full',
        'rounded-lg',
        'bg-gray-700',
        'px-20',
        'py-24',
        'text-left',
      )}
      onClick={toggleOpen}
    >
      <div className={cn('flex', 'items-center', 'justify-between', 'gap-24')}>
        <div className={cn('flex', 'items-center', 'gap-16')}>
          {isOpen ? <BlueQuestionIcon /> : <QuestionIcon />}
          <p className={cn('pad:text-body2s', 'text-white', 'text-body3s')}>
            {question}
          </p>
        </div>
        <div className={cn('flex', 'items-center', 'gap-16')}>
          <p
            className={cn(
              'text-body2s',
              'whitespace-nowrap',
              isOpen ? 'text-main-300' : 'text-gray-400',
              'transition-colors duration-300',
              'hidden',
              'mobile:box',
            )}
          >
            답변 보기
          </p>
          <div
            className={cn(
              'transition-transform',
              'duration-300',
              isOpen ? 'rotate-180' : 'rotate-0',
            )}
          >
            <ArrowDownIcon color={isOpen ? '#97A9FF' : '#6B7280'} />
          </div>
        </div>
      </div>
      <div
        className={cn(
          'grid',
          'transition-[grid-template-rows] duration-500 ease-in-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className={cn('overflow-hidden')}>
          <div className={cn('pt-20', 'w-full')}>
            <div className={cn('h-px w-full', 'bg-gray-600')} />
            <p
              className={cn(
                'mt-8',
                'text-left',
                'text-body3s',
                'text-gray-400',
              )}
            >
              {answer}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default FaqItem;

'use client';

import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '@/shared/utils/cn';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
  rows?: number;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ maxLength, defaultValue, rows, ...attributes }, ref) => {
    const [textAreaLength, setTextAreaLength] = useState(0);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextAreaLength(e.target.value.length);
      if (attributes.onChange) {
        attributes.onChange(e);
      }

      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, []);

    return (
      <div>
        <div className="relative">
          <textarea
            ref={(e) => {
              if (typeof ref === 'function') {
                ref(e);
              } else if (ref) {
                ref.current = e;
              }
              textareaRef.current = e;
            }}
            {...attributes}
            defaultValue={defaultValue}
            maxLength={maxLength}
            onChange={handleChange}
            rows={rows}
            className={cn(
              'w-full',
              'resize-none',
              'overflow-hidden',
              'rounded-lg',
              'bg-gray-700',
              'px-[16px]',
              'py-[12px]',
              'text-white',
              'text-body3s',
              'caret-gray-600',
              'height-[56px]',
              'flex',
              'items-center',
              'leading-[32px]',
              'caret-white',
            )}
          />
        </div>
        {maxLength && (
          <div className={cn('text-body3s', 'text-end', 'text-gray-500')}>
            {textAreaLength}/{maxLength}
          </div>
        )}
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;

'use client';

import Image from 'next/image';
import { forwardRef, useState, useEffect, ChangeEvent } from 'react';
import { cn } from '@/shared/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  maxLength?: number;
  bgColor?: string;
  onIconClick?: () => void;
  showBorder?: boolean;
  isPlcCenter?: boolean;
  isImageUpload?: boolean;
  onImageUpload?: (file: File) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      icon,
      maxLength,
      bgColor = 'bg-gray-700',
      onIconClick,
      showBorder = false,
      isPlcCenter = false,
      isImageUpload = false,
      onImageUpload,
      value,
      ...attributes
    },
    ref,
  ) => {
    const [inputLength, setInputLength] = useState(0);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
      setInputLength(typeof value === 'string' ? value.length : 0);
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (maxLength && value.length > maxLength) {
        e.target.value = value.slice(0, maxLength);
      }
      setInputLength(e.target.value.length);
      if (attributes.onChange) {
        attributes.onChange(e);
      }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (onImageUpload) {
        onImageUpload(file);
      }

      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (typeof fileReader.result === 'string') {
          setPreviewUrl(fileReader.result);
        }
      };
      fileReader.readAsDataURL(file);
    };

    return (
      <div className={cn('h-[56px]', 'w-full', 'relative')}>
        {isImageUpload ? (
          <div
            className={cn(
              'h-full',
              'w-full',
              bgColor,
              'rounded-lg',
              'flex',
              'items-center',
              'justify-center',
              'overflow-hidden',
              showBorder && 'border border-solid border-gray-600',
            )}
          >
            {previewUrl ? (
              <div className="relative h-full w-full">
                <Image
                  src={previewUrl}
                  alt="업로드 이미지"
                  fill
                  className="object-contain"
                />
                <button
                  type="button"
                  className="absolute z-10 flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-white"
                  onClick={() => {
                    setPreviewUrl(null);
                    if (ref && typeof ref !== 'function') {
                      if (ref.current) {
                        ref.current.value = '';
                      }
                    }
                  }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <label
                htmlFor="image-upload"
                className="flex h-full w-full cursor-pointer items-center justify-between px-[16px]"
              >
                <span
                  className={cn(
                    'text-body3s',
                    'text-gray-400',
                    isPlcCenter && 'w-full text-center',
                  )}
                >
                  {attributes.placeholder || '이미지 등록'}
                </span>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={ref}
                  onChange={handleImageChange}
                  {...attributes}
                />
              </label>
            )}
          </div>
        ) : (
          <>
            <input
              type="text"
              {...attributes}
              ref={ref}
              maxLength={maxLength}
              onChange={handleInputChange}
              autoComplete="off"
              className={cn(
                'h-full',
                'w-full',
                bgColor,
                'px-[16px]',
                'pl-[12px]',
                icon ? 'pr-[50px]' : 'pr-[12px]',
                'placeholder:text-gray-400',
                isPlcCenter && 'placeholder:text-center',
                'rounded-lg',
                'text-body3s',
                'text-white',
                showBorder && 'border border-solid border-gray-600',
                attributes.type === 'number' &&
                  '[appearance:none] [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden',
              )}
            />
            {icon && (
              <label
                onClick={onIconClick}
                className={cn(
                  'absolute',
                  'right-[16px]',
                  'top-[50%]',
                  'translate-y-[-50%]',
                  onIconClick && 'cursor-pointer',
                )}
              >
                {icon}
              </label>
            )}
          </>
        )}
        {maxLength && !isImageUpload && (
          <div
            className={cn(
              'text-body3s',
              'text-end',
              inputLength > 0 ? 'text-main-600' : 'text-gray-500',
            )}
          >
            {inputLength}/{maxLength}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;

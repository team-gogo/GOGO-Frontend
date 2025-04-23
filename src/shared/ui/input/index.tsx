'use client';

import Image from 'next/image';
import { forwardRef, useState, useEffect, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import TrashIcon from '@/shared/assets/svg/TrashIcon';
import { cn } from '@/shared/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  maxLength?: number;
  bgColor?: string;
  onIconClick?: () => void;
  showBorder?: boolean;
  isPlcCenter?: boolean;
  isImageUpload?: boolean;
  onImageUpload?: (file: File | null) => void;
  imageContainerClass?: string;
}

const S = {
  container: 'relative w-full transition-all duration-200',
  imageUpload: 'max-w-[500px]',
  input: 'h-full w-full rounded-lg text-body3s text-white',
  icon: 'absolute right-[16px] top-[50%] translate-y-[-50%]',
  border: 'border border-solid border-gray-600',
};

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
      imageContainerClass,
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

    const handleRefReset = () => {
      if (ref && typeof ref !== 'function' && ref.current) {
        ref.current.value = '';
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (maxLength && value.length > maxLength) {
        e.target.value = value.slice(0, maxLength);
      }
      setInputLength(e.target.value.length);
      attributes.onChange?.(e);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop()?.toLowerCase();
      if (!fileExt || !['jpg', 'png', 'gif'].includes(fileExt)) {
        toast.error('지원하지 않는 이미지 형식입니다.');
        e.target.value = '';
        return;
      }

      onImageUpload?.(file);

      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (typeof fileReader.result === 'string') {
          setPreviewUrl(fileReader.result);
        }
      };
      fileReader.readAsDataURL(file);
    };

    const handleAction = () => {
      if (onIconClick) {
        onIconClick();
      } else if (isImageUpload) {
        const fileInput = document.getElementById(
          'image-upload',
        ) as HTMLInputElement;
        fileInput?.click();
      }
    };

    const renderImageUpload = () => (
      <div
        className={cn(
          S.input,
          bgColor,
          'flex items-center justify-start overflow-hidden',
          previewUrl && 'p-3',
          showBorder && S.border,
        )}
      >
        {previewUrl ? (
          <div className="relative w-full overflow-hidden rounded">
            <div className="flex items-center justify-start">
              <div
                className="relative"
                style={{
                  maxWidth: '500px',
                  maxHeight: '500px',
                  width: 'auto',
                  height: 'auto',
                  position: 'relative',
                }}
              >
                <Image
                  src={previewUrl}
                  alt="업로드 이미지"
                  width={500}
                  height={500}
                  className="max-h-[500px] w-auto object-contain"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            </div>
            <button
              type="button"
              className="h-38 w-38 absolute right-2 top-2 z-10 flex items-center justify-center rounded-lg border-solid border-gray-100 bg-white p-8"
              onClick={() => {
                setPreviewUrl(null);
                handleRefReset();
                onImageUpload?.(null);
              }}
            >
              <TrashIcon color="#FF4646" size={30} />
            </button>
          </div>
        ) : (
          <div className="relative flex h-full w-full">
            <label
              htmlFor="image-upload"
              className="flex h-full w-full cursor-pointer items-center justify-between px-[16px]"
            >
              <span
                className={cn(
                  'text-body3s text-gray-400',
                  isPlcCenter && 'w-full text-center',
                )}
              >
                {attributes.placeholder || '이미지 등록'}
              </span>
              <input
                id="image-upload"
                type="file"
                accept="image/jpg, image/png, image/gif"
                className="hidden"
                ref={ref}
                onChange={handleImageChange}
                {...attributes}
              />
            </label>
          </div>
        )}
      </div>
    );

    const renderTextInput = () => (
      <>
        <input
          {...attributes}
          ref={ref}
          maxLength={maxLength}
          onChange={handleInputChange}
          autoComplete="off"
          className={cn(
            S.input,
            bgColor,
            'px-[16px] pl-[12px]',
            icon ? 'pr-[50px]' : 'pr-[12px]',
            'placeholder:text-gray-400',
            isPlcCenter && 'placeholder:text-center',
            showBorder && S.border,
            attributes.type === 'number' &&
              '[appearance:none] [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden',
          )}
        />
      </>
    );

    return (
      <div
        className={cn(
          S.container,
          previewUrl && isImageUpload
            ? imageContainerClass || 'my-4 h-auto min-h-[100px] max-w-[300px]'
            : 'h-[56px]',
          isImageUpload && S.imageUpload,
        )}
      >
        {isImageUpload ? renderImageUpload() : renderTextInput()}

        {icon && !previewUrl && (
          <label
            onClick={handleAction}
            className={cn(S.icon, onIconClick && 'cursor-pointer')}
          >
            {icon}
          </label>
        )}

        {maxLength && !isImageUpload && (
          <div
            className={cn(
              'text-end text-body3s',
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

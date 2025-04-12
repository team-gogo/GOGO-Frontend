import { useEffect } from 'react';
import React from 'react';
import { XIcon } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

interface ModalLayoutProps {
  title?: string;
  onClose: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  containerClassName?: string;
  showHeader?: boolean;
  canClose?: boolean;
}

const ModalLayout = ({
  title,
  onClose,
  children,
  containerClassName,
  showHeader = true,
  canClose = false,
}: ModalLayoutProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  return (
    <div
      className={cn(
        'fixed',
        'inset-0',
        'z-50',
        'flex',
        'items-center',
        'justify-center',
        'bg-black',
        'bg-opacity-50',
        'mt-0!',
        'space-y-0!',
        'overflow-visible',
      )}
      style={{ margin: 0 } as React.CSSProperties}
      onClick={canClose ? onClose : undefined}
    >
      <div className={containerClassName} onClick={(e) => e.stopPropagation()}>
        {showHeader && (
          <div
            className={cn('mb-4', 'flex', 'items-center', 'justify-between')}
          >
            <p
              className={cn('text-white', 'mobile:text-body1s', 'text-body2s')}
            >
              {title}
            </p>
            {canClose && (
              <button onClick={onClose}>
                <XIcon className="h-24 w-24" />
              </button>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;

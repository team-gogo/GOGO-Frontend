import { XIcon } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

interface ModalLayoutProps {
  title?: string;
  onClose: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  containerClassName?: string;
  showHeader?: boolean;
}

const ModalLayout = ({
  title,
  onClose,
  children,
  containerClassName,
  showHeader = true,
}: ModalLayoutProps) => {
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
        'mx-[1rem]',
      )}
      onClick={onClose}
    >
      <div className={containerClassName} onClick={(e) => e.stopPropagation()}>
        {showHeader && (
          <div
            className={cn('mb-4', 'flex', 'items-center', 'justify-between')}
          >
            <p
              className={cn('text-white', 'text-body1s', 'mobile:text-body2s')}
            >
              {title}
            </p>
            <button onClick={onClose}>
              <XIcon className="mobile:h-24 mobile:w-24" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;

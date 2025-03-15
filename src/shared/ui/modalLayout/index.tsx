import { XIcon } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

interface ModalLayoutProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  containerClassName?: string;
}

const ModalLayout = ({
  title,
  onClose,
  children,
  containerClassName,
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
    >
      <div className={containerClassName}>
        <div className={cn('mb-4', 'flex', 'items-center', 'justify-between')}>
          <p className={cn('text-white', 'text-body1s')}>{title}</p>
          <button onClick={onClose}>
            <XIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;

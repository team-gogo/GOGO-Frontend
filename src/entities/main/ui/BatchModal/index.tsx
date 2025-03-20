import Input from '@/shared/ui/input';
import ModalLayout from '@/shared/ui/modalLayout';
import { cn } from '@/shared/utils/cn';

interface BatchModalProps {
  onClose: () => void;
}

const BatchModal = ({ onClose }: BatchModalProps) => {
  return (
    <ModalLayout
      title={'정산하기'}
      onClose={onClose}
      containerClassName={cn(
        'rounded-lg',
        'bg-gray-700',
        'px-[40px]',
        'py-[36px]',
        'max-w-[38.75rem]',
        'w-full',
        'space-y-24',
      )}
    >
      <div
        className={cn(
          'flex',
          'items-center',
          'justify-center',
          'gap-[1.5rem]',
          'w-full',
        )}
      >
        <div className={cn('flex', 'flex-col', 'items-center', 'gap-[1rem]')}>
          <h2 className={cn('text-h4e', 'text-white')}>A팀</h2>
          <Input placeholder="스코어 입력" bgColor="bg-gray-600" />
        </div>

        <div className={cn('flex', 'flex-col', 'items-center', 'gap-[1rem]')}>
          <h2 className={cn('text-h4e', 'text-white')}>B팀</h2>
          <Input placeholder="스코어 입력" bgColor="bg-gray-600" />
        </div>
      </div>
    </ModalLayout>
  );
};

export default BatchModal;

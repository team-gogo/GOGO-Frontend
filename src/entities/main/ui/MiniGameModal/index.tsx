'use client';

import { useRouter } from 'next/navigation';
import Button from '@/shared/ui/button';
import ModalLayout from '@/shared/ui/modalLayout';
import { cn } from '@/shared/utils/cn';

interface MiniGameModalProps {
  onClose: () => void;
  selectedGame: {
    Icon: React.ComponentType<{ size: number; color: string }>;
    label: string;
  };
}

const MiniGameModal = ({ onClose, selectedGame }: MiniGameModalProps) => {
  const { Icon, label } = selectedGame;
  const { push } = useRouter();

  return (
    <ModalLayout
      title="게임을 플레이하시겠습니까?"
      onClose={onClose}
      containerClassName={cn(
        'rounded-lg',
        'bg-gray-700',
        'px-[40px]',
        'py-[36px]',
        'max-w-[39.625rem]',
        'w-full',
        'space-y-24',
      )}
    >
      <div
        className={cn(
          'flex',
          'w-full',
          'flex-col',
          'items-center',
          'gap-[2rem]',
        )}
      >
        <Icon size={180} color="#898989" />
        <h2 className={cn('text-h2e', 'text-gray-400')}>{label}</h2>
      </div>
      <Button onClick={() => push('/mini-game')}>게임하기</Button>
    </ModalLayout>
  );
};

export default MiniGameModal;

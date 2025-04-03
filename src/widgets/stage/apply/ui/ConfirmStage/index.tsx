import ButtonCheckIcon from '@/shared/assets/svg/ButtonCheckIcon';
import { cn } from '@/shared/utils/cn';

interface ConfirmStageProps {
  onClick: () => void;
}

const ConfirmStage = ({ onClick }: ConfirmStageProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-32',
        'flex',
        'gap-8',
        'p-8',
        'mx-20',
        'border-1',
        'border-solid',
        'border-gray-400',
        'items-center',
        'rounded-lg',
        'justify-center',
      )}
    >
      <ButtonCheckIcon color="#898989" />
      <p
        className={cn(
          'text-gray-400',
          'text-body3s',
          'text-nowrap',
          'mobile:text-caption3s',
        )}
      >
        확정하기
      </p>
    </button>
  );
};

export default ConfirmStage;

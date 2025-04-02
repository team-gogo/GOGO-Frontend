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
        'w-36',
        'flex',
        'gap-8',
        'py-8',
        'px-16',
        'border-1',
        'border-solid',
        'border-gray-400',
        'items-center',
        'rounded-lg',
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

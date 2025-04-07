import BracketIcon from '@/shared/assets/icons/BracketIcon';
import { cn } from '@/shared/utils/cn';

interface ShowBracketButtonProps {
  onClick: () => void;
}

const ShowBracketButton = ({ onClick }: ShowBracketButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex',
        'gap-8',
        'py-8',
        'px-24',
        'border-1',
        'border-solid',
        'border-main-500',
        'items-center',
        'rounded-lg',
      )}
    >
      <BracketIcon />
      <p
        className={cn(
          'text-main-500',
          'mobile:text-body3s',
          'text-nowrap',
          'text-caption3s',
        )}
      >
        대진표 보기
      </p>
    </button>
  );
};

export default ShowBracketButton;

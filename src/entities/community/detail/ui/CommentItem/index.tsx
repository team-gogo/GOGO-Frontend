import { HeartIcon } from '@/shared/assets/icons';
import { PersonIcon } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

const CommentItem = () => {
  return (
    <div
      className={cn(
        'flex',
        'bg-gray-700',
        'items-center',
        'w-full',
        'px-20',
        'py-16',
        'rounded-lg',
        'justify-between',
      )}
    >
      <div className={cn('flex', 'items-center', 'gap-8', 'whitespace-nowrap')}>
        <PersonIcon />
        <p className={cn('text-body3s', 'text-gray-300')}>김진원</p>
      </div>

      <p className={cn('text-body3s', 'text-white', 'flex-grow', 'px-24')}>
        그냥 디자이너 접으셈 3D로 ㄱㄱ 그냥 디자이너 접으셈 3D로 ㄱㄱ 그냥
        디자이너 접으셈 3D로 ㄱㄱ 그냥 디자이너 접으셈 3D로 ㄱㄱ
      </p>
      <div className={cn('flex', 'items-center', 'gap-8')}>
        <HeartIcon />
        <p className={cn('text-body3s', 'text-gray-300')}>2</p>
      </div>
    </div>
  );
};

export default CommentItem;

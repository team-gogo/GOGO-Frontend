import Link from 'next/link';
import { CirclePlusIcon } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

const WriteButton = ({ stageId }: { stageId: string }) => {
  return (
    <Link
      href={`/community/create/${stageId}`}
      className={cn(
        'flex',
        'gap-8',
        'py-8',
        'px-12',
        'border-1',
        'border-solid',
        'border-white',
        'items-center',
        'rounded-lg',
      )}
    >
      <CirclePlusIcon />
      <p
        className={cn(
          'text-white',
          'text-nowrap',
          'text-body3s',
          'mobile:text-caption3s',
        )}
      >
        글 쓰기
      </p>
    </Link>
  );
};

export default WriteButton;

import { cn } from '@/shared/utils/cn';
import Button from '../button';
import Tag from '../tag';

interface StageProps {
  isAdmin: boolean;
  isRecruiting: boolean;
  isLocked: boolean;
}

const Stage = ({ isAdmin, isRecruiting, isLocked }: StageProps) => {
  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'p-[1.5rem]',
        'px-[2rem]',
        'rounded-xl',
        'bg-gray-700',
      )}
    >
      <div className={cn('flex', 'flex-col', 'justify-center', 'gap-[3rem]')}>
        <div
          className={cn('flex', 'w-full', 'justify-between', 'items-center')}
        >
          <div className={cn('flex', 'items-center', 'gap-[0.625rem]')}>
            <Tag TagType={'official'} />
            {isAdmin && <Tag TagType={'admin'} />}
            {isRecruiting ? (
              <Tag TagType={'recruiting'} />
            ) : (
              <Tag TagType={'teamConfirm'} />
            )}
          </div>
          {isAdmin && <Tag TagType={'liveSetting'} />}
        </div>
        <div
          className={cn(
            'flex',
            'w-full',
            'flex-col',
            'items-center',
            'gap-[3rem]',
          )}
        >
          <h1 className={cn('text-h2e', 'text-white')}>스테이지 이름</h1>
          <Button isLocked={isLocked}>참여하기</Button>
        </div>
      </div>
    </div>
  );
};

export default Stage;

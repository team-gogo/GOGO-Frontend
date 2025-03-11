import { cn } from '@/shared/utils/cn';
import Button from '../button';
import Tag from '../tag';

interface StageProps {
  isAdmin: boolean;
  isRecruiting: boolean;
  stageName: string;
  isLocked: boolean;
  isParticipating: boolean;
}

const Stage = ({
  isAdmin,
  isRecruiting,
  stageName,
  isLocked,
  isParticipating,
}: StageProps) => {
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
            <Tag TagType={'OFFICIAL'} />
            {isAdmin && <Tag TagType={'ADMIN'} />}
            {isRecruiting ? (
              <Tag TagType={'RECRUITING'} />
            ) : (
              <Tag TagType={'CONFIRMED'} />
            )}
          </div>
          {isAdmin && <Tag TagType={'STREAMING'} />}
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
          <h1 className={cn('text-h2e', 'text-white')}>{stageName}</h1>
          <Button isLocked={isParticipating ? false : isLocked}>
            {isParticipating ? '상세보기' : '참여하기'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Stage;

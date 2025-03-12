import { MyStageType } from '@/shared/types/my';
import { cn } from '@/shared/utils/cn';
import Button from '../button';
import MatchTypeLabel from '../matchTypeLabel';

interface StageProps {
  stage: MyStageType;
}

const Stage = ({ stage }: StageProps) => {
  const { stageName, type, status, isMaintaining } = stage;

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
            {type.map((t) => (
              <MatchTypeLabel key={t} type={t} color="#FFF" />
            ))}
            {isMaintaining && <MatchTypeLabel type="ADMIN" color="#526FFE" />}
            {status === 'RECRUITING' ? (
              <MatchTypeLabel type="RECRUITING" color="#01C612" />
            ) : status === 'CONFIRMED' ? (
              <MatchTypeLabel type="CONFIRMED" color="#898989" />
            ) : null}
          </div>
          {/* {isAdmin && <Tag TagType={'STREAMING'} />} */}
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
          <h1 className={cn('text-h2e', 'text-white', 'laptop:text-body2e')}>
            {stageName}
          </h1>
          <Button isLocked={isMaintaining ? false : true}>
            {isMaintaining ? '상세보기' : '참여하기'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Stage;

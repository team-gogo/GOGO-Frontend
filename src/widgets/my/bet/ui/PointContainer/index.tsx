import { RightArrowIcon } from '@/shared/assets/svg';
import TemporaryPoint from '@/shared/ui/temporaryPoint';
import { cn } from '@/shared/utils/cn';

interface PointContainerProps {
  points: { id: number; value: number }[];
}

const PointContainer = ({ points }: PointContainerProps) => {
  return (
    <div
      className={cn(
        'flex',
        'items-center',
        'w-full',
        'rounded-xl',
        'bg-gray-700',
        'p-[1.5rem]',
        'justify-between',
      )}
    >
      <div className={cn('flex', 'items-center', 'gap-[0.75rem]', 'w-full')}>
        {points.length === 0 ? (
          <div className={cn('flex', 'w-full', 'justify-between')}>
            <h4 className={cn('text-h4s', 'text-gray-500')}>
              임시포인트가 들어오지 않았습니다.
            </h4>
            <div className={cn('flex', 'items-center', 'gap-[1rem]')}>
              <p className={cn('text-body2s', 'text-main-500')}>
                베팅하러 가기
              </p>
              <RightArrowIcon color="#526FFE" />
            </div>
          </div>
        ) : (
          <div className={cn('flex', 'items-center', 'gap-[0.75rem]')}>
            {points.map(({ id, value }) => (
              <TemporaryPoint key={id} point={value} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PointContainer;

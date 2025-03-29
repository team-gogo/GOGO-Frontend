'use client';

import { useRouter } from 'next/navigation';
import { RightArrowIcon } from '@/shared/assets/svg';
import { TempPointsResponse } from '@/shared/types/my/bet';
import TemporaryPoint from '@/shared/ui/temporaryPoint';
import { cn } from '@/shared/utils/cn';

interface PointContainerProps {
  tempPoint: TempPointsResponse | undefined;
}

const PointContainer = ({ tempPoint }: PointContainerProps) => {
  const { push } = useRouter();

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
        {tempPoint?.tempPoints.length === 0 ? (
          <div className={cn('flex', 'w-full', 'justify-between')}>
            <h4 className={cn('text-h4s', 'text-gray-500')}>
              임시포인트가 들어오지 않았습니다.
            </h4>
            <button
              className={cn('flex', 'items-center', 'gap-[1rem]')}
              onClick={() => push('/bet')}
            >
              <p className={cn('text-body2s', 'text-main-500')}>
                베팅하러 가기
              </p>
              <RightArrowIcon color="#526FFE" />
            </button>
          </div>
        ) : (
          <div className={cn('flex', 'items-center', 'gap-[0.75rem]')}>
            {tempPoint?.tempPoints.map(
              ({ tempPointId, tempPoint, expiredDate }) => (
                <TemporaryPoint
                  key={tempPointId}
                  tempPoint={tempPoint}
                  expiredDate={expiredDate}
                />
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PointContainer;

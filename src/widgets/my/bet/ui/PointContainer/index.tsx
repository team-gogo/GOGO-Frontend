'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RightArrowIcon } from '@/shared/assets/svg';
import { TempPointsResponse } from '@/shared/types/my/bet';
import TemporaryPoint from '@/shared/ui/temporaryPoint';
import { cn } from '@/shared/utils/cn';

interface PointContainerProps {
  tempPoint: TempPointsResponse | undefined;
  stageId: string | null;
}

const PointContainer = ({ tempPoint, stageId }: PointContainerProps) => {
  const { push } = useRouter();

  const [activeTempPoints, setActiveTempPoints] = useState(
    tempPoint?.tempPoints || [],
  );

  useEffect(() => {
    setActiveTempPoints(tempPoint?.tempPoints || []);
  }, [tempPoint]);

  const handleExpire = (id: number) => {
    const expiredItem = activeTempPoints.find(
      (item) => item.tempPointId === id,
    );
    if (!expiredItem) return;

    setActiveTempPoints((prev) =>
      prev.filter((item) => item.tempPointId !== id),
    );
  };

  return (
    <div
      className={cn(
        'flex',
        'items-center',
        'w-full',
        'rounded-xl',
        'bg-gray-700',
        'justify-between',
        'pad:h-[5rem]',
        'h-[4rem]',
        'pad:p-[1.5rem]',
        'p-[1rem]',
        'overflow-x-auto',
        'overflow-y-hidden',
        'scrollbar-hide',
        'w-full',
        'whitespace-nowrap',
        'scroll-hidden',
      )}
    >
      <div className={cn('flex', 'items-center', 'gap-[0.75rem]', 'w-full')}>
        {activeTempPoints.length === 0 ? (
          <div
            className={cn('flex', 'w-full', 'justify-between', 'items-center')}
          >
            <h4
              className={cn(
                'pad:text-body2s',
                'tablet:text-body1s',
                'text-caption1s',
                'text-gray-500',
              )}
            >
              임시포인트가 들어오지 않았습니다.
            </h4>
            <button
              className={cn(
                'flex',
                'items-center',
                'midpad:gap-[1rem]',
                'gap-[0.5rem]',
              )}
              onClick={() => push(`/main/${stageId}`)}
            >
              <p
                className={cn(
                  'midpad:text-body2s',
                  'text-body3s',
                  'text-main-500',
                )}
              >
                베팅하러 가기
              </p>
              <div className={cn('pad:block', 'hidden')}>
                <RightArrowIcon color="#526FFE" />
              </div>
            </button>
          </div>
        ) : (
          <div className={cn('flex', 'items-center', 'gap-[0.75rem]')}>
            {activeTempPoints.map(({ tempPointId, tempPoint, expiredDate }) => (
              <TemporaryPoint
                key={tempPointId}
                tempPoint={tempPoint}
                expiredDate={expiredDate}
                tempPointId={tempPointId}
                onExpire={handleExpire}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PointContainer;

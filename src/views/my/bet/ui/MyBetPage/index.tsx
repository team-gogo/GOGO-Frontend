'use client';

import { cn } from '@/shared/utils/cn';
import {
  MatchContainer,
  PointContainer,
  TotalPointContainer,
} from '@/widgets/my/bet';
import getMatchResponse from '../Mock/getMatchResponse';
import getTempPoint from '../Mock/getTempPoint';

const MyBetPage = () => {
  const userBetInfo = getMatchResponse();
  const tempPoint = getTempPoint();

  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'flex-col',
        'items-center',
        'justify-center',
        'py-[3.75rem]',
        'px-[1rem]',
      )}
    >
      <div
        className={cn(
          'flex',
          'flex-col',
          'w-full',
          'max-w-[82.5rem]',
          'gap-[3.75rem]',
        )}
      >
        <div className={cn('w-full', 'flex', 'flex-col', 'gap-[1.5rem]')}>
          <TotalPointContainer point={900000} />
          <PointContainer tempPoint={tempPoint} />
        </div>
        <MatchContainer userBetInfo={userBetInfo} />
      </div>
    </div>
  );
};

export default MyBetPage;

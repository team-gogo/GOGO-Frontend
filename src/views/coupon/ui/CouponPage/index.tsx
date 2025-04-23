'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NormalIcon, RandomIcon } from '@/shared/assets/svg';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';
import { useGetMyCouponInfo } from '../../model/useGetMyCouponInfo';

const CouponPage = () => {
  const searchParams = useSearchParams();
  const couponId = searchParams.get('couponId');
  const { data: couponInfo } = useGetMyCouponInfo(String(couponId));

  const [isUseCoupon, setIsUseCoupon] = useState<boolean>(false);

  const isNormalType = couponInfo?.couponType === 'NORMAL';

  useEffect(() => {
    if (couponInfo) {
      setIsUseCoupon(couponInfo.isUsed);
      localStorage.removeItem('couponId');
    }
  }, [couponInfo]);

  useEffect(() => {
    if (couponId) {
      localStorage.setItem('couponId', couponId);
    }
  }, [searchParams]);

  const clickUseCouponBtn = () => {
    setIsUseCoupon(true);
  };

  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'h-full',
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
          'max-w-[21.4375rem]',
          'w-full',
          'flex-col',
          'items-center',
          'gap-[1.25rem]',
        )}
      >
        <div className={cn('flex', 'flex-col', 'items-center', 'gap-[0.5rem]')}>
          <div className={cn('flex', 'gap-[0.5rem]')}>
            {isNormalType ? <NormalIcon /> : <RandomIcon />}
            <p className={cn('text-body2s', 'text-gray-500')}>
              {isNormalType ? '일반쿠폰' : '랜덤쿠폰'}
            </p>
          </div>
          <h1 className={cn('text-body1e', 'text-white')}>
            {isUseCoupon ? '이미 사용된 쿠폰입니다.' : couponInfo?.stageName}
          </h1>
        </div>

        <div
          className={cn(
            'flex',
            'px-[1.5rem]',
            'py-[2.5rem]',
            'justify-center',
            'items-center',
            'gap-[0.625rem]',
            'rounded-xl',
            'bg-main-100',
            'w-full',
          )}
        >
          <p className={cn('text-h1e', 'text-main-600')}>
            {isNormalType ? `${couponInfo?.point?.toLocaleString()}P` : '???'}
          </p>
        </div>

        <p className={cn('text-caption3s', 'text-gray-500')}>
          {isNormalType
            ? '지급용 쿠폰은 명시된 포인트만큼 확정 지급됩니다. 확률 요소 없이 고정된 포인트가 즉시 적립됩니다.'
            : '본 쿠폰은 획득 포인트 또는 차감 포인트 중 하나가 50% 확률로 적용됩니다. 차감 포인트 적용 시, 보유 포인트보다 차감 포인트가 많을 경우 보유 포인트는 0으로 초기화되며, 초과 차감 포인트는 소멸됩니다.'}
        </p>
      </div>

      <div
        className={cn(
          'absolute',
          'max-w-[21.4375rem]',
          'w-full',
          'bottom-[5rem]',
        )}
      >
        <Button disabled={isUseCoupon} onClick={() => clickUseCouponBtn()}>
          {isUseCoupon ? '사용됨' : '사용하기'}
        </Button>
      </div>
    </div>
  );
};

export default CouponPage;

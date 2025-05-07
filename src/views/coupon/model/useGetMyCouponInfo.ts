import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { CouponInfoType } from '@/shared/types/coupon';
import minutesToMs from '@/shared/utils/minutesToms';
import { getMyCouponInfo } from '../api/getMyCouponInfo';

export const useGetMyCouponInfo = (
  couponId: string,
  options?: Omit<
    Parameters<typeof useQuery<CouponInfoType>>[0],
    'queryKey' | 'queryFn'
  >,
) => {
  const [is404, setIs404] = useState(false);

  const query = useQuery<CouponInfoType>({
    queryKey: ['my', 'coupon', couponId],
    queryFn: async () => {
      try {
        const data = await getMyCouponInfo(couponId);
        return data;
      } catch (err) {
        if ((err as Error).message === '404') {
          setIs404(true);
        }
        throw err;
      }
    },
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(5),
    ...options,
  });

  return {
    ...query,
    is404,
  };
};

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { CouponInfoType } from '@/shared/types/coupon';
import minutesToMs from '@/shared/utils/minutesToms';
import { getMyCouponInfo } from '../api/getMyCouponInfo';

export const useGetMyCouponInfo = (
  couponId: string,
  options?: Omit<UseQueryOptions<CouponInfoType>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<CouponInfoType>({
    queryKey: ['my', 'coupon', couponId],
    queryFn: () => getMyCouponInfo(couponId),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(5),
    ...options,
  });
};

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { CouponResponseType } from '@/shared/types/coupon';
import { postMyCoupon } from '../api/postMyCoupon';

export const usePostMyCoupon = (couponId: string) => {
  return useMutation<CouponResponseType>({
    mutationFn: () => postMyCoupon(couponId),
    onSuccess: () => {
      toast.success('쿠폰 사용이 완료되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

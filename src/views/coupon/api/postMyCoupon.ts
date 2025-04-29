import axios from 'axios';
import clientInstance from '@/shared/libs/http/clientInstance';
import { CouponResponseType } from '@/shared/types/coupon';

export const postMyCoupon = async (couponId: string) => {
  try {
    const response = await clientInstance.post<CouponResponseType>(
      `/stage/coupon?couponId=${couponId}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '쿠폰 사용에 실패 했습니다.',
      );
    }
    throw error;
  }
};

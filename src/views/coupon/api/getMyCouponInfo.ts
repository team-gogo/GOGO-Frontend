import axios from 'axios';
import clientInstance from '@/shared/libs/http/clientInstance';
import { CouponInfoType } from '@/shared/types/coupon';

export const getMyCouponInfo = async (
  couponId: string,
): Promise<CouponInfoType> => {
  try {
    const response = await clientInstance.get<CouponInfoType>(
      `/stage/coupon?couponId=${couponId}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '내 쿠폰 정보 불러오기를 실패 했습니다.',
      );
    }
    throw error;
  }
};

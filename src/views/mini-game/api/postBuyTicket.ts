import axios from 'axios';
import clientInstance from '@/shared/api/clientInstance';

export const postBuyTicket = async (
  ticketType: 'COINTOSS' | 'YAVARWEE' | 'PLINKO',
  shopId: string,
) => {
  try {
    await clientInstance.post(`/shop/${shopId}`, {
      purchaseQuantity: 1,
      ticketType,
    });
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || '티켓구매 실패했습니다.');
    }
    throw error;
  }
};

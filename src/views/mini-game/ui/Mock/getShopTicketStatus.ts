import { ShopTicketStatusDto } from '@/shared/types/mini-game';

const getShopTickerStatus = (): ShopTicketStatusDto => {
  return {
    shopId: 1,
    coinToss: {
      id: 101,
      ticketPrice: 500,
      ticketQuantity: 10,
    },
    yavarwee: {
      id: 102,
      ticketPrice: 700,
      ticketQuantity: 5,
    },
    plinko: {
      id: 103,
      ticketPrice: 300,
      ticketQuantity: 20,
    },
  };
};

export default getShopTickerStatus;

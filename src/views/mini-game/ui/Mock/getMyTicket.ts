import { MyTicketType } from '@/shared/types/mini-game';

const getMyTicket = (): MyTicketType => {
  return {
    plinko: 2,
    yavarwee: 0,
    coinToss: 5,
  };
};

export default getMyTicket;

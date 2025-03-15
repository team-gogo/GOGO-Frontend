export interface ActiveGameList {
  isPlinkoActive: boolean;
  isCoinTossActive: boolean;
  isYavarweeActive: boolean;
}

export interface MyTicketType {
  plinko: number;
  yavarwee: number;
  coinToss: number;
}

export interface GameTicket {
  id: number;
  ticketPrice: number;
  ticketQuantity: number;
}

export interface ShopTicketStatusDto {
  shopId: number;
  coinToss: GameTicket;
  yavarwee: GameTicket;
  plinko: GameTicket;
}

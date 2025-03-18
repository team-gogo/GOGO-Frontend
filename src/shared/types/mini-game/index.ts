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

export interface PlinkoFormType {
  amount: number;
  times: number;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface PlinkoResponse {
  amount: number;
  multi: number;
}

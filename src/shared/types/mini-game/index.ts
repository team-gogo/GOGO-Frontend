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
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface PlinkoResponse {
  amount: number;
  multi: number;
}

export interface getMyPointResponse {
  point: number;
}
interface MiniGameConfig {
  minBetPoint: number;
  maxBetPoint: number;
}

export interface ResponseBetLimit {
  plinko: MiniGameConfig;
  yavarwee: MiniGameConfig;
  coinToss: MiniGameConfig;
}

export interface YavarweeForm {
  amount: number;
  bet: '1' | '2' | '3';
}
export interface betAmountFormData {
  amount: number;
}
export interface YavarweeBetResponse {
  uuid: string;
}

export interface YavarweeConfirmFormData {
  uuid: string;
  round: number;
  status: boolean;
}
export interface YavarweeComfirmResponse {
  amount: number;
}

export interface CupState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  zIndex: number;
  originalId: number;
  animationProgress: number;
  animationDuration: number;
}

export interface BallState {
  x: number;
  y: number;
  visible: boolean;
  scale: number;
}

export type GameState =
  | 'idle'
  | 'betting'
  | 'showing'
  | 'hiding'
  | 'shuffling'
  | 'selecting'
  | 'result'
  | 'round';

export type Result = 'correct' | 'wrong' | null;

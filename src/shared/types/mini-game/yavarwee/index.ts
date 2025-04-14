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

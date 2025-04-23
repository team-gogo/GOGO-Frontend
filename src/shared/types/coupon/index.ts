export interface CouponInfoType {
  isUsed: boolean;
  stageId?: number;
  stageName?: string;
  couponType?: 'NORMAL' | 'RANDOM';
  point?: number;
}

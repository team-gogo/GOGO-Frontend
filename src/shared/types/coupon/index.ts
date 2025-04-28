export interface CouponInfoType {
  isUsed: boolean;
  stageId?: number;
  stageName?: string;
  couponType?: 'NORMAL' | 'RANDOM';
  point?: number;
}

export interface CouponResponseType {
  isGain: boolean;
  earnedPoint: number;
  lostedPoint: number;
  beforePoint: number;
  afterPoint: number;
}

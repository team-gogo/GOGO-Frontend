type StageType = 'FAST' | 'OFFICIAL';
type StageStatus = 'RECRUITING' | 'CONFIRMED' | 'END';

export interface StagesType {
  stageId: number;
  stageName: string;
  type: StageType;
  status: StageStatus;
  participantCount: number;
  isParticipating: boolean;
  isMaintainer: boolean;
  isPassCode: boolean;
}

export interface StageResponse {
  stages: StagesType[];
}

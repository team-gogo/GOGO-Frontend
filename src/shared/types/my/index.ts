type StageType = 'FAST' | 'OFFICIAL';
type StageStatus = 'RECRUITING' | 'CONFIRMED' | 'END';

export interface MyStageType {
  stageId: number;
  stageName: string;
  type: StageType[];
  status: StageStatus;
  isMaintaining: boolean;
}

export interface MyStageResponse {
  stages: MyStageType[];
}

type Sex = 'MALE' | 'FEMALE';

export interface UserInfoType {
  name: string;
  schoolName: string;
  sex: Sex;
}

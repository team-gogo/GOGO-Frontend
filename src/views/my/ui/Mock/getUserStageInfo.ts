import { MyStageResponse } from '@/shared/types/my';

const getUserStageInfo = (): MyStageResponse => {
  return {
    stages: [
      {
        stageId: 1,
        stageName: 'Stage 1',
        type: ['FAST'],
        status: 'RECRUITING',
        isMaintaining: false,
      },
      {
        stageId: 2,
        stageName: 'Stage 2',
        type: ['OFFICIAL'],
        status: 'CONFIRMED',
        isMaintaining: true,
      },
      {
        stageId: 3,
        stageName: 'Stage 3',
        type: ['FAST'],
        status: 'RECRUITING',
        isMaintaining: false,
      },
      {
        stageId: 4,
        stageName: 'Stage 4',
        type: ['FAST'],
        status: 'RECRUITING',
        isMaintaining: true,
      },
      {
        stageId: 5,
        stageName: 'Stage 5',
        type: ['OFFICIAL'],
        status: 'RECRUITING',
        isMaintaining: false,
      },
    ],
  };
};

export default getUserStageInfo;

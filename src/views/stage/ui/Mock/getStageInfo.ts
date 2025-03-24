import { StageResponse } from '@/shared/types/stage';

const getStageInfo = (): StageResponse => {
  return {
    stages: [
      {
        stageId: 1,
        stageName: 'Stage 1',
        type: 'FAST',
        status: 'RECRUITING',
        participantCount: 1,
        isParticipating: true,
        isMaintainer: false,
        isPassCode: true,
      },
      {
        stageId: 2,
        stageName: 'Stage 2',
        type: 'OFFICIAL',
        status: 'CONFIRMED',
        participantCount: 2,
        isParticipating: false,
        isMaintainer: true,
        isPassCode: true,
      },
      {
        stageId: 3,
        stageName: 'Stage 3',
        type: 'FAST',
        status: 'RECRUITING',
        participantCount: 3,
        isParticipating: true,
        isMaintainer: false,
        isPassCode: true,
      },
      {
        stageId: 4,
        stageName: 'Stage 4',
        type: 'FAST',
        status: 'RECRUITING',
        participantCount: 3,
        isParticipating: false,
        isMaintainer: true,
        isPassCode: false,
      },
      {
        stageId: 5,
        stageName: 'Stage 5',
        type: 'OFFICIAL',
        status: 'CONFIRMED',
        participantCount: 3,
        isParticipating: true,
        isMaintainer: false,
        isPassCode: false,
      },
      {
        stageId: 6,
        stageName: 'Stage 6',
        type: 'FAST',
        status: 'RECRUITING',
        participantCount: 3,
        isParticipating: false,
        isMaintainer: false,
        isPassCode: false,
      },
    ],
  };
};

export default getStageInfo;

import { TempPointsResponse } from '@/shared/types/my/bet';

const getTempPoint = (): TempPointsResponse => {
  return {
    tempPoints: [
      {
        tempPointId: 1,
        tempPoint: 100,
        expiredDate: '2025-03-12T01:41:00',
      },
      {
        tempPointId: 2,
        tempPoint: 50,
        expiredDate: '2025-03-12T01:41:00',
      },
      {
        tempPointId: 3,
        tempPoint: 200,
        expiredDate: '2025-03-12T01:41:00',
      },
    ],
  };
};

export default getTempPoint;

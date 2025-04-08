import { useQuery } from '@tanstack/react-query';
import { getIsWasted, GetIsWastedResponse } from '../api/getIsWasted';

export const useGetIsWasted = (stageId: number) => {
  return useQuery<GetIsWastedResponse, Error>({
    queryKey: ['isWasted', stageId],
    queryFn: () => getIsWasted(stageId),
  });
};

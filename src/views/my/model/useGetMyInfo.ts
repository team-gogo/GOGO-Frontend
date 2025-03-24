import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { userInfoResponse } from '@/shared/types/my';
import minutesToMs from '@/shared/utils/minutesToms';
import { getMyInfo } from '../api/getMyInfo';

export const useGetMyInfo = (
  options?: Omit<UseQueryOptions<userInfoResponse>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<userInfoResponse>({
    queryKey: ['my', 'info', 'get'],
    queryFn: getMyInfo,
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(5),
    ...options,
  });
};

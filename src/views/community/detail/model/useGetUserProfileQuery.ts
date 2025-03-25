import { useQuery } from '@tanstack/react-query';
import { GetStudentInfo } from '@/shared/types/my/edit';
import { getUserProfile } from '../api/getUserProfile';

export const useGetUserProfileQuery = () => {
  return useQuery<GetStudentInfo, Error>({
    queryKey: ['userProfile'],
    queryFn: () => getUserProfile(),
  });
};

import { useQuery } from '@tanstack/react-query';
import getSchool from '../api/getSchool';

export const useSchoolQuery = (schoolName: string | undefined) => {
  return useQuery({
    queryKey: ['schools', schoolName],
    queryFn: () => getSchool(schoolName ?? ''),
    enabled: !!schoolName && schoolName.length > 0,
  });
};

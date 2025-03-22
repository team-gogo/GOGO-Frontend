import { useQuery } from '@tanstack/react-query';
import { StudentResponse } from '@/shared/types/stage/create';
import { getSearchStudent } from '../api/getSearchStudent';

export const useSearchStudentQuery = (searchTerm: string) => {
  return useQuery<StudentResponse[], Error>({
    queryKey: ['searchStudent', searchTerm],
    queryFn: () => getSearchStudent(searchTerm),
    enabled: searchTerm.trim().length > 0,
  });
};

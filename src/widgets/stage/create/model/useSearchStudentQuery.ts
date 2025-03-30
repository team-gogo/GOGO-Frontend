import { useQuery } from '@tanstack/react-query';
import { useDebouncedValue } from '@/shared/model/useDebouncedValue';
import { StudentResponse } from '@/shared/types/stage/create';
import { getSearchStudent } from '../api/getSearchStudent';

export const useSearchStudentQuery = (searchTerm: string) => {
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 200);

  return useQuery<StudentResponse[], Error>({
    queryKey: ['searchStudent', debouncedSearchTerm],
    queryFn: () => getSearchStudent(debouncedSearchTerm),
    enabled: debouncedSearchTerm.trim().length > 0,
  });
};

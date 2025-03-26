import { useState } from 'react';
import { SortType } from '@/shared/model/sportTypes';

const useSelectSort = () => {
  const [selectedSort, setSelectedSort] = useState<SortType | null>(null);

  const toggleSortSelection = (sport: SortType) => {
    setSelectedSort((prev) => (prev === sport ? null : sport));
  };

  return {
    selectedSort,
    toggleSortSelection,
  };
};

export default useSelectSort;

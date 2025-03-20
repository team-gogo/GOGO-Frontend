import { useState } from 'react';
import { SportType } from '@/shared/model/sportTypes';

const useSelectSport = () => {
  const [selectedSport, setSelectedSport] = useState<SportType | null>(null);

  const toggleSportSelection = (sport: SportType) => {
    setSelectedSport((prev) => (prev === sport ? null : sport));
  };

  return {
    selectedSport,
    toggleSportSelection,
  };
};

export default useSelectSport;

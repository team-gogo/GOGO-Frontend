import { useState } from 'react';
import { Control, useFieldArray, UseFormWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getCategoryLabel } from '@/entities/stage/create/official/constants/sportTypes';
import { SportType } from '@/shared/model/sportTypes';
import { OfficialStageData } from '@/shared/types/stage/create/official';
import { validateCurrentSportFields } from './validateFields';

export const useMatchSetting = (
  control: Control<OfficialStageData>,
  watch: UseFormWatch<OfficialStageData>,
) => {
  const [selectedSport, setSelectedSport] = useState<SportType | null>(null);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'game',
  });

  const handleSportSelect = (sport: SportType) => {
    if (selectedSport && selectedSport !== sport) {
      const isValid = validateCurrentSportFields({
        selectedSport,
        fields,
        watch,
      });

      if (!isValid) {
        toast.error(
          `${getCategoryLabel(selectedSport)} 카테고리의 모든 필드를 작성해주세요.`,
        );
        return;
      }
    }

    setSelectedSport(sport);
  };

  const handleAddGame = () => {
    if (selectedSport) {
      append({
        category: selectedSport,
        name: '',
        system: 'TOURNAMENT',
        teamMinCapacity: null,
        teamMaxCapacity: null,
      });
    }
  };

  const filteredFields = fields.filter((field) =>
    selectedSport ? field.category.includes(selectedSport) : true,
  );

  return {
    selectedSport,
    fields,
    filteredFields,
    remove,
    handleSportSelect,
    handleAddGame,
  };
};

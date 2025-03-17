import { useState } from 'react';
import { Control, useFieldArray, UseFormWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getCategoryLabel } from '@/entities/stage/create';
import { SportType } from '@/shared/model/sportTypes';
import { StageData } from '@/shared/types/stage/create';
import { validateCurrentSportFields } from './validateFields';

export const useMatchSetting = (
  control: Control<StageData>,
  watch: UseFormWatch<StageData>,
  mode: 'fast' | 'official',
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
      // Fast 모드에서는 하나의 경기만 생성 가능
      if (mode === 'fast' && fields.length >= 1) {
        toast.error('빠른 경기 모드에서는 하나의 경기만 생성할 수 있습니다.');
        return;
      }

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

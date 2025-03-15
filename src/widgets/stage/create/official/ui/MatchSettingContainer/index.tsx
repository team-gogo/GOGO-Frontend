import React, { useState } from 'react';
import {
  useFieldArray,
  UseFormRegister,
  Control,
  UseFormWatch,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import { AddButton } from '@/entities/stage/create/official';
import GameField from '@/entities/stage/create/official/ui/GameField';
import { SportType } from '@/shared/model/sportTypes';
import { OfficialStageData } from '@/shared/types/stage/create/official';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';

interface MatchSettingContainerProps {
  control: Control<OfficialStageData>;
  register: UseFormRegister<OfficialStageData>;
  watch: UseFormWatch<OfficialStageData>;
}

const MatchSettingContainer = ({
  control,
  register,
  watch,
}: MatchSettingContainerProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'game',
  });

  const [selectedSport, setSelectedSport] = useState<SportType | null>(null);

  const categoryTypes: SportType[] = [
    'VOLLEY_BALL',
    'SOCCER',
    'LOL',
    'BASE_BALL',
    'BASKET_BALL',
    'BADMINTON',
    'ETC',
  ];

  const matchTypeOptions = [
    { value: 'TOURNAMENT', label: '토너먼트' },
    { value: 'FULL_LEAGUE', label: '리그전' },
    { value: 'SINGLE', label: '단판' },
  ];

  const getCategoryLabel = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      VOLLEY_BALL: '배구',
      SOCCER: '축구',
      LOL: 'LOL',
      BASE_BALL: '야구',
      BASKET_BALL: '농구',
      BADMINTON: '배드민턴',
      ETC: '기타',
    };
    return categoryMap[category] || category;
  };

  const validateCurrentSportFields = () => {
    if (!selectedSport) return true;

    const currentFields = fields.filter(
      (field) => field.category === selectedSport,
    );
    if (currentFields.length === 0) return true;

    for (let i = 0; i < currentFields.length; i++) {
      const fieldIndex = fields.findIndex(
        (field) => field.id === currentFields[i].id,
      );
      const fieldName = watch(`game.${fieldIndex}.name`);
      const fieldMinCapacity = watch(`game.${fieldIndex}.teamMinCapacity`);
      const fieldMaxCapacity = watch(`game.${fieldIndex}.teamMaxCapacity`);

      if (!fieldName || !fieldMinCapacity || !fieldMaxCapacity) {
        return false;
      }
    }

    return true;
  };

  const handleSportSelect = (sport: SportType) => {
    if (selectedSport && selectedSport !== sport) {
      if (!validateCurrentSportFields()) {
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

  return (
    <div className={cn('space-y-16')}>
      <div className={cn('flex', 'justify-between')}>
        <p className={cn('text-white', 'text-body2e')}>경기</p>
        <div className={cn('flex', 'gap-12')}>
          <p className={cn('text-gray-500', 'text-body2s')}>총 경기</p>
          <p className={cn('text-white', 'text-body2s')}>{fields.length}</p>
        </div>
      </div>
      <div className={cn('flex', 'justify-between')}>
        <div className={cn('flex', 'gap-16', 'flex-wrap')}>
          {categoryTypes.map((sport) => (
            <SportTypeLabel
              key={sport}
              type={sport}
              asButton
              isSelected={selectedSport === sport}
              onClick={() => handleSportSelect(sport)}
            />
          ))}
        </div>
        <AddButton onClick={handleAddGame} />
      </div>
      <div className={cn('space-y-[40px]')}>
        {filteredFields.map((field) => (
          <GameField
            watch={watch}
            key={field.id}
            register={register}
            index={fields.indexOf(field)}
            remove={remove}
            matchTypeOptions={matchTypeOptions}
          />
        ))}
      </div>
    </div>
  );
};

export default MatchSettingContainer;

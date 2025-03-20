import React from 'react';
import { UseFormRegister, Control, UseFormWatch } from 'react-hook-form';
import { AddButton } from '@/entities/stage/create/official';
import { categoryTypes } from '@/entities/stage/create/official/constants/sportTypes';
import GameField from '@/entities/stage/create/official/ui/GameField';
import { OfficialStageData } from '@/shared/types/stage/create/official';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';
import { matchTypeOptions } from '../../constants/matchTypes';
import { useMatchSetting } from '../../model/useMatchSetting';

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
  const {
    selectedSport,
    fields,
    filteredFields,
    remove,
    handleSportSelect,
    handleAddGame,
  } = useMatchSetting(control, watch);

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

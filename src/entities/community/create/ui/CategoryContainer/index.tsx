import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { CommunityCreateFormData } from '@/shared/types/community/create';
import { SportType } from '@/shared/model/sportTypes';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';

interface CategoryContainerProps {
  register: UseFormRegister<CommunityCreateFormData>;
  setValue: UseFormSetValue<CommunityCreateFormData>;
  selectedSport: SportType | null;
  toggleSportSelection: (sport: SportType) => void;
}

const CategoryContainer = ({
  register,
  setValue,
  selectedSport,
  toggleSportSelection,
}: CategoryContainerProps) => {
  const categoryTypes: SportType[] = [
    'VOLLEY_BALL',
    'SOCCER',
    'LOL',
    'BASE_BALL',
    'BASKET_BALL',
    'BADMINTON',
    'ETC',
  ];

  register('gameCategory', { required: '경기 종류를 선택해주세요.' });

  const handleSportSelection = (sport: SportType) => {
    toggleSportSelection(sport);
    setValue('gameCategory', sport, { shouldValidate: true });
  };

  return (
    <div className={cn('flex', 'flex-wrap', 'items-center', 'gap-16')}>
      {categoryTypes.map((sport) => (
        <SportTypeLabel
          key={sport}
          type={sport}
          asButton
          isSelected={selectedSport === sport}
          onClick={() => handleSportSelection(sport)}
        />
      ))}
    </div>
  );
};

export default CategoryContainer;

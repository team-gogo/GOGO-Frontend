import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useCategoryTypes } from '@/entities/community/model/useCategoryTypes';
import { SportType } from '@/shared/model/sportTypes';
import { CommunityCreateFormData } from '@/shared/types/community/create';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';

interface CategoryContainerProps {
  register: UseFormRegister<CommunityCreateFormData>;
  setValue: UseFormSetValue<CommunityCreateFormData>;
  selectedSport: SportType | null;
  toggleSportSelection: (sport: SportType) => void;
  stageId: string;
}

const CategoryContainer = ({
  register,
  setValue,
  selectedSport,
  toggleSportSelection,
  stageId,
}: CategoryContainerProps) => {
  const { categoryTypes, isLoading } = useCategoryTypes(stageId);
  register('gameCategory', { required: '경기 종류를 선택해주세요.' });

  const handleSportSelection = (sport: SportType) => {
    toggleSportSelection(sport);
    setValue('gameCategory', sport, { shouldValidate: true });
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }

  return (
    <div className={cn('flex', 'flex-wrap', 'items-center', 'gap-16')}>
      {categoryTypes.map((sport) => (
        <SportTypeLabel
          key={sport}
          type={sport}
          asButton
          isSelected={selectedSport === sport}
          onClick={() => handleSportSelection(sport)}
          isHaveBorder={true}
        />
      ))}
    </div>
  );
};

export default CategoryContainer;

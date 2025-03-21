import { UseFormWatch } from 'react-hook-form';
import { SportType } from '@/shared/model/sportTypes';
import { StageData } from '@/shared/types/stage/create';

interface ValidateCurrentSportFieldsProps {
  selectedSport: SportType | null;
  fields: Array<{
    id: string;
    category: SportType;
  }>;
  watch: UseFormWatch<StageData>;
}

export const validateCurrentSportFields = ({
  selectedSport,
  fields,
  watch,
}: ValidateCurrentSportFieldsProps): boolean => {
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

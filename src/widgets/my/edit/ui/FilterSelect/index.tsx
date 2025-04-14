import { useEffect } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import CheckingBoxIcon from '@/shared/assets/svg/CheckingBoxIcon';
import { PatchStudentInfo } from '@/shared/types/my/edit';
import { cn } from '@/shared/utils/cn';

interface FilterSelectProps {
  filtered: boolean;
  setFiltered: (filter: boolean) => void;
  setValue: UseFormSetValue<PatchStudentInfo>;
  watch: UseFormWatch<PatchStudentInfo>;
}

const FilterSelect = ({
  filtered,
  setFiltered,
  setValue,
  watch,
}: FilterSelectProps) => {
  useEffect(() => {
    const isFiltered = watch('isFiltered');
    setFiltered(isFiltered);
    setValue('isFiltered', isFiltered, { shouldValidate: true });
  }, []);

  const handleFilterSelect = (filter: boolean) => {
    setFiltered(filter);
    setValue('isFiltered', filter, { shouldValidate: true });
  };

  return (
    <div className={cn('w-full', 'flex', 'justify-between', 'items-center')}>
      <h2
        className={cn(
          'text-body1s',
          filtered ? 'text-main-600' : 'text-gray-500',
        )}
      >
        민감한 게시글 확인하기
      </h2>
      <button
        type="button"
        onClick={() => handleFilterSelect(!filtered)}
        className={cn(
          'flex',
          'w-[2.25rem]',
          'h-[2.25rem]',
          'justify-center',
          'items-center',
        )}
      >
        <CheckingBoxIcon isChecked={filtered} />
      </button>
    </div>
  );
};

export default FilterSelect;

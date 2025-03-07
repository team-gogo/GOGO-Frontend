import FilterIcon from '@/shared/assets/svg/FilterIcon';
import { cn } from '@/shared/utils/cn';

const FilterButton = () => {
  return (
    <button
      type="button"
      className={cn(
        'flex',
        'gap-8',
        'py-8',
        'px-16',
        'border-1',
        'border-solid',
        'border-main-500',
        'items-center',
        'rounded-lg',
      )}
    >
      <FilterIcon />
      <p
        className={cn(
          'text-main-500',
          'text-body3s',
          'text-nowrap',
          'mobile:text-caption3s',
        )}
      >
        필터
      </p>
    </button>
  );
};

export default FilterButton;

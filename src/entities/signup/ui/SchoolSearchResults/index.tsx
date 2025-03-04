import React from 'react';
import { School } from '@/shared/types/signup';
import { cn } from '@/shared/utils/cn';

interface SchoolSearchResultsProps {
  schools: School[] | null | undefined;
  isLoading: boolean;
  onSelect: (school: School) => void;
}

const SchoolSearchResults = ({
  schools,
  isLoading,
  onSelect,
}: SchoolSearchResultsProps) => {
  if (isLoading) {
    return <div className={cn('text-white', 'mt-2')}>검색 중...</div>;
  }

  if (!schools || schools.length === 0) {
    return (
      <div className={cn('text-white', 'mt-2')}>검색 결과가 없습니다.</div>
    );
  }

  return (
    <ul
      className={cn(
        'bg-gray-700',
        'rounded-md',
        'mt-2',
        'max-h-60',
        'overflow-y-auto',
      )}
    >
      {schools.map((school, index) => (
        <li
          key={`${school.SCHUL_NM}-${index}`}
          className={cn(
            'px-4',
            'py-2',
            'hover:bg-gray-600',
            'cursor-pointer',
            'text-white',
          )}
          onClick={() => onSelect(school)}
        >
          {school.SCHUL_NM}
        </li>
      ))}
    </ul>
  );
};

export default SchoolSearchResults;

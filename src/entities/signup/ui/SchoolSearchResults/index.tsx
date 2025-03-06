import React, { useState } from 'react';
import { School } from '@/shared/types/signup';
import Button from '@/shared/ui/button';
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
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  if (isLoading) {
    return <div className={cn('text-white', 'mt-2')}>검색 중...</div>;
  }

  if (!schools || schools.length === 0) {
    return (
      <div className={cn('text-white', 'mt-2')}>검색 결과가 없습니다.</div>
    );
  }

  const handleSchoolClick = (school: School) => {
    setSelectedSchool(school);
  };

  const handleConfirm = () => {
    if (selectedSchool) {
      onSelect(selectedSchool);
    }
  };

  return (
    <ul
      className={cn(
        'bg-gray-700',
        'rounded-lg',
        'mt-16',
        'overflow-y-auto',
        'p-24',

        'space-y-24',
      )}
    >
      {schools.map((school, index) => (
        <li
          key={`${school.SCHUL_NM}-${index}`}
          className={cn(
            'text-body2s',
            'pb-16',
            'border-b-1',
            'border-solid',
            'border-gray-600',
            'cursor-pointer',
            selectedSchool === school ? 'text-white' : 'text-gray-400',
          )}
          onClick={() => handleSchoolClick(school)}
        >
          {school.SCHUL_NM}
        </li>
      ))}
      <Button onClick={handleConfirm} disabled={!selectedSchool}>
        확인
      </Button>
    </ul>
  );
};

export default SchoolSearchResults;

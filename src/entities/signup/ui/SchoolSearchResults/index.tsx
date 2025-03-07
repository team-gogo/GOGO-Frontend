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
        'p-24',
        'space-y-24',
        'z-50',
        'absolute',
        'w-full',
        'max-h-[450px]',
        'overflow-y-auto',
      )}
    >
      {isLoading ? (
        <li className="pb-16 text-body2s text-gray-500">로딩중...</li>
      ) : schools && schools.length === 0 ? (
        <li className="pb-16 text-body2s text-gray-500">
          검색 결과가 존재하지 않습니다
        </li>
      ) : (
        schools?.map((school, index) => (
          <li
            key={`${school.SCHUL_NM}-${index}`}
            className={cn(
              'text-body2s',
              'pb-16',
              'cursor-pointer',
              selectedSchool === school ? 'text-white' : 'text-gray-400',
              index < schools.length - 1
                ? 'border-b-1 border-solid border-gray-600'
                : '',
            )}
            onClick={() => handleSchoolClick(school)}
          >
            {school.SCHUL_NM}
            <p className={cn('text-body3s')}>{school.ORG_RDNMA}</p>
          </li>
        ))
      )}
      <Button onClick={handleConfirm} disabled={!selectedSchool}>
        확인
      </Button>
    </ul>
  );
};

export default SchoolSearchResults;

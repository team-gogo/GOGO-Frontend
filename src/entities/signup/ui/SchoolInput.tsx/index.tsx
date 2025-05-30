'use client';

import { useState, useEffect, useRef } from 'react';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { SearchIcon } from '@/shared/assets/icons';
import { School, SignupFormData } from '@/shared/types/signup';
import Input from '@/shared/ui/input';
import SearchResults from '@/shared/ui/SearchResults';
import { useSchoolQuery } from '../../model/useSchoolQuery';

interface SchoolInputProps {
  register: UseFormRegister<SignupFormData>;
  setValue: UseFormSetValue<SignupFormData>;
  watch: UseFormWatch<SignupFormData>;
  selectedSchool: School | null;
  setSelectedSchool: (school: School | null) => void;
}

const SchoolInput = ({
  register,
  setValue,
  watch,
  selectedSchool,
  setSelectedSchool,
}: SchoolInputProps) => {
  const [isSearchResultsVisible, setSearchResultsVisible] = useState(true);
  const [localSelectedSchool, setLocalSelectedSchool] = useState<School | null>(
    selectedSchool,
  );
  const searchResultsRef = useRef<HTMLDivElement | null>(null);
  const schoolName = watch('schoolName');
  const { data: schools, isLoading } = useSchoolQuery(schoolName);

  const handleSchoolSelect = (selectedSchools: School[]) => {
    if (selectedSchools.length > 0) {
      const school = selectedSchools[0];
      setSelectedSchool(school);
      setValue('schoolName', school.SCHUL_NM);
      setSearchResultsVisible(false);
    }
  };

  const getSchoolId = (school: School) => school.SD_SCHUL_CODE;

  const handleClickOutside = (e: MouseEvent) => {
    if (
      searchResultsRef.current &&
      !searchResultsRef.current.contains(e.target as Node)
    ) {
      setSearchResultsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <Input
        {...register('schoolName', { required: '학교 이름은 필수입니다.' })}
        placeholder="학교를 알려주세요."
        icon={<SearchIcon size={24} />}
        onChange={(e) => {
          setValue('schoolName', e.target.value);
          setSelectedSchool(null);
          setLocalSelectedSchool(null);
          setSearchResultsVisible(true);
        }}
      />
      {schoolName && !selectedSchool && isSearchResultsVisible && (
        <div ref={searchResultsRef}>
          <SearchResults<School>
            items={schools}
            isLoading={isLoading}
            SearchinputValue={schoolName}
            onSelect={handleSchoolSelect}
            getDisplayName={(school) => school.SCHUL_NM}
            getSubText={(school) => school.ORG_RDNMA}
            isAbsolute={true}
            multiSelect={false}
            selectedItems={localSelectedSchool ? [localSelectedSchool] : []}
            getItemId={getSchoolId}
            showCheckbox={false}
          />
        </div>
      )}
    </>
  );
};

export default SchoolInput;

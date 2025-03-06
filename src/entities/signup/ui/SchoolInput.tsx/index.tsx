import { useState, useEffect, useRef } from 'react';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { SearchIcon } from '@/shared/assets/icons';
import { School, SignupFormData } from '@/shared/types/signup';
import Input from '@/shared/ui/input';
import { useSchoolQuery } from '../../model/useSchoolQuery';
import SchoolSearchResults from '../SchoolSearchResults';

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
  const searchResultsRef = useRef<HTMLDivElement | null>(null); // Ref 타입 지정
  const schoolName = watch('schoolName');
  const { data: schools, isLoading } = useSchoolQuery(schoolName);

  const handleSchoolSelect = (school: School) => {
    setSelectedSchool(school);
    setValue('schoolName', school.SCHUL_NM);
    setSearchResultsVisible(false);
  };

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
          setSearchResultsVisible(true);
        }}
      />
      {schoolName && !selectedSchool && isSearchResultsVisible && (
        <div ref={searchResultsRef}>
          <SchoolSearchResults
            schools={schools}
            isLoading={isLoading}
            onSelect={handleSchoolSelect}
          />
        </div>
      )}
    </>
  );
};

export default SchoolInput;

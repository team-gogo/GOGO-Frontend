import { SignupFormData, School } from '@/shared/types/signup';

export const formatSignupData = (
  data: SignupFormData,
  selectedSchool: School,
  selectedGender: 'MALE' | 'FEMALE' | null,
) => {
  return {
    deviceToken: null,
    name: data.name,
    grade: Number(data.schoolGrade),
    classNumber: Number(data.schoolClass),
    studentNumber: Number(data.schoolNumber),
    sex: selectedGender,
    school: {
      sdCode: selectedSchool.SD_SCHUL_CODE,
      name: selectedSchool.SCHUL_NM,
      type:
        selectedSchool.SCHUL_KND_SC_NM === '중학교'
          ? 'MiddleSchool'
          : 'HighSchool',
      address: selectedSchool.ORG_RDNMA,
      region: selectedSchool.LCTN_SC_NM,
      phoneNumber: selectedSchool.ORG_TELNO,
    },
  };
};

import { PatchStudentInfo } from '@/shared/types/my/edit';

export const formatEditData = (
  data: PatchStudentInfo,
  selectedSex: 'MALE' | 'FEMALE' | null,
  filterd: boolean,
) => {
  return {
    deviceToken: null,
    name: data.name,
    sex: selectedSex,
    grade: Number(data.grade),
    classNumber: Number(data.classNumber),
    studentNumber: Number(data.studentNumber),
    isFiltered: filterd,
  };
};

import { GetStudentInfo } from '@/shared/types/my/edit';

const getMockStudentInfo = (): GetStudentInfo => {
  return {
    studentId: 1,
    name: '김철수',
    schoolId: 101,
    grade: 3,
    schoolName: '서울고등학교',
    classNumber: 2,
    studentNumber: 15,
    sex: 'MALE',
    isFiltered: true,
  };
};

export default getMockStudentInfo;

import { StudentResponse } from '@/shared/types/stage/create';

const getStudentListInfoMock = (): StudentResponse => {
  return {
    students: [
      {
        studentId: 1,
        grade: 1,
        studentNumber: 1,
        classNumber: 1,
        name: '김철수',
      },
      {
        studentId: 2,
        grade: 1,
        studentNumber: 2,
        classNumber: 1,
        name: '이영희',
      },
      {
        studentId: 3,
        grade: 2,
        studentNumber: 1,
        classNumber: 2,
        name: '박민수',
      },
      {
        studentId: 4,
        grade: 2,
        studentNumber: 2,
        classNumber: 2,
        name: '정지원',
      },
      {
        studentId: 5,
        grade: 3,
        studentNumber: 1,
        classNumber: 3,
        name: '최유리',
      },
      {
        studentId: 6,
        grade: 3,
        studentNumber: 17,
        classNumber: 3,
        name: '정태관',
      },
    ],
  };
};

export default getStudentListInfoMock;

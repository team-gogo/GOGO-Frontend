type Sex = 'MALE' | 'FEMALE';

export interface GetStudentInfo {
  studentId: number;
  name: string;
  schoolId: number;
  grade: number;
  schoolName: string;
  classNumber: number;
  studentNumber: number;
  sex: Sex;
  isFiltered: boolean;
}

export interface PatchStudentInfo {
  name: string;
  sex: Sex;
  grade: number;
  classNumber: number;
  studentNumber: number;
  isFiltered: boolean;
}

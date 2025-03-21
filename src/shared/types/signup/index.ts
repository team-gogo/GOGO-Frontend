export interface SignupFormData {
  schoolGrade: string;
  schoolName: string;
  name: string;
  schoolClass: string;
  schoolNumber: string;
  gender: 'MALE' | 'FEMALE';
  school: {
    sdCode: string;
    name: string;
    type: string;
    address: string;
    region: string;
    phoneNumber: string;
  };
}

export interface School {
  ATPT_OFCDC_SC_CODE: string; // 교육청 코드
  SD_SCHUL_CODE: string; // 학교 코드
  SCHUL_NM: string; // 학교 이름
  SCHUL_KND_SC_NM: string; // 학교 종류 (예: 초등학교, 중학교, 고등학교)
  ADDR: string; // 주소
  ORG_TELNO: string; // 학교 전화번호
  HMPG_ADRES: string; // 홈페이지 주소
  ORG_RDNMA: string; // 도로명 주소
  LCTN_SC_NM: string; // 지역 정보 (추가된 속성)
}

export interface FormattedSignupData {
  name: string;
  grade: number;
  classNumber: number;
  studentNumber: number;
  sex: 'MALE' | 'FEMALE' | null;
  school: {
    sdCode: string;
    name: string;
    type: string;
    address: string;
    region: string;
    phoneNumber: string;
  };
}

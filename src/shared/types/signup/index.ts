export interface SignupFormData {
  schoolGrade: string;
  schoolName: string;
  name: string;
  schoolClass: string;
  schoolNumber: string;
  gender: 'male' | 'female';
}

export interface School {
  ATPT_OFCDC_SC_CODE: string;
  SD_SCHUL_CODE: string;
  SCHUL_NM: string;
  SCHUL_KND_SC_NM: string;
  ADDR: string;
  ORG_TELNO: string;
  HMPG_ADRES: string;
  ORG_RDNMA: string;
}

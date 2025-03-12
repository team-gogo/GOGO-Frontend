export interface RankingInfo {
  totalPage: number;
  totalElement: number;
}

export interface RankItem {
  rank: number;
  studentId: number;
  point: number;
  name: string;
  classNumber: number;
  studentNumber: number;
}

export interface RankingData {
  info: RankingInfo;
  rank: RankItem[];
}

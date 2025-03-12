interface RankingInfo {
  totalPage: number;
  totalElement: number;
}

interface RankItem {
  rank: number;
  studentId: number;
  name: string;
  classNumber: number;
  studentNumber: number;
}

export interface RankingData {
  info: RankingInfo;
  rank: RankItem[];
}

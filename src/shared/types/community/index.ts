type GameType =
  | 'soccer'
  | 'baseball'
  | 'volleyball'
  | 'basketball'
  | 'badminton'
  | 'etc';
type StageType = 's' | 'EASY' | 'MEDIUM' | 'HARD';

interface Author {
  studentId: number;
  name: string;
  classNumber: number;
  studentNumber: number;
}

interface BoardItem {
  boardId: number;
  gameType: GameType;
  title: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  isFiltered: boolean;
  stageType: StageType;
  author: Author;
}

interface BoardInfo {
  totalPage: number;
  totalElement: number;
}

export interface BoardData {
  info: BoardInfo;
  board: BoardItem[];
}

export interface CommunityItemProps {
  boardId: number;
  gameType: GameType;
  title: string;
  author: Author;
  likeCount: number;
  commentCount: number;
}

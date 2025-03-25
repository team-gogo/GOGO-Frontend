type GameType =
  | 'SOCCER'
  | 'BASE_BALL'
  | 'BASKET_BALL'
  | 'BADMINTON'
  | 'etc'
  | 'LOL'
  | 'VOLLEY_BALL';

type StageType = 's' | 'EASY' | 'MEDIUM' | 'HARD';

interface Author {
  studentId: number;
  name: string;
  classNumber: number;
  studentNumber: number;
}

interface BoardItem {
  boardId: number;
  gameCategory: GameType;
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
  gameCategory: GameType;
  title: string;
  author: Author;
  likeCount: number;
  commentCount: number;
}

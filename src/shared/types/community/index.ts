export type CategoryType =
  | 'SOCCER'
  | 'BASE_BALL'
  | 'BASKET_BALL'
  | 'BADMINTON'
  | 'ETC'
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
  gameCategory: CategoryType;
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
  gameCategory: CategoryType;
  title: string;
  author: Author;
  likeCount: number;
  commentCount: number;
}

enum System {
  TOURNAMENT = 'TOURNAMENT',
  FULL_LEAGUE = 'FULL_LEAGUE',
  SINGLE = 'SINGLE',
}

interface Game {
  gameId: number;
  gameName: string;
  teamCount: number;
  category: CategoryType;
  system: System;
  teamMinCapacity: number;
  teamMaxCapacity: number;
}

export interface ResponseStageGame {
  count: number;
  games: Game[];
}

export enum Category {
  SOCCER = 'SOCCER',
  BASKET_BALL = 'BASKET_BALL',
  BASE_BALL = 'BASE_BALL',
  VOLLEY_BALL = 'VOLLEY_BALL',
  BADMINTON = 'BADMINTON',
  LOL = 'LOL',
  ETC = 'ETC',
}

interface Author {
  studentId: number;
  name: string;
  classNumber: number;
  studentNumber: number;
}

interface Stage {
  name: string;
  category: Category;
}

export interface Comment {
  commentId: number;
  comment: string;
  createdAt: string;
  likeCount: number;
  author: Author;
}

export interface CommunityDetail {
  boardId: number;
  title: string;
  content: string;
  likeCount: number;
  isLiked: boolean;
  createdAt: string;
  stage: Stage;
  author: Author;
  commentCount: number;
  comment: Comment[];
}

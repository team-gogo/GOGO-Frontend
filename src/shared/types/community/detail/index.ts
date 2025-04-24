export enum Category {
  SOCCER = 'SOCCER',
  BASKET_BALL = 'BASKET_BALL',
  BASE_BALL = 'BASE_BALL',
  VOLLEY_BALL = 'VOLLEY_BALL',
  BADMINTON = 'BADMINTON',
  // LOL = 'LOL',
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
  content: string;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
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
  imageUrl: string;
  commentCount: number;
  comment: Comment[];
}

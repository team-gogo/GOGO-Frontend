import { Category, CommunityDetail } from '@/shared/types/community/detail';

export const getCommunityDetail = (): CommunityDetail => {
  return {
    boardId: 1,
    title: 'React Hook Form을 활용한 동적 폼 제작',
    content:
      'React Hook Form과 Zustand를 활용하여 동적 폼을 제작하는 방법을 공유합니다.',
    likeCount: 42,
    isLiked: true,
    createdAt: '2025-03-10T12:00:00',
    stage: {
      name: '스포츠',
      category: Category.SOCCER,
    },
    author: {
      studentId: 20250001,
      name: '김철수',
      classNumber: 1,
      studentNumber: 1,
    },
    commentCount: 3,
    comment: [
      {
        commentId: 101,
        comment: '좋은 정보 감사합니다! React Hook Form이 정말 유용하네요.',
        createdAt: '2025-03-10T12:30:00',
        likeCount: 10,
        isLiked: true,
        author: {
          studentId: 20250002,
          name: '이영희',
          classNumber: 1,
          studentNumber: 2,
        },
      },
      {
        commentId: 102,
        comment: 'Zustand와 함께 사용하면 상태 관리도 간편해서 좋은 것 같아요.',
        createdAt: '2025-03-10T13:00:00',
        likeCount: 5,
        isLiked: true,
        author: {
          studentId: 20250003,
          name: '박민수',
          classNumber: 2,
          studentNumber: 10,
        },
      },
      {
        commentId: 103,
        comment: 'Next.js 14에서의 적용 방법도 궁금합니다!',
        createdAt: '2025-03-10T14:15:00',
        likeCount: 8,
        isLiked: false,
        author: {
          studentId: 20250004,
          name: '최유리',
          classNumber: 3,
          studentNumber: 15,
        },
      },
      {
        commentId: 103,
        comment: 'Next.js 14에서의 적용 방법도 궁금합니다!',
        createdAt: '2025-03-10T14:15:00',
        likeCount: 8,
        isLiked: false,
        author: {
          studentId: 20250004,
          name: '최유리',
          classNumber: 3,
          studentNumber: 15,
        },
      },
      {
        commentId: 103,
        comment: 'Next.js 14에서의 적용 방법도 궁금합니다!',
        createdAt: '2025-03-10T14:15:00',
        likeCount: 8,
        isLiked: false,
        author: {
          studentId: 20250004,
          name: '최유리',
          classNumber: 3,
          studentNumber: 15,
        },
      },
      {
        commentId: 103,
        comment: 'Next.js 14에서의 적용 방법도 궁금합니다!',
        createdAt: '2025-03-10T14:15:00',
        likeCount: 8,
        isLiked: false,
        author: {
          studentId: 20250004,
          name: '최유리',
          classNumber: 3,
          studentNumber: 15,
        },
      },
      {
        commentId: 103,
        comment: 'Next.js 14에서의 적용 방법도 궁금합니다!',
        createdAt: '2025-03-10T14:15:00',
        likeCount: 8,
        isLiked: false,
        author: {
          studentId: 20250004,
          name: '최유리',
          classNumber: 3,
          studentNumber: 15,
        },
      },
      {
        commentId: 103,
        comment: 'Next.js 14에서의 적용 방법도 궁금합니다!',
        createdAt: '2025-03-10T14:15:00',
        likeCount: 8,
        isLiked: false,
        author: {
          studentId: 20250004,
          name: '최유리',
          classNumber: 3,
          studentNumber: 15,
        },
      },
    ],
  };
};

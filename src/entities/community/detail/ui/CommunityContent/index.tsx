'use client';

import { useState } from 'react';
import { CommentIcon } from '@/shared/assets/icons';
import HeartIcon from '@/shared/assets/icons/HeartIcon';
import { PersonIcon, SelectHeartIcon } from '@/shared/assets/svg';
import { formatIsoDate } from '@/shared/model/formatIsoDate';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';
import { usePostBoardLikeMutation } from '../../model/usePostBoardLikeMutation';

interface CommunityContentProps {
  title: string;
  content: string;
  authorName: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  stageCategory: string;
  stageName: string;
  isLiked: boolean;
  boardId: string;
  stageId: string;
}

const CommunityContent = ({
  title,
  content,
  authorName,
  likeCount,
  commentCount,
  createdAt,
  stageCategory,
  stageName,
  isLiked,
  boardId,
  stageId,
}: CommunityContentProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCountState, setLikeCountState] = useState(likeCount);

  const { mutate: boardLike } = usePostBoardLikeMutation(boardId, stageId);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCountState((prev) => (liked ? prev - 1 : prev + 1));
    boardLike();
  };

  return (
    <div
      className={cn(
        'px-24',
        'py-20',
        'bg-gray-700',
        'rounded-lg',
        'space-y-[2.75rem]',
      )}
    >
      <div className={cn('space-y-24')}>
        <div className={cn('flex', 'items-center', 'gap-24')}>
          <SportTypeLabel isHaveBorder={true} type={stageCategory} />
          <p
            className={cn('mobile:text-body1e', 'text-gray-300', 'text-body2e')}
          >
            {stageName}
          </p>
          <div className={cn('flex', 'items-center', 'gap-8')}>
            <PersonIcon />
            <p
              className={cn(
                'mobile:text-body3s',
                'text-gray-300',
                'text-caption1s',
              )}
            >
              {authorName}
            </p>
          </div>
        </div>
        <div className={cn('flex', 'flex-col', 'gap-16')}>
          <h1 className={cn('mobile:text-body2e', 'text-white', 'text-body3e')}>
            {title}
          </h1>
          <p className={cn('text-body3s', 'text-gray-300')}>{content}</p>
        </div>
      </div>
      <div className={cn('flex', 'items-center', 'justify-between')}>
        <div className={cn('flex', 'items-center', 'gap-16')}>
          <div className={cn('flex', 'items-center', 'gap-8')}>
            <CommentIcon />
            <p
              className={cn(
                'mobile:text-gray-300',
                'text-body3s',
                'text-caption1s',
              )}
            >
              {commentCount}
            </p>
          </div>
          <div
            className={cn('flex', 'items-center', 'gap-8', 'cursor-pointer')}
            onClick={handleLike}
          >
            {liked ? <SelectHeartIcon /> : <HeartIcon />}
            <p
              className={cn(
                'text-body3s',
                liked ? 'text-system-error' : 'text-gray-300',
              )}
            >
              {likeCountState}
            </p>
          </div>
        </div>
        <p className={cn('text-body3s', 'text-gray-500')}>
          {formatIsoDate(createdAt)}
        </p>
      </div>
    </div>
  );
};

export default CommunityContent;

'use client';

import { useState } from 'react';
import { CommentIcon } from '@/shared/assets/icons';
import HeartIcon from '@/shared/assets/icons/HeartIcon';
import { PersonIcon, SelectHeartIcon } from '@/shared/assets/svg';
import { formatIsoDate } from '@/shared/model/formatIsoDate';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';

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
  boardId: number;
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
}: CommunityContentProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCountState, setLikeCountState] = useState(likeCount);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCountState(liked ? likeCountState - 1 : likeCountState + 1);
    console.log(boardId);
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
          <SportTypeLabel type={stageCategory} />
          <p
            className={cn('text-body1e', 'text-gray-300', 'mobile:text-body2e')}
          >
            {stageName}
          </p>
          <div className={cn('flex', 'items-center', 'gap-8')}>
            <PersonIcon />
            <p
              className={cn(
                'text-body3s',
                'text-gray-300',
                'mobile:text-caption1s',
              )}
            >
              {authorName}
            </p>
          </div>
        </div>
        <div className={cn('flex', 'flex-col', 'gap-16')}>
          <h1 className={cn('text-body2e', 'text-white', 'mobile:text-body3e')}>
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
                'text-gray-300',
                'text-body3s',
                'mobile:text-caption1s',
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

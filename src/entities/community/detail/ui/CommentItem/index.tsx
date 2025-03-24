'use client';

import { useState } from 'react';
import { HeartIcon } from '@/shared/assets/icons';
import { PersonIcon, SelectHeartIcon } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';
import { usePostCommentLike } from '../../model/usePostCommentLike';

interface CommentItemProps {
  authorName: string;
  content: string;
  likeCount: number;
  commentId: number;
  isLiked: boolean;
}

const CommentItem = ({
  authorName,
  content,
  likeCount,
  commentId,
  isLiked,
}: CommentItemProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCountState, setLikeCountState] = useState(likeCount);

  const { mutate: commentLike } = usePostCommentLike(commentId);

  const handleLike = () => {
    commentLike();
    setLiked(!liked);
    setLikeCountState(liked ? likeCountState - 1 : likeCountState + 1);
    console.log(`Comment ID: ${commentId}, Liked: ${!liked}`);
  };

  return (
    <div
      className={cn(
        'flex',
        'bg-gray-700',
        'items-center',
        'w-full',
        'px-20',
        'py-16',
        'rounded-lg',
        'justify-between',
      )}
    >
      <div className={cn('flex', 'items-center', 'gap-8', 'whitespace-nowrap')}>
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

      <p
        className={cn(
          'text-body3s',
          'text-white',
          'flex-grow',
          'px-24',
          'mobile:text-caption1s',
        )}
      >
        {content}
      </p>
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
  );
};

export default CommentItem;

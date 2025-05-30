'use client';

import { useState } from 'react';
import { HeartIcon } from '@/shared/assets/icons';
import { PersonIcon, SelectHeartIcon } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';
import { usePostCommentLike } from '../../model/usePostCommentLike';

interface CommentItemProps {
  content: string;
  likeCount: number;
  commentId: number;
  isLiked: boolean;
  boardId: string;
}

const CommentItem = ({
  content,
  likeCount,
  commentId,
  isLiked,
  boardId,
}: CommentItemProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const { mutate: commentLike } = usePostCommentLike(commentId, boardId);

  const handleLike = () => {
    const nextLiked = !liked;
    const nextCount = nextLiked ? likeCountState + 1 : likeCountState - 1;

    setLiked(nextLiked);
    setLikeCountState(nextCount);

    commentLike(undefined, {
      onError: () => {
        setLiked((prev) => !prev);
        setLikeCountState((prev) => (nextLiked ? prev - 1 : prev + 1));
      },
    });
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
            'mobile:text-body3s',
            'text-gray-300',
            'text-caption1s',
          )}
        >
          익명
        </p>
      </div>
      <p
        className={cn(
          'mobile:text-body3s',
          'text-white',
          'px-24',
          'text-caption1s',
          'break-words',
          'whitespace-normal',
          'overflow-hidden',
          'w-full',
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

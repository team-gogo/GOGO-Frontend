'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CommentIcon, ViewsIcon } from '@/shared/assets/icons';
import HeartIcon from '@/shared/assets/icons/HeartIcon';
import { PersonIcon, SelectHeartIcon } from '@/shared/assets/svg';
import { formatIsoDate } from '@/shared/model/formatIsoDate';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';
import { usePostBoardLikeMutation } from '../../model/usePostBoardLikeMutation';

interface CommunityContentProps {
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  stageCategory: string;
  stageName: string;
  isLiked: boolean;
  boardId: string;
  stageId: string;
  currentPage: number;
  imageUrl?: string;
}

const CommunityContent = ({
  title,
  content,
  likeCount,
  commentCount,
  createdAt,
  stageCategory,
  stageName,
  isLiked,
  boardId,
  stageId,
  currentPage,
  imageUrl,
}: CommunityContentProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCountState, setLikeCountState] = useState(likeCount);

  const { mutate: boardLike } = usePostBoardLikeMutation(
    boardId,
    stageId,
    currentPage,
  );

  const handleLike = () => {
    const nextLiked = !liked;
    const nextCount = nextLiked ? likeCountState + 1 : likeCountState - 1;

    setLiked(nextLiked);
    setLikeCountState(nextCount);

    boardLike(undefined, {
      onError: () => {
        setLiked((prev) => !prev);
        setLikeCountState((prev) => (nextLiked ? prev - 1 : prev + 1));
      },
    });
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
        <div className={cn('flex', 'items-center', 'mobile:gap-24', 'gap-12')}>
          <SportTypeLabel isHaveBorder={true} type={stageCategory} />
          <p
            className={cn(
              'mobile:text-body1e',
              'text-gray-300',
              'text-body3e',
              'truncate',
              'whitespace-nowrap',
            )}
          >
            {stageName}
          </p>
          <div className={cn('flex', 'items-center', 'mobile:gap-8', 'gap-2')}>
            <PersonIcon />
            <p
              className={cn(
                'mobile:text-body3s',
                'text-gray-300',
                'text-caption1s',
                'whitespace-nowrap',
              )}
            >
              익명
            </p>
          </div>
        </div>
        <div className={cn('flex', 'flex-col', 'gap-16')}>
          <h1 className={cn('mobile:text-body2e', 'text-white', 'text-body3e')}>
            {title}
          </h1>
          <p
            className={cn(
              'text-body3s',
              'text-gray-300',
              'whitespace-pre-line',
            )}
          >
            {content}
          </p>
          {imageUrl && (
            <div className="mt-16 w-full">
              <div className="relative mx-auto w-full max-w-[400px] overflow-hidden rounded-lg">
                <Image
                  src={imageUrl}
                  alt={title}
                  layout="responsive"
                  width={300}
                  height={200}
                  className="object-contain"
                  onError={(e) => {
                    console.error(e);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={cn('flex', 'items-center', 'justify-between')}>
        <div className={cn('flex', 'items-center', 'gap-16')}>
          <div className={cn('flex', 'items-center', 'gap-8')}>
            <CommentIcon />
            <p className={cn('text-body3s', 'text-caption1s', 'text-gray-300')}>
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
          <div className={cn('flex', 'items-center', 'gap-8')}>
            <ViewsIcon />
            <p className={cn('text-body3s', 'text-caption1s', 'text-gray-300')}>
              0
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

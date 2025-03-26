'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { CommentInput, CommunityContent } from '@/entities/community/detail';
import { Comment } from '@/shared/types/community/detail';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { CommentContainer } from '@/widgets/community/detail';
import { useGetCommunityDetailQuery } from '../../model/useGetCommunityDetailQuery';

const CommunityDetailPage = () => {
  const params = useParams<{ boardId: string; stageId: string }>();
  const { boardId } = params;
  const { stageId } = params;
  const { data, isLoading, isError } = useGetCommunityDetailQuery(boardId);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (data?.comment) {
      setComments(data.comment);
    }
  }, [data]);

  const handleAddComment = (newComment: Comment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error: Unable to load community details.</div>;
  }

  return (
    <div
      className={cn(
        'w-full',
        'max-w-[82.5rem]',
        'flex',
        'flex-col',
        'space-y-[4.5rem]',
      )}
    >
      <BackPageButton type="push" path={`/community/${stageId}`} />
      <div className={cn('flex-1', 'space-y-[4.5rem]')}>
        <CommunityContent
          title={data.title}
          content={data.content}
          authorName={data.author.name}
          likeCount={data.likeCount}
          createdAt={data.createdAt}
          stageCategory={data.stage.category}
          stageName={data.stage.name}
          commentCount={comments.length}
          isLiked={data.isLiked}
          boardId={boardId}
          stageId={stageId}
        />
        <CommentContainer boardId={boardId} comments={comments} />
      </div>
      <CommentInput
        boardId={boardId}
        stageId={stageId}
        onAddComment={handleAddComment}
      />
    </div>
  );
};

export default CommunityDetailPage;

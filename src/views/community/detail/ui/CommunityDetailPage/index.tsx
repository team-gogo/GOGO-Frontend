'use client';

import { useParams } from 'next/navigation';
import { CommentInput, CommunityContent } from '@/entities/community/detail';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { CommentContainer } from '@/widgets/community/detail';
import { useGetCommunityDetailQuery } from '../../model/useGetCommunityDetailQuery';

const CommunityDetailPage = () => {
  const { boardId } = useParams();
  const safeBoardId = Array.isArray(boardId) ? boardId[0] : boardId || '';

  const { data, isLoading, isError } = useGetCommunityDetailQuery(safeBoardId);

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
      <BackPageButton type="push" path="/community" />
      <div className={cn('flex-1', 'space-y-[4.5rem]')}>
        <CommunityContent
          title={data.title}
          content={data.content}
          authorName={data.author.name}
          likeCount={data.likeCount}
          commentCount={data.commentCount}
          createdAt={data.createdAt}
          stageCategory={data.stage.category}
          stageName={data.stage.name}
          isLiked={data.isLiked}
          boardId={data.boardId}
        />
        <CommentContainer comments={data.comment} />
      </div>
      <CommentInput boardId={data.boardId} />
    </div>
  );
};

export default CommunityDetailPage;

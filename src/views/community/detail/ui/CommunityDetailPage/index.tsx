import { CommentInput, CommunityContent } from '@/entities/community/detail';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { CommentContainer } from '@/widgets/community/detail';
import { getCommunityDetail } from '../../Mock/getCommunityDetail';

const CommunityDetailPage = () => {
  const communityDetail = getCommunityDetail();

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
          title={communityDetail.title}
          content={communityDetail.content}
          authorName={communityDetail.author.name}
          likeCount={communityDetail.likeCount}
          commentCount={communityDetail.commentCount}
          createdAt={communityDetail.createdAt}
          stageCategory={communityDetail.stage.category}
          stageName={communityDetail.stage.name}
          isLiked={communityDetail.isLiked}
          boardId={communityDetail.boardId}
        />
        <CommentContainer comments={communityDetail.comment} />
      </div>
      <CommentInput boardId={communityDetail.boardId} />
    </div>
  );
};

export default CommunityDetailPage;

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
        'h-full',
        'max-w-[1320px]',
        'flex',
        'flex-col',
        'space-y-[72px]',
      )}
    >
      <BackPageButton />
      <div className={cn('flex-1', 'space-y-[72px]')}>
        <CommunityContent
          title={communityDetail.title}
          content={communityDetail.content}
          authorName={communityDetail.author.name}
          likeCount={communityDetail.likeCount}
          commentCount={communityDetail.commentCount}
          createdAt={communityDetail.createdAt}
          stageCategory={communityDetail.stage.category}
          stageName={communityDetail.stage.name}
        />
        <CommentContainer comments={communityDetail.comment} />
      </div>
      <CommentInput boardId={communityDetail.boardId} />
    </div>
  );
};

export default CommunityDetailPage;

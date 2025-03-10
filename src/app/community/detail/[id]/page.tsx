import {
  CommentInput,
  CommentItem,
  CommunityContent,
} from '@/entities/community/detail';

const page = () => {
  return (
    <div>
      <CommunityContent />
      <CommentItem />
      <CommentInput />
    </div>
  );
};

export default page;

import { SendIcon } from '@/shared/assets/svg';
import Input from '@/shared/ui/input';

const CommentInput = () => {
  return <Input placeholder="댓글을 입력해주세요" icon={<SendIcon />} />;
};

export default CommentInput;

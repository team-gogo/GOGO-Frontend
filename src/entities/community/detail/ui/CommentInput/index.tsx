'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { SendIcon } from '@/shared/assets/svg';
import { Comment } from '@/shared/types/community/detail';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';
import { usePostBoardCommentMutation } from '../../model/usePostBoardCommentMutation';

interface CommentFormData {
  content: string;
  boardId: string;
}

interface CommentInputProps {
  boardId: string;
  stageId: string;
  onAddComment: (newComment: Comment) => void;
  currentPage: number;
}

const CommentInput = ({
  boardId,
  stageId,
  onAddComment,
  currentPage,
}: CommentInputProps) => {
  const { register, handleSubmit, reset, watch } = useForm<CommentFormData>({
    defaultValues: {
      boardId,
    },
  });

  const { mutate: boardComment, isPending } = usePostBoardCommentMutation(
    boardId,
    stageId,
    currentPage,
  );

  const onSubmit: SubmitHandler<CommentFormData> = async (data) => {
    if (isPending) return;

    boardComment(data, {
      onSuccess: (newComment) => {
        onAddComment(newComment);
        reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('relative')}>
      <Input
        {...register('content', { required: true })}
        placeholder="댓글을 입력해주세요"
        maxLength={300}
        icon={<SendIcon />}
        value={watch('content') || ''}
      />
    </form>
  );
};

export default CommentInput;

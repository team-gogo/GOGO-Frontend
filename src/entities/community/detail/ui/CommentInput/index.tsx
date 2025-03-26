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
}

const CommentInput = ({
  boardId,
  stageId,
  onAddComment,
}: CommentInputProps) => {
  const { register, handleSubmit, reset } = useForm<CommentFormData>({
    defaultValues: {
      boardId,
    },
  });

  const { mutate: boardComment, isPending } = usePostBoardCommentMutation(
    boardId,
    stageId,
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
      <input type="hidden" {...register('boardId')} />
      <Input
        {...register('content', { required: true })}
        placeholder="댓글을 입력해주세요"
      />
      <button
        type="submit"
        className={cn('absolute', 'right-16', 'top-1/2', '-translate-y-1/2')}
      >
        <SendIcon />
      </button>
    </form>
  );
};

export default CommentInput;

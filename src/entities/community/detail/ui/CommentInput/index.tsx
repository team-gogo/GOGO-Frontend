'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { SendIcon } from '@/shared/assets/svg';
import Input from '@/shared/ui/input';

interface CommentFormData {
  comment: string;
  boardId: number;
}

const CommentInput = ({ boardId }: { boardId: number }) => {
  const { register, handleSubmit, reset } = useForm<CommentFormData>({
    defaultValues: {
      boardId,
    },
  });

  const onSubmit: SubmitHandler<CommentFormData> = async (data) => {
    console.log(data);

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register('boardId')} />
      <Input
        {...register('comment', { required: true })}
        placeholder="댓글을 입력해주세요"
        icon={<SendIcon />}
      />
    </form>
  );
};

export default CommentInput;

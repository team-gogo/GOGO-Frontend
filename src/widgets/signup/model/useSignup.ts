import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { FormattedSignupData } from '@/shared/types/signup';
import { postSignup } from '../api/postSignup';

export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: FormattedSignupData) => postSignup(data),
    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다.');
      router.push('/stage');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

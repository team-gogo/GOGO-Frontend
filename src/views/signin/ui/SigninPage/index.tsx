import { cn } from '@/shared/utils/cn';
import { SigninContainer } from '@/widgets/signin';

const SigninPage = () => {
  return (
    <div
      className={cn(
        'flex',
        'h-screen',
        'w-screen',
        'items-center',
        'justify-center',
      )}
    >
      <SigninContainer />
    </div>
  );
};

export default SigninPage;

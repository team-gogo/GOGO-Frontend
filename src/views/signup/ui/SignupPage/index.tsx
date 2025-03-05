import { cn } from '@/shared/utils/cn';
import { SignupContainer } from '@/widgets/signup';

const SignupPage = () => {
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
      <SignupContainer />
    </div>
  );
};

export default SignupPage;

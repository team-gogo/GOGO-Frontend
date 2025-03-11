import { cn } from '@/shared/utils/cn';
import { SignupContainer } from '@/widgets/signup';

const SignupPage = () => {
  return (
    <div
      className={cn(
        'flex',
        'h-full',
        'w-full',
        'items-center',
        'justify-center',
        'px-16',
      )}
    >
      <SignupContainer />
    </div>
  );
};

export default SignupPage;

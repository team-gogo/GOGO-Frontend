import { GoogleButton } from '@/entities/signin';
import GOGOIcon from '@/shared/ui/GOGOIcon';
import { cn } from '@/shared/utils/cn';

const SigninContainer = () => {
  return (
    <div className={cn('w-full', 'max-w-[648px]', 'space-y-[100px]')}>
      <div className={cn('flex', 'justify-center')}>
        <GOGOIcon className="h-auto w-[572px]" />
      </div>
      <GoogleButton />
    </div>
  );
};

export default SigninContainer;

import { GoogleButton } from '@/entities/signin';
import GOGOIcon from '@/shared/ui/GOGOIcon';
import { cn } from '@/shared/utils/cn';

const SigninContainer = () => {
  return (
    <div className={cn('w-full', 'max-w-[648px]', 'space-y-[100px]')}>
      <div className={cn('space-y-20')}>
        <div className={cn('flex', 'justify-center')}>
          <GOGOIcon className="h-auto w-[572px]" />
        </div>
        <p className={cn('text-body2s', 'text-main-500', 'text-center')}>
          for GSM
        </p>
      </div>
      <GoogleButton />
    </div>
  );
};

export default SigninContainer;

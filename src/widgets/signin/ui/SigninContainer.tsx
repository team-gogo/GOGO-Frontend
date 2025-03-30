import { GoogleButton } from '@/entities/signin';
import GOGOIcon from '@/shared/ui/GOGOIcon';
import { cn } from '@/shared/utils/cn';

const SigninContainer = () => {
  return (
    <div className={cn('w-full', 'max-w-[648px]', 'space-y-[100px]')}>
      <div className={cn('flex', 'justify-center')}>
        <GOGOIcon
          GWidth="8.12106rem"
          GHeight="8.3795rem"
          OWidth="8.695rem"
          OHeight="8.56438rem"
        />
      </div>
      <GoogleButton />
    </div>
  );
};

export default SigninContainer;

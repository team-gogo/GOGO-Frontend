import { GoogleLogo } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

const GoogleButton = () => {
  return (
    <a
      href={`${process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URL}`}
      className={cn(
        'flex',
        'w-full',
        'items-center',
        'justify-between',
        'rounded-lg',
        'bg-white',
        'p-16',
      )}
    >
      <GoogleLogo />
      <span
        className={cn('text-body2s', 'flex-grow', 'text-center', 'text-black')}
      >
        Google 계정으로 시작하기
      </span>
    </a>
  );
};

export default GoogleButton;

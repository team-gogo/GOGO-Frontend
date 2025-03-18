import { cn } from '@/shared/utils/cn';
import OfficialCreatePage from '@/views/stage/create/official/ui/OfficialCreatePage';

const page = () => {
  return (
    <div
      className={cn(
        'flex',
        'min-h-screen',
        'w-full',
        'items-center',
        'justify-center',
        'px-16',
        'py-[5rem]',
        'mobile:py-[2.5rem]',
      )}
    >
      <OfficialCreatePage />
    </div>
  );
};

export default page;

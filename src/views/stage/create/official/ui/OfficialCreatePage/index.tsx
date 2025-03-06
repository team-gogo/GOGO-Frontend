import { cn } from '@/shared/utils/cn';
import OfficialCreateContainer from '@/widgets/stage/create/official/ui/OfficialCreateContainer';

const OfficialCreatePage = () => {
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
      <OfficialCreateContainer />
    </div>
  );
};

export default OfficialCreatePage;

import FastCreateContainer from '@/widgets/stage/create/fast/ui/FastCreateContainer';
import { cn } from '@/shared/utils/cn';

const FastCreatePage = () => {
  return (
    <div
      className={cn(
        'flex',
        'h-screen',
        'w-screen',
        'justify-center',
        'overflow-y-scroll',
      )}
    >
      <FastCreateContainer />
    </div>
  );
};

export default FastCreatePage;

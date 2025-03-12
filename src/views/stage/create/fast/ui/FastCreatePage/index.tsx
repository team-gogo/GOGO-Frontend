import { cn } from '@/shared/utils/cn';
import FastCreateContainer from '@/widgets/stage/create/fast/ui/FastCreateContainer';

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

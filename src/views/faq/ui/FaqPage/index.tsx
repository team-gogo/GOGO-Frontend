import { cn } from '@/shared/utils/cn';
import { FaqContainer } from '@/widgets/faq';

const FaqPage = () => {
  return (
    <div className={cn('flex', 'w-full', 'justify-center', 'pb-16', 'px-16')}>
      <FaqContainer />
    </div>
  );
};

export default FaqPage;

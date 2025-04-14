import InspectionModal from '@/shared/ui/InspectionModal';
import { FaqPage } from '@/views/faq';

const page = () => {
  return (
    <>
      <FaqPage />
      <InspectionModal service="GOGO" onClose={() => {}} />
    </>
  );
};

export default page;

import InspectionModal from '@/shared/ui/InspectionModal';
import { MiniGamePage } from '@/views/mini-game';

const page = () => {
  return (
    <>
      <MiniGamePage />
      <InspectionModal service="GOGO" onClose={() => {}} />
    </>
  );
};

export default page;

import InspectionModal from '@/shared/ui/InspectionModal';
import { CommunityPage } from '@/views/community';

const page = () => {
  return (
    <>
      <CommunityPage />
      <InspectionModal service="GOGO" onClose={() => {}} />
    </>
  );
};

export default page;

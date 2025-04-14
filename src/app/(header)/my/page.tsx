import InspectionModal from '@/shared/ui/InspectionModal';
import { MyPage } from '@/views/my';

const page = () => {
  return (
    <>
      <MyPage />
      <InspectionModal service="GOGO" onClose={() => {}} />
    </>
  );
};

export default page;

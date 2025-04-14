import { Suspense } from 'react';
import InspectionModal from '@/shared/ui/InspectionModal';
import { MyBetPage } from '@/views/my';
const page = () => {
  return (
    <Suspense>
      <MyBetPage />
      <InspectionModal service="GOGO" onClose={() => {}} />
    </Suspense>
  );
};

export default page;

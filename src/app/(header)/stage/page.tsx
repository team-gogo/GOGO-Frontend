'use client';

import InspectionModal from '@/shared/ui/InspectionModal';
import StagePage from '@/views/stage/ui/StagePage';

const page = () => {
  return (
    <>
      <StagePage />
      <InspectionModal service="GOGO" onClose={() => {}} />
    </>
  );
};

export default page;

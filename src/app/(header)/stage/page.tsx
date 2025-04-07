'use client';

import useInspectionModalStore from '@/shared/stores/useInspectionModalStore';
import InspectionModal from '@/shared/ui/InspectionModal';
import StagePage from '@/views/stage/ui/StagePage';

const page = () => {
  const { isInspectionModalOpen, setIsInspectionModalOpen } =
    useInspectionModalStore();
  return (
    <>
      <StagePage />
      {isInspectionModalOpen && (
        <InspectionModal onClose={() => setIsInspectionModalOpen(false)} />
      )}
    </>
  );
};

export default page;

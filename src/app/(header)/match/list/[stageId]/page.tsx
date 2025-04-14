import { Suspense } from 'react';
import InspectionModal from '@/shared/ui/InspectionModal';
import { MatchPage } from '@/views/match';

const page = () => {
  return (
    <Suspense>
      <MatchPage />
      <InspectionModal service="GOGO" onClose={() => {}} />
    </Suspense>
  );
};

export default page;

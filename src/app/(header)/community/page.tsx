import { Suspense } from 'react';
import { CommunityPage } from '@/views/community';

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CommunityPage />
    </Suspense>
  );
};

export default page;

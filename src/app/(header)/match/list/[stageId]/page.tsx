import { Suspense } from 'react';
import { MatchPage } from '@/views/match';

const page = () => {
  return (
    <Suspense>
      <MatchPage />
    </Suspense>
  );
};

export default page;

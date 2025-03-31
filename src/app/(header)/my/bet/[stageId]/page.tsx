import { Suspense } from 'react';
import { MyBetPage } from '@/views/my';

const page = () => {
  return (
    <Suspense>
      <MyBetPage />
    </Suspense>
  );
};

export default page;

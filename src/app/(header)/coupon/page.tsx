import { Suspense } from 'react';
import { CouponPage } from '@/views/coupon';

const page = () => {
  return (
    <Suspense>
      <CouponPage />
    </Suspense>
  );
};

export default page;

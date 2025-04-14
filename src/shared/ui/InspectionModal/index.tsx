'use client';

import SpannerIcon from '@/shared/assets/icons/SpannerIcon';
import ModalLayout from '@/shared/ui/modalLayout';
import { cn } from '@/shared/utils/cn';
import GOGOIcon from '../GOGOIcon';

interface InspectionModalProps {
  service?: string;
}

const InspectionModal = ({ service = '' }: InspectionModalProps) => {
  return (
    <ModalLayout
      title=""
      showHeader={false}
      containerClassName={cn(
        'rounded-lg',
        'bg-gray-700',
        'max-w-[45rem]',
        'w-full',
        'px-[5rem]',
        'py-[2.5rem]',
      )}
    >
      <GOGOIcon
        GWidth={24}
        GHeight={26}
        OWidth={28}
        OHeight={27}
        className="m-28 p-20"
      />

      <div
        className={cn(
          'm-20 flex flex-row items-center justify-center gap-16 align-middle',
        )}
      >
        <SpannerIcon />
        <h1 className={cn('whitespace-nowrap text-3xl font-bold text-white')}>
          현재 <span className="font-bold text-main-600">{service}</span> 서비스
          점검 중입니다
        </h1>
      </div>

      <div className={cn('flex flex-col items-center p-20')}>
        <p className={cn('text-gray-400')}>
          서비스 이용에 불편을 드려 죄송합니다.
        </p>
        <p className={cn('text-gray-400')}>잠시 후 다시 이용해주세요.</p>
      </div>
    </ModalLayout>
  );
};

export default InspectionModal;

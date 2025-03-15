'use client';

import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { usePlinkoForm } from '@/views/mini-game/model/usePlinkoForm';
import { PlinkoInputBox } from '@/widgets/mini-game';

const PlinkoPage = () => {
  const {
    register,
    handleSubmit,
    isDisabled,
    onSubmit,
    onError,
    setValue,
    selectedRisk,
    setSelectedRisk,
  } = usePlinkoForm();

  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'items-center',
        'justify-center',
        'px-[5rem]',
        'py-[5rem]',
      )}
    >
      <div
        className={cn(
          'w-full',
          'max-w-[82.5rem]',
          'flex',
          'flex-col',
          'gap-[5.3125rem]',
        )}
      >
        <BackPageButton type="push" path="/mini-game" label="플린코" />
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className={cn('flex', 'gap-[2.5rem]', 'flex-col')}
        >
          <PlinkoInputBox
            money={2000}
            ticket={2}
            isDisabled={isDisabled}
            register={register}
            setValue={setValue}
            selectedRisk={selectedRisk}
            setSelectedRisk={setSelectedRisk}
          />
        </form>
      </div>
    </div>
  );
};

export default PlinkoPage;

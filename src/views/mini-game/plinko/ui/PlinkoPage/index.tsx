'use client';

import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { usePlinkoForm } from '@/views/mini-game/model/usePlinkoForm';
import { PlinkoInputBox, PlinkoTest } from '@/widgets/mini-game';

const PlinkoPage = () => {
  const {
    register,
    handleSubmit,
    isDisabled,
    watch,
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
        'py-[5rem]',
      )}
    >
      <div
        className={cn(
          'w-full',
          'max-w-[82.5rem]',
          'px-[1rem]',
          'flex',
          'flex-col',
          'gap-[3rem]',
        )}
      >
        <BackPageButton type="push" path="/mini-game" label="플린코" />
        <div className={cn('w-full', 'flex', 'gap-[2.25rem]')}>
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

          {/* <PlinkoGame watch={watch} /> */}
          <PlinkoTest />
        </div>
      </div>
    </div>
  );
};

export default PlinkoPage;

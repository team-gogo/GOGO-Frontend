'use client';

import { useState } from 'react';
import { PlinkoResponse } from '@/shared/types/mini-game';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { usePlinkoForm } from '@/views/mini-game/model/usePlinkoForm';
import { PlinkoGame, PlinkoInputBox } from '@/widgets/mini-game';
import getPlinkoMock0 from '../Mock/getPlinkoMock0';
import getPlinkoMock1 from '../Mock/getPlinkoMock1';
import getPlinkoMock10 from '../Mock/getPlinkoMock10';
import getPlinkoMock11 from '../Mock/getPlinkoMock11';
import getPlinkoMock12 from '../Mock/getPlinkoMock12';
import getPlinkoMock13 from '../Mock/getPlinkoMock13';
import getPlinkoMock14 from '../Mock/getPlinkoMock14';
import getPlinkoMock15 from '../Mock/getPlinkoMock15';
import getPlinkoMock2 from '../Mock/getPlinkoMock2';
import getPlinkoMock3 from '../Mock/getPlinkoMock3';
import getPlinkoMock4 from '../Mock/getPlinkoMock4';
import getPlinkoMock5 from '../Mock/getPlinkoMock5';
import getPlinkoMock6 from '../Mock/getPlinkoMock6';
import getPlinkoMock7 from '../Mock/getPlinkoMock7';
import getPlinkoMock8 from '../Mock/getPlinkoMock8';
import getPlinkoMock9 from '../Mock/getPlinkoMock9';

const PlinkoPage = () => {
  const [plinkoMock, setPlinkoMock] = useState<PlinkoResponse | null>(null);
  const [gameRunningCount, setGameRunningCount] = useState<number>(0);

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

  const getPlinkoMockData0 = getPlinkoMock0();
  const getPlinkoMockData1 = getPlinkoMock1();
  const getPlinkoMockData2 = getPlinkoMock2();
  const getPlinkoMockData3 = getPlinkoMock3();
  const getPlinkoMockData4 = getPlinkoMock4();
  const getPlinkoMockData5 = getPlinkoMock5();
  const getPlinkoMockData6 = getPlinkoMock6();
  const getPlinkoMockData7 = getPlinkoMock7();
  const getPlinkoMockData8 = getPlinkoMock8();
  const getPlinkoMockData9 = getPlinkoMock9();
  const getPlinkoMockData10 = getPlinkoMock10();
  const getPlinkoMockData11 = getPlinkoMock11();
  const getPlinkoMockData12 = getPlinkoMock12();
  const getPlinkoMockData13 = getPlinkoMock13();
  const getPlinkoMockData14 = getPlinkoMock14();
  const getPlinkoMockData15 = getPlinkoMock15();

  const onClickSubmitBtn = () => {
    const mockDataArray = [
      getPlinkoMockData0,
      getPlinkoMockData1,
      getPlinkoMockData2,
      getPlinkoMockData3,
      getPlinkoMockData4,
      getPlinkoMockData5,
      getPlinkoMockData6,
      getPlinkoMockData7,
      getPlinkoMockData8,
      getPlinkoMockData9,
      getPlinkoMockData10,
      getPlinkoMockData11,
      getPlinkoMockData12,
      getPlinkoMockData13,
      getPlinkoMockData14,
      getPlinkoMockData15,
    ];
    const randomIndex = Math.floor(Math.random() * mockDataArray.length);

    setPlinkoMock(mockDataArray[randomIndex]);
  };

  const storedTicketCount = sessionStorage.getItem('ticketCount');
  const ticketCount = storedTicketCount ? JSON.parse(storedTicketCount) : null;

  const storeMyPoint = sessionStorage.getItem('myPoint');
  const myPoint = storeMyPoint ? JSON.parse(storeMyPoint) : null;

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
        <BackPageButton label="플린코" />
        <div className={cn('w-full', 'flex', 'justify-between')}>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className={cn('flex', 'gap-[2.5rem]', 'flex-col')}
          >
            <PlinkoInputBox
              money={myPoint.point}
              ticket={ticketCount.plinko}
              isDisabled={isDisabled}
              register={register}
              setValue={setValue}
              selectedRisk={selectedRisk}
              setSelectedRisk={setSelectedRisk}
              onClick={onClickSubmitBtn}
              gameRunningCount={gameRunningCount}
            />
          </form>

          <PlinkoGame
            watch={watch}
            plinkoData={plinkoMock}
            setGameRunningCount={setGameRunningCount}
          />
        </div>
      </div>
    </div>
  );
};

export default PlinkoPage;

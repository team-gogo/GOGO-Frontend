'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PlinkoFormType, PlinkoResponse } from '@/shared/types/mini-game';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { formatPlinkoData } from '@/views/mini-game/model/formatPlinkoData';
import { useGetMyPointQuery } from '@/views/mini-game/model/useGetMyPointQuery';
import { useGetMyTicketQuery } from '@/views/mini-game/model/useGetMyTicketQuery';
import { usePlinkoForm } from '@/views/mini-game/model/usePlinkoForm';
import { usePostPlinkoGame } from '@/views/mini-game/model/usePostPlinkoGame';
import { PlinkoGame, PlinkoInputBox } from '@/widgets/mini-game';

const PlinkoPage = () => {
  const [plinkoData, setPlinkoData] = useState<PlinkoResponse | null>(null);
  const [gameRunningCount, setGameRunningCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [point, setPoint] = useState<number>(0);
  const [ticket, setTicket] = useState<number>(0);

  const pathname = usePathname();

  const match = pathname.match(/\/mini-game\/([^/]+)\/plinko/);
  const stageId = match ? match[1] : null;

  const { data: myPoint } = useGetMyPointQuery(String(stageId));
  const { data: myTicket } = useGetMyTicketQuery(String(stageId));

  useEffect(() => {
    if (myPoint) {
      setPoint(myPoint?.point);
    }

    if (myTicket) {
      setTicket(myTicket.plinko);
    }
  }, [myPoint, myTicket]);

  const {
    register,
    handleSubmit,
    watch,
    onError,
    setValue,
    selectedRisk,
    setSelectedRisk,
  } = usePlinkoForm();

  const amount = watch('amount');
  const risk = watch('risk');

  const isDisabled = !amount || !risk || ticket === 0 || amount > point;

  const { mutate: PostPlinko } = usePostPlinkoGame(Number(stageId));

  const onSubmit = (data: PlinkoFormType) => {
    if (isLoading) return;

    setIsLoading(true);
    const formattedData = formatPlinkoData(data, selectedRisk);

    const updatedPoint = point - amount;
    setPoint(updatedPoint);
    setTicket((prev) => Math.max(0, prev - 1));

    PostPlinko(formattedData, {
      onSuccess: (response: PlinkoResponse) => {
        setPlinkoData(response);
        setIsLoading(false);
      },
      onError: () => {
        console.error('게임 요청 실패');
        setIsLoading(false);
      },
    });
  };

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
              money={point}
              ticket={ticket}
              isDisabled={isDisabled}
              register={register}
              setValue={setValue}
              selectedRisk={selectedRisk}
              setSelectedRisk={setSelectedRisk}
              gameRunningCount={gameRunningCount}
            />
          </form>

          <PlinkoGame
            watch={watch}
            plinkoData={plinkoData}
            setGameRunningCount={setGameRunningCount}
            setPoint={setPoint}
          />
        </div>
      </div>
    </div>
  );
};

export default PlinkoPage;

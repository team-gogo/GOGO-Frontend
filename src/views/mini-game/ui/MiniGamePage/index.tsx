'use client';

import { useParams, useRouter } from 'next/navigation';
import { GameInfo, StoreInfo } from '@/entities/mini-game';
import { StoreIcon } from '@/shared/assets/icons';
import { MiniGameIcon } from '@/shared/assets/svg';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { GameCardContainer, InfoContainer } from '@/widgets/mini-game';
import { createMiniGameItems } from '../../model/gameData';
import { createStoreItems } from '../../model/storeData';
import { useGetActiveGameQuery } from '../../model/useGetActiveGameQuery';
import { useGetMyPointQuery } from '../../model/useGetMyPointQuery';
import { useGetMyTicketQuery } from '../../model/useGetMyTicketQuery';
import { useGetShopTicketStatusQuery } from '../../model/useGetShopTicketStatusQuery';
import { usePostBuyTicketMutation } from '../../model/usePostBuyTicketMutation';

const MiniGamePage = () => {
  const router = useRouter();
  const params = useParams<{ stageId: string }>();
  const { stageId } = params;

  const { data: activeGameList, isLoading: activeGameIsLoading } =
    useGetActiveGameQuery(stageId);
  const { data: ticketCount } = useGetMyTicketQuery(stageId);
  const { data: shopTicketStatus } = useGetShopTicketStatusQuery(stageId);
  const { data: myPoint, isLoading: myPointIsLoading } =
    useGetMyPointQuery(stageId);

  const { buyTicket, isPending } = usePostBuyTicketMutation(
    shopTicketStatus?.shopId ? shopTicketStatus.shopId.toString() : '',
    stageId,
  );

  const storeItems = createStoreItems(buyTicket, isPending);

  const miniGames = createMiniGameItems(router, stageId);

  if (activeGameIsLoading || !activeGameList || myPointIsLoading || !myPoint) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'flex-col',
        'items-center',
        'justify-center',
        'py-[2rem]',
        'px-[1rem]',
      )}
    >
      <div
        className={cn(
          'flex',
          'flex-col',
          'w-full',
          'max-w-[82.5rem]',
          'gap-[2.25rem]',
        )}
      >
        <BackPageButton />
        <div className={cn('flex', 'gap-[5rem]', 'flex-col')}>
          <div>
            <InfoContainer
              icon={
                <MiniGameIcon
                  color="#fff"
                  className="h-[1.5rem] w-[1.5rem] mobile:h-[2.25rem] mobile:w-[2.25rem]"
                />
              }
              title="미니게임"
              rightContent={<GameInfo getTicketCount={ticketCount} />}
            />
            <GameCardContainer
              items={miniGames}
              activeGameList={activeGameList}
              getTicketCount={ticketCount}
            />
          </div>
          <div>
            <InfoContainer
              icon={
                <StoreIcon className="h-[1.5rem] w-[1.5rem] mobile:h-[2.25rem] mobile:w-[2.25rem]" />
              }
              title="상점"
              rightContent={<StoreInfo myPoint={myPoint.point} />}
            />
            <GameCardContainer
              items={storeItems}
              activeGameList={activeGameList}
              getShopTicket={shopTicketStatus}
              myPoint={myPoint.point}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniGamePage;

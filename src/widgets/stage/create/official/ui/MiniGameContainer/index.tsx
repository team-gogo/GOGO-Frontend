import { SelectStageType } from '@/entities/stage/create/official';
import { TicketIcon } from '@/shared/assets/icons';
import { PointIcon } from '@/shared/assets/svg';
import { preventInvalidInputNumber } from '@/shared/model/preventInvalidInputNumber';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

const MiniGameContainer = () => {
  return (
    <div className={cn('space-y-16')}>
      <p className={cn('text-body2e', 'text-white')}>미니게임</p>
      <div className={cn('flex', 'items-center', 'gap-24', 'tablet:flex-wrap')}>
        <div className={cn('space-y-16', 'w-full')}>
          <SelectStageType />
          <div className={cn('flex', 'gap-16')}>
            <Input
              placeholder="최대 배팅 포인트"
              icon={<PointIcon fill="#898989" />}
              type="number"
              onInput={preventInvalidInputNumber}
            />
            <Input
              placeholder="최소 배팅 포인트"
              icon={<PointIcon fill="#898989" />}
              type="number"
              onInput={preventInvalidInputNumber}
            />
          </div>
          <Input
            placeholder="초기 보유 티켓"
            icon={<TicketIcon size={24} color="#898989" />}
            type="number"
            onInput={preventInvalidInputNumber}
          />
        </div>
        <div className={cn('space-y-16', 'w-full')}>
          <SelectStageType />
          <div className={cn('flex', 'gap-16')}>
            <Input
              placeholder="최대 배팅 포인트"
              icon={<PointIcon fill="#898989" />}
              type="number"
              onInput={preventInvalidInputNumber}
            />
            <Input
              placeholder="최소 배팅 포인트"
              icon={<PointIcon fill="#898989" />}
              type="number"
              onInput={preventInvalidInputNumber}
            />
          </div>
          <Input
            placeholder="초기 보유 티켓"
            icon={<TicketIcon size={24} color="#898989" />}
            type="number"
            onInput={preventInvalidInputNumber}
          />
        </div>
        <div className={cn('space-y-16', 'w-full')}>
          <SelectStageType />
          <div className={cn('flex', 'gap-16')}>
            <Input
              placeholder="최대 배팅 포인트"
              icon={<PointIcon fill="#898989" />}
              type="number"
              onInput={preventInvalidInputNumber}
            />
            <Input
              placeholder="최소 배팅 포인트"
              icon={<PointIcon fill="#898989" />}
              type="number"
              onInput={preventInvalidInputNumber}
            />
          </div>
          <Input
            placeholder="초기 보유 티켓"
            icon={<TicketIcon size={24} color="#898989" />}
            type="number"
            onInput={preventInvalidInputNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default MiniGameContainer;

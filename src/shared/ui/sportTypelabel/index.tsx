import {
  BadmintonIcon,
  BaseballIcon,
  BasketballIcon,
  EtcIcon,
  LoLIcon,
  SoccerIcon,
  VolleyballIcon,
} from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

const SPORT_TYPES: Record<string, { icon: JSX.Element | null; text: string }> =
  {
    soccer: { icon: <SoccerIcon />, text: '축구' },
    baseball: { icon: <BaseballIcon />, text: '야구' },
    basketball: { icon: <BasketballIcon />, text: '농구' },
    volleyball: { icon: <VolleyballIcon />, text: '배구' },
    lol: { icon: <LoLIcon />, text: '리그 오브 레전드' },
    badminton: { icon: <BadmintonIcon />, text: '배드민턴' },
    etc: { icon: <EtcIcon />, text: '기타(직접입력)' },
  };

const SportTypeLabel = ({ type }: { type: string }) => {
  const { icon, text } = SPORT_TYPES[type] || { icon: null, text: '기타' };

  return (
    <div
      className={cn(
        'py-8',
        'px-12',
        'rounded-lg',
        'border-1',
        'border-solid',
        'border-main-500',
        'w-fit',
        'flex',
        'gap-8',
        'text-nowrap',
      )}
    >
      {icon && <label>{icon}</label>}
      <p className={cn('text-body3s', 'text-main-500')}>{text}</p>
    </div>
  );
};

export default SportTypeLabel;

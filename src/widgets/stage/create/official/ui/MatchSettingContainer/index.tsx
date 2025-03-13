import { SportType } from '@/shared/model/sportTypes';
import Input from '@/shared/ui/input';
import SelectOption from '@/shared/ui/SelectOption';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';

const MatchSettingContainer = () => {
  const categoryTypes: SportType[] = [
    'VOLLEY_BALL',
    'SOCCER',
    'LOL',
    'BASE_BALL',
    'BASKET_BALL',
    'BADMINTON',
    'ETC',
  ];

  const matchTypeOptions = [
    { value: 'friendly', label: '친선전' },
    { value: 'league', label: '리그전' },
    { value: 'tournament', label: '토너먼트' },
  ];

  return (
    <div className={cn('space-y-16')}>
      <p className={cn('text-white', 'text-body2e')}>경기</p>
      <div className={cn('flex', 'gap-16', 'flex-wrap')}>
        {categoryTypes.map((sport) => (
          <SportTypeLabel key={sport} type={sport} asButton />
        ))}
      </div>
      <div className={cn('flex', 'gap-24', 'w-full')}>
        <div className={cn('flex-grow', 'basis-1/2')}>
          <Input placeholder="경기 이름을 입력해주세요." />
        </div>
        <div className={cn('flex-grow', 'basis-1/6')}>
          <SelectOption options={matchTypeOptions} initialLabel="경기 방식" />
        </div>
        <div className={cn('flex-grow', 'basis-1/6')}>
          <Input placeholder="최소 경기 인원" />
        </div>
        <div className={cn('flex-grow', 'basis-1/6')}>
          <Input placeholder="최대 경기 인원" />
        </div>
      </div>
    </div>
  );
};

export default MatchSettingContainer;

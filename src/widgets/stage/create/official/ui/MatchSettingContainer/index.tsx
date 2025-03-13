import { AddButton } from '@/entities/stage/create/official';
import { PersonIcon } from '@/shared/assets/svg';
import { preventInvalidInputNumber } from '@/shared/model/preventInvalidInputNumber';
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
      <div className={cn('flex', 'justify-between')}>
        <p className={cn('text-white', 'text-body2e')}>경기</p>
        <div className={cn('flex', 'gap-12')}>
          <p className={cn('text-gray-500', 'text-body2s')}>총 경기</p>
          <p className={cn('text-white', 'text-body2s')}>3</p>
        </div>
      </div>
      <div className={cn('flex', 'justify-between')}>
        <div className={cn('flex', 'gap-16', 'flex-wrap')}>
          {categoryTypes.map((sport) => (
            <SportTypeLabel key={sport} type={sport} asButton />
          ))}
        </div>
        <AddButton />
      </div>
      <div
        className={cn(
          'flex',
          'gap-24',
          'w-full',
          'tablet:flex-wrap',
          'tablet:space-y-16',
        )}
      >
        <div className={cn('flex', 'gap-24', 'w-4/6', 'tablet:w-full')}>
          <div className={cn('w-2/3', 'tablet:w-full')}>
            <Input placeholder="이름을 입력해주세요." maxLength={10} />
          </div>
          <div className={cn('w-1/3', 'tablet:w-full')}>
            <SelectOption options={matchTypeOptions} initialLabel="경기 방식" />
          </div>
        </div>
        <div className={cn('flex', 'gap-24', 'w-2/6', 'tablet:w-full')}>
          <div className={cn('w-1/2')}>
            <Input
              placeholder="최소 경기 인원"
              icon={<PersonIcon fill="#898989" />}
              type="number"
              onInput={preventInvalidInputNumber}
            />
          </div>
          <div className={cn('w-1/2')}>
            <Input
              placeholder="최대 경기 인원"
              icon={<PersonIcon fill="#898989" />}
              type="number"
              onInput={preventInvalidInputNumber}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchSettingContainer;

import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';
import {
  EntryNumberInput,
  InviteStudentInput,
  MatchSettingContainer,
  MiniGameContainer,
  RuleInputContainer,
  StageInputContainer,
  StoreContainer,
} from '@/widgets/stage/create/official';

const OfficialCreatePage = () => {
  return (
    <div className={cn('w-full', 'max-w-[1320px]', 'space-y-[3rem]')}>
      <BackPageButton type="back" label="스테이지 생성 (학교 공식 행사)" />
      <StageInputContainer />
      <MatchSettingContainer />
      <RuleInputContainer />
      <MiniGameContainer />
      <StoreContainer />
      <div className={cn('flex', 'w-full', 'gap-24', 'tablet:flex-wrap')}>
        <div className="w-full">
          <EntryNumberInput />
        </div>
        <div className="w-full">
          <InviteStudentInput />
        </div>
      </div>
      <Button>확인</Button>
    </div>
  );
};

export default OfficialCreatePage;

import MatchItem from '@/entities/stage/time/ui/MatchItem';
import { MatchData } from '@/shared/types/match';

interface MatchSectionProps {
  title: string;
  matchList: MatchData[];
  finalStage: number;
  teamIds: { [key: string]: number };
  onMatchSelect: (round: string, index: number) => void;
  isMatchSelected: (round: string, index: number) => boolean;
  isMatchTimeSet: (round: string, index: number) => boolean;
}

const MatchSection = ({
  title,
  matchList,
  finalStage,
  teamIds,
  onMatchSelect,
  isMatchSelected,
  isMatchTimeSet,
}: MatchSectionProps) => (
  <div className="flex flex-col gap-4 rounded-lg border border-gray-500 bg-gray-700 p-4 phone:w-[90vw] mobile:w-[90vw] pad:w-[400px] laptop:w-[400px]">
    <h2 className="text-center text-white phone:text-body1s pad:text-h4s">
      {title}
    </h2>
    <div className="flex flex-col items-center gap-4">
      {matchList.length > 0 ? (
        matchList
          .filter(
            (match) =>
              !(
                (finalStage === 8 &&
                  match.round === '8강' &&
                  match.teamBName === 'TBD' &&
                  match.teamAName === 'TBD') ||
                (finalStage === 4 &&
                  match.round === '4강' &&
                  match.teamBName === 'TBD' &&
                  match.teamAName === 'TBD')
              ),
          )
          .map((match) => (
            <div
              key={`${match.round}-${match.index}`}
              className="relative flex w-full justify-center"
            >
              <MatchItem
                index={match.index}
                teamAName={match.teamAName}
                teamBName={match.teamBName}
                teamAId={teamIds[match.teamAName]}
                teamBId={teamIds[match.teamBName]}
                selected={isMatchSelected(match.round, match.index)}
                solved={!isMatchTimeSet(match.round, match.index)}
                onClick={() => onMatchSelect(match.round, match.index)}
              />
            </div>
          ))
      ) : (
        <div className="text-center text-gray-400">경기 없음</div>
      )}
    </div>
  </div>
);

export default MatchSection;

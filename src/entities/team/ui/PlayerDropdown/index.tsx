import { cn } from '@/shared/utils/cn';

interface PlayerDropdownProps {
  selectedPlayer: string;
  isOpen: boolean;
  membersList: string[];
  onToggle: () => void;
  onSelect: (player: string) => void;
  selectedPlayers: string[];
}

const PlayerDropdown = ({
  selectedPlayer,
  isOpen,
  membersList,
  onToggle,
  onSelect,
  selectedPlayers,
}: PlayerDropdownProps) => {
  const availablePlayers = membersList.filter(
    (member) => !selectedPlayers.includes(member),
  );

  return (
    <div className="relative">
      <div
        onClick={() => availablePlayers.length > 0 && onToggle()}
        className={cn(
          'flex',
          'items-center',
          'justify-between',
          'w-[200px]',
          'px-16',
          'py-16',
          'rounded-md',
          'bg-[#2a2a2a]',
          'cursor-pointer',
          'text-white',
          availablePlayers.length === 0 && 'cursor-not-allowed opacity-50',
        )}
      >
        <span>{selectedPlayer || '인원 선택'}</span>
        {availablePlayers.length > 0 && (
          <span className={cn(isOpen ? 'rotate-180' : '')}>▼</span>
        )}
      </div>
      {isOpen && (
        <div
          className={cn(
            'absolute',
            'w-full',
            'mt-8',
            'py-16',
            'bg-[#2a2a2a]',
            'rounded-md',
            'z-10',
          )}
        >
          {availablePlayers.map((member, index) => (
            <div
              key={index}
              onClick={() => onSelect(member)}
              className={cn(
                'px-16',
                'py-8',
                'cursor-pointer',
                'hover:bg-[#3a3a3a]',
                'text-white',
              )}
            >
              {member}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerDropdown;

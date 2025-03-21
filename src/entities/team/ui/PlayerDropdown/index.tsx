interface PlayerDropdownProps {
  selectedPlayer: string;
  isOpen: boolean;
  membersList: string[];
  onToggle: () => void;
  onSelect: (player: string) => void;
}

const PlayerDropdown = ({
  selectedPlayer,
  isOpen,
  membersList,
  onToggle,
  onSelect,
}: PlayerDropdownProps) => {
  return (
    <div className="relative mr-2 flex-1 py-8">
      <div
        onClick={onToggle}
        className="flex cursor-pointer items-center justify-between rounded-md bg-[#2a2a2a] p-18 text-body3s"
      >
        <span>{selectedPlayer || '인원 선택'}</span>
        <svg
          className={`h-4 w-4 text-gray-400`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-md bg-[#1e1e1e]">
          {membersList.map((member) => (
            <div
              key={member}
              className="cursor-pointer border-b border-[#2a2a2a] px-3 py-2 text-body3s"
              onClick={() => onSelect(member)}
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

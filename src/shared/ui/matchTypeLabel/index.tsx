import { EtcIcon } from '@/shared/assets/svg';
import { MATCH_TYPES, MatchType } from '@/shared/model/matchTypes';
import { cn } from '@/shared/utils/cn';

interface MatchTypeLabel {
  type: MatchType;
  customText?: string;
  color?: string;
  isHaveBorder?: boolean;
  pointer?: boolean;
}

const MatchTypeLabel = ({
  type,
  customText,
  color,
  isHaveBorder = false,
  pointer = false,
}: MatchTypeLabel) => {
  const { icon, text: defaultText } = MATCH_TYPES[type] || {
    icon: (color) => <EtcIcon color={color} />,
    text: '기타',
  };

  const displayText = customText || defaultText;

  const isHex = color?.startsWith('#');

  const borderStyle = [
    'laptop:px-[1rem]',
    'laptop:py-[0.75rem]',
    'p-[0.25rem]',
    'px-[0.5rem]',
    'rounded-lg',
    'border-1',
    'border-solid',
    `border-${color}`,
    !isHex && color ? `border-${color}` : 'border-main-500',
  ];

  const commonClasses = cn(
    'w-fit',
    'flex',
    'gap-8',
    'text-nowrap',
    'items-center',
    'laptop:h-[2.8125rem]',
    'h-[1.875rem]',
    isHaveBorder && borderStyle,
  );

  const content = (
    <>
      {icon && (
        <label className={cn(pointer && 'cursor-pointer')}>{icon(color)}</label>
      )}
      <p
        className={cn(
          'laptop:text-body3s',
          'leading-[1.3125rem]',
          'text-caption2s',
          !isHex && color ? `text-${color}` : '',
        )}
        style={isHex ? { color } : {}}
      >
        {displayText}
      </p>
    </>
  );

  return (
    <div className={commonClasses} style={isHex ? { borderColor: color } : {}}>
      {content}
    </div>
  );
};

export default MatchTypeLabel;

import { EtcIcon } from '@/shared/assets/svg';
import { MATCH_TYPES, MatchType } from '@/shared/model/matchTypes';
import { cn } from '@/shared/utils/cn';

interface MatchTypeLabel {
  type: MatchType;
  customText?: string;
  color?: string;
  isHaveBorder?: boolean;
}

const MatchTypeLabel = ({
  type,
  customText,
  color,
  isHaveBorder = false,
}: MatchTypeLabel) => {
  const { icon, text: defaultText } = MATCH_TYPES[type] || {
    icon: (color) => <EtcIcon color={color} />,
    text: '기타',
  };

  const displayText = customText || defaultText;

  const isHex = color?.startsWith('#');

  const borderStyle = [
    'px-[1rem]',
    'py-[0.75rem]',
    'laptop:p-[0.25rem]',
    'laptop:px-[0.5rem]',
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
    'h-[2.8125rem]',
    'laptop:h-[1.875rem]',
    isHaveBorder && borderStyle,
  );

  const content = (
    <>
      {icon && <label>{icon(color)}</label>}
      <p
        className={cn(
          'text-body3s',
          'leading-[1.3125rem]',
          'laptop:text-caption3s',
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

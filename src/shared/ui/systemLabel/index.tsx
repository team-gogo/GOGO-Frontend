import React from 'react';
import MatchTypeLabel from '../matchTypeLabel';

interface SystemLabelProps {
  system: 'TOURNAMENT' | 'FULL_LEAGUE' | 'SINGLE' | undefined;
  roundText: string | undefined;
  isFinal: boolean;
}

const SystemLabel = ({ system, roundText, isFinal }: SystemLabelProps) => {
  if (system === 'TOURNAMENT') {
    return (
      <MatchTypeLabel
        type={isFinal ? 'FINAL' : 'OFFICIAL'}
        customText={roundText}
        color={isFinal ? '#97A9FF' : '#FFF'}
      />
    );
  } else if (system === 'FULL_LEAGUE') {
    return (
      <MatchTypeLabel type={'OFFICIAL'} customText={'리그전'} color={'#FFF'} />
    );
  } else if (system === 'SINGLE') {
    return (
      <MatchTypeLabel type={'OFFICIAL'} customText={'단판'} color={'#FFF'} />
    );
  } else {
    return (
      <MatchTypeLabel type={'OFFICIAL'} customText={roundText} color={'#FFF'} />
    );
  }
};

export default SystemLabel;

'use client';

import React from 'react';
import EightBracketLine from '@/shared/assets/svg/BarcketLine/EightBracketLine';
import FiveBracketLine from '@/shared/assets/svg/BarcketLine/FiveBracketLine';
import FourBracketLine from '@/shared/assets/svg/BarcketLine/FourBracketLine';
import SevenBracketLine from '@/shared/assets/svg/BarcketLine/SevenBracketLine';
import SixBracketLine from '@/shared/assets/svg/BarcketLine/SixBracketLine';
import ThreeBracketLine from '@/shared/assets/svg/BarcketLine/ThreeBracketLine';
import { GroupDistribution } from '@/shared/model/calculateTeamDistribution';
import { cn } from '@/shared/utils/cn';

interface BracketConnectionLayerProps {
  finalStage: number;
  teamCount: number;
  firstRoundDistribution: [GroupDistribution, GroupDistribution];
  smallViewBox?: string;
  largeViewBox?: string;
}

interface BracketSvgProps {
  viewBox: string;
  maxWidth: string;
  maxHeight: string;
  id: string;
  children: React.ReactNode;
}

const BracketSvg = ({
  viewBox,
  maxWidth,
  maxHeight,
  id,
  children,
}: BracketSvgProps) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      id={id}
      className="bracket-connection-svg"
      style={{
        maxWidth,
        maxHeight,
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.85,
        zIndex: 1,
      }}
    >
      {children}
    </svg>
  );
};

const BracketConnectionLayer = ({
  finalStage,
  teamCount,
  firstRoundDistribution,
  smallViewBox = '0 0 992 220',
  largeViewBox = '0 0 1184 364',
}: BracketConnectionLayerProps) => {
  const cssVars = {
    '--bracket-final-stage': finalStage,
    '--bracket-left-top-count': firstRoundDistribution[0].top,
    '--bracket-left-bottom-count': firstRoundDistribution[0].bottom,
    '--bracket-right-top-count': firstRoundDistribution[1].top,
    '--bracket-right-bottom-count': firstRoundDistribution[1].bottom,
    '--bracket-total-teams':
      firstRoundDistribution[0].top +
      firstRoundDistribution[0].bottom +
      firstRoundDistribution[1].top +
      firstRoundDistribution[1].bottom,
  } as React.CSSProperties;

  const smallSvgStyle = {
    maxWidth: '80%',
    maxHeight: '70%',
  };

  const largeSvgStyle = {
    maxWidth: '95%',
    maxHeight: '90%',
  };

  return (
    <div
      className={cn(
        'absolute',
        'inset-0',
        'z-0',
        'pointer-events-none',
        'overflow-visible',
      )}
      data-bracket-stage={finalStage}
      id="bracket-connection-layer"
      style={cssVars}
    >
      <div
        data-top-left-count={firstRoundDistribution[0].top}
        data-bottom-left-count={firstRoundDistribution[0].bottom}
        data-top-right-count={firstRoundDistribution[1].top}
        data-bottom-right-count={firstRoundDistribution[1].bottom}
        className="hidden"
      />

      <div
        className="absolute inset-0 h-full w-full"
        id="bracket-svg-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        {teamCount === 3 ? (
          <BracketSvg
            viewBox={smallViewBox}
            maxWidth={smallSvgStyle.maxWidth}
            maxHeight={smallSvgStyle.maxHeight}
            id="bracket-svg-3"
          >
            <ThreeBracketLine />
          </BracketSvg>
        ) : teamCount === 4 ? (
          <BracketSvg
            viewBox={smallViewBox}
            maxWidth={smallSvgStyle.maxWidth}
            maxHeight={smallSvgStyle.maxHeight}
            id="bracket-svg-4"
          >
            <FourBracketLine />
          </BracketSvg>
        ) : teamCount === 5 ? (
          <BracketSvg
            viewBox={largeViewBox}
            maxWidth={largeSvgStyle.maxWidth}
            maxHeight={largeSvgStyle.maxHeight}
            id="bracket-svg-5"
          >
            <FiveBracketLine />
          </BracketSvg>
        ) : teamCount === 6 ? (
          <BracketSvg
            viewBox={largeViewBox}
            maxWidth={largeSvgStyle.maxWidth}
            maxHeight={largeSvgStyle.maxHeight}
            id="bracket-svg-6"
          >
            <SixBracketLine />
          </BracketSvg>
        ) : teamCount === 7 ? (
          <BracketSvg
            viewBox={largeViewBox}
            maxWidth={largeSvgStyle.maxWidth}
            maxHeight={largeSvgStyle.maxHeight}
            id="bracket-svg-7"
          >
            <SevenBracketLine />
          </BracketSvg>
        ) : (
          <BracketSvg
            viewBox={largeViewBox}
            maxWidth={largeSvgStyle.maxWidth}
            maxHeight={largeSvgStyle.maxHeight}
            id="bracket-svg-8"
          >
            <EightBracketLine />
          </BracketSvg>
        )}
      </div>
    </div>
  );
};

export default BracketConnectionLayer;

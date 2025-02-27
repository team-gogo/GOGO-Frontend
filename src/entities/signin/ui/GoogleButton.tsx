import React from 'react';
import { GoogleLogo } from '@/shared/assets/svg';

const GoogleButton = () => {
  return (
    <button className="flex w-full items-center justify-between rounded-lg bg-white p-16 text-body2b text-black">
      <GoogleLogo />
      <span className="flex-grow text-center text-body2m text-black">
        Google 계정으로 시작하기
      </span>
    </button>
  );
};

export default GoogleButton;

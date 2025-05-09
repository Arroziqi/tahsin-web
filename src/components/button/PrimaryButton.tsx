'use client';

import React from 'react';
import colors from '@/constants/colors';

interface PrimaryButtonProps {
  text: string;
  onClick: () => void;
}

function PrimaryButton({ text, onClick }: Readonly<PrimaryButtonProps>) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: colors.C06 }}
      className={`text-white px-4 py-4 w-[360] rounded-[10px] text-lg font-semibold`}
    >
      {text}
    </button>
  );
}

export default PrimaryButton;

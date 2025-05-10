'use client';

import React from 'react';
import colors from '@/constants/colors';
import { Property } from 'csstype';
import Width = Property.Width;

interface PrimaryButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  width?: Width<string | number | undefined>;
}

function PrimaryButton({ text, onClick, className, width }: Readonly<PrimaryButtonProps>) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: colors.C06, width: width }}
      className={`${className ?? ''} w-full text-white px-4 py-4 rounded-[10px] text-lg font-semibold`}
    >
      {text}
    </button>
  );
}

export default PrimaryButton;

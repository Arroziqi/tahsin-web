'use client';

import React from 'react';
import colors from '@/constants/colors';
import { Property } from 'csstype';
import Width = Property.Width;

interface PrimaryButtonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  width?: Width<string | number | undefined>;
  disabled?: boolean;
}

function PrimaryButton({
  text,
  onClick,
  className,
  width,
  disabled,
}: Readonly<PrimaryButtonProps>) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: !disabled ? colors.C06 : colors['bg-disabled'], width: width }}
      className={`${className ?? ''} w-full text-white px-4 py-4 rounded-[10px] text-lg font-semibold cursor-pointer`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default PrimaryButton;

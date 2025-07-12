import React from 'react';
import colors from '@/constants/colors';

interface TextSectionNavbarProps {
  text: string;
}

function TextSectionNavbar({ text }: Readonly<TextSectionNavbarProps>) {
  return (
    <p className={`font-semibold text-[12px] mb-2 mt-4`} style={{ color: colors.C04 }}>
      {text}
    </p>
  );
}

export default TextSectionNavbar;

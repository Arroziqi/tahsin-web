import React from 'react';
import colors from '@/constants/colors';

interface CopyrigthProps {
  className?: string;
}

function Copyrigth({ className }: Readonly<CopyrigthProps>) {
  return (
    <p style={{ color: colors.C05 }} className={`text-[12px] ${className ?? ''}`}>
      © 2024 Tahsin App. All rights reserved | Kebijakan Privasi
    </p>
  );
}

export default Copyrigth;

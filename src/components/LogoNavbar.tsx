import React from 'react';
import Image from 'next/image';
import colors from '@/constants/colors';

interface LogoNavbarProps {
  className?: string;
}

function LogoNavbar({ className }: Readonly<LogoNavbarProps>) {
  return (
    <div className={`flex gap-2 items-center w-full ${className ?? ''}`}>
      <Image
        src={`/img/logo.svg`}
        alt={'logo tahsin app'}
        width={40}
        height={40}
        objectFit={'cover'}
      />
      <p className={`text-sm font-medium`} style={{ color: colors.C04 }}>
        Tahsin App
      </p>
    </div>
  );
}

export default LogoNavbar;

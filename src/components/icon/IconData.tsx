import React from 'react';
import colors from '@/constants/colors';
import Image from 'next/image';

export interface IconDataProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  className?: string;
}

function IconData({
  src = '/img/people.svg',
  alt = 'people icon',
  width = 30,
  height = 30,
  backgroundColor = colors.C07,
  className = '',
}: Readonly<IconDataProps>) {
  return (
    <div
      className={`rounded-lg p-2 w-[50px] h-[50px] flex justify-center items-center ${className}`}
      style={{ backgroundColor: backgroundColor ?? colors.C07 }}
    >
      <Image src={src} alt={alt} width={width} height={height} />
    </div>
  );
}

export default IconData;

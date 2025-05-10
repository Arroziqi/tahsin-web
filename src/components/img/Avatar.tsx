import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
}

function Avatar({ src = '/img/avatar.svg' }: Readonly<AvatarProps>) {
  return (
    <Image
      src={src}
      width={40}
      height={40}
      objectFit={'cover'}
      className={`rounded-full`}
      alt={'avatar image'}
    />
  );
}

export default Avatar;

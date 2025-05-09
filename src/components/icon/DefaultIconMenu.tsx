import React from 'react';
import Image from 'next/image';

function DefaultIconMenu() {
  return (
    <Image
      src={'/img/icon-menu.svg'}
      alt={'icon menu'}
      width={24}
      height={24}
      objectFit={'cover'}
    />
  );
}

export default DefaultIconMenu;

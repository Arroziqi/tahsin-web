import React from 'react';
import colors from '@/constants/colors';
import DefaultIconMenu from '@/components/icon/DefaultIconMenu';

interface ItemNavbarProps {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  text: string;
  onClick?: () => void;
}

function ItemNavbar({
  leadingIcon = <DefaultIconMenu />,
  trailingIcon,
  text,
  onClick,
}: Readonly<ItemNavbarProps>) {
  return (
    <button
      className={`flex gap-4 items-center py-2 px-3 rounded-[8px] w-full cursor-pointer`}
      style={{ backgroundColor: colors.C05 }}
      onClick={onClick}
    >
      {leadingIcon}
      <p>{text}</p>
      {trailingIcon}
    </button>
  );
}

export default ItemNavbar;

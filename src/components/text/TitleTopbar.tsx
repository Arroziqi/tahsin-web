import React from 'react';
import colors from '@/constants/colors';

interface TitleTopbarProps {
  title: string;
}

function TitleTopbar({ title }: Readonly<TitleTopbarProps>) {
  return (
    <p className={`font-semibold text-2xl`} style={{ color: colors.C02 }}>
      {title}
    </p>
  );
}

export default TitleTopbar;

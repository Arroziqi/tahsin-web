import React from 'react';
import colors from '@/constants/colors';

interface TitlePageProps {
  title: string;
}

function TitlePage({ title }: Readonly<TitlePageProps>) {
  return (
    <p className={`font-semibold text-2xl`} style={{ color: colors.C02 }}>
      {title}
    </p>
  );
}

export default TitlePage;

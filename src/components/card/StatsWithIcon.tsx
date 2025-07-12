import React from 'react';
import IconData, { IconDataProps } from '@/components/icon/IconData';

interface StatsWithIconProps extends IconDataProps {
  data: string;
  label: string;
}

function StatsWithIcon({ data, label, ...rest }: Readonly<StatsWithIconProps>) {
  return (
    <div className={'flex items-center gap-4'}>
      <IconData {...rest} />
      <div className="flex flex-col justify-between">
        <p className="text-xl font-bold text-[#242424]">{data}</p>
        <p className="text-sm font-medium text-[#8a8d8e]">{label}</p>
      </div>
    </div>
  );
}

export default StatsWithIcon;

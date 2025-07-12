import React from 'react';
import colors from '@/constants/colors';

export type TabBarItemProps = {
  text: string;
  key: string;
};

type TabBarProps = {
  items: TabBarItemProps[];
  activeKey: string;
  onTabClick: (key: string) => void;
};

function TabBar({ items, activeKey, onTabClick }: TabBarProps) {
  return (
    <div className="flex w-full my-[54px]" style={{ backgroundColor: colors.C07 }}>
      {items.map((item) => (
        <div
          key={item.key}
          className={`flex w-full justify-center items-center font-semibold py-[14px] cursor-pointer ${
            activeKey === item.key ? 'border-b-[2px]' : ''
          }`}
          style={{ color: colors.C02, borderColor: colors.C06 }}
          onClick={() => onTabClick(item.key)}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
}

export default TabBar;

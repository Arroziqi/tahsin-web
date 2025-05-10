import React from 'react';

interface CardViewProps {
  children: React.ReactNode;
  className?: string;
}

function CardView({ children, className }: Readonly<CardViewProps>) {
  return (
    <div
      className={`${className ?? ' '} py-[17px] px-[27px] rounded-[8px] border border-[#e4e4e4] gap-3 flex flex-col`}
    >
      {children}
    </div>
  );
}

export default CardView;

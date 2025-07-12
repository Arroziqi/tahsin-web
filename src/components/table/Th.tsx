import React, { MouseEventHandler } from 'react';

interface ThProps {
  onClick?: MouseEventHandler<HTMLTableHeaderCellElement>;
  children: React.ReactNode;
  className?: string;
}

function Th({ onClick, children, className }: Readonly<ThProps>) {
  return (
    <th
      className={`px-6 py-3 text-left text-xs font-bold tracking-wider cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </th>
  );
}

export default Th;

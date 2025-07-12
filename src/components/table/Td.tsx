import React from 'react';

interface TdProps {
  children: React.ReactNode;
  className?: string;
}

function Td({ children, className }: Readonly<TdProps>) {
  return (
    <td className={`px-6 py-4 whitespace-nowrap text-xs font-normal ${className}`}>{children}</td>
  );
}

export default Td;

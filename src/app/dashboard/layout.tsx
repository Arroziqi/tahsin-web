import React from 'react';
import Navbar from '@/components/navbar/Navbar';

interface LayoutDashboardProps {
  children: React.ReactNode;
}

function LayoutDashboard({ children }: Readonly<LayoutDashboardProps>) {
  return (
    <div className={`flex`}>
      <Navbar />
      {children}
    </div>
  );
}

export default LayoutDashboard;

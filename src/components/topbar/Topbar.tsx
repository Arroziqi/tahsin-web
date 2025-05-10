import React from 'react';
import TitleTopbar from '@/components/text/TitleTopbar';
import Profile from '@/components/topbar/Profile';

interface TopbarProps {
  title: string;
  username: string;
  role: string;
}

function Topbar({ title, username, role }: Readonly<TopbarProps>) {
  return (
    <div
      className={`absolute z-20 left-0 top-0 right-0 flex justify-between items-center py-5 px-11 w-full bg-white border-b border-[#d9d9d9]`}
    >
      <TitleTopbar title={title} />
      <Profile username={username} role={role} />
    </div>
  );
}

export default Topbar;

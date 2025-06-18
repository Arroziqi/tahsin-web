'use client';
import React, { useEffect, useState } from 'react';
import TitleTopbar from '@/components/text/TitleTopbar';
import Profile from '@/components/topbar/Profile';

interface TopbarProps {
  title: string;
}

function Topbar({ title }: Readonly<TopbarProps>) {
  const [user, setUser] = useState<any>({ username: 'Anandita', role: 'User' });

  useEffect(() => {
    const userSaved = localStorage.getItem('user');
    if (userSaved) {
      try {
        const parsed = JSON.parse(userSaved);
        setUser(parsed);
      } catch (err) {
        console.error('Failed to parse user from localStorage', err);
      }
    }
  }, []);

  return (
    <div
      className={`absolute z-20 left-0 top-0 right-0 flex justify-between items-center py-5 px-11 w-full bg-white border-b border-[#d9d9d9]`}
    >
      <TitleTopbar title={title} />
      <Profile username={user.username} role={user.role} />
    </div>
  );
}

export default Topbar;

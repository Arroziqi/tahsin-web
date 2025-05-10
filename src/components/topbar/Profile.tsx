import React from 'react';
import Avatar from '@/components/img/Avatar';
import { IoNotificationsOutline } from 'react-icons/io5';

interface ProfileProps {
  username: string;
  role: string;
  src?: string;
}

function Profile({ username, role, src }: Readonly<ProfileProps>) {
  return (
    <div className={`flex gap-3 items-center`}>
      <button
        className={
          'w-[30px] text-black h-[30px] text-[18px] mr-1 rounded-full bg-[#eaeaea] flex justify-center items-center'
        }
      >
        <IoNotificationsOutline size={18} />
      </button>
      <div className="flex flex-col justify-between items-end">
        <p className={`text-sm font-bold text-[#242424]`}>{username}</p>
        <p className={`text-[12px] font-medium text-[#8a8d8e]`}>{role}</p>
      </div>
      <Avatar src={src} />
    </div>
  );
}

export default Profile;

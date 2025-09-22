'use client';

import React, { useState } from 'react';
import Topbar from '@/components/topbar/Topbar';
import TitlePage from '@/components/text/TitlePage';
import TabBar, { TabBarItemProps } from '@/components/button/TabBar';
import AddClassSchedulePage from '@/app/dashboard/student-management/class-schedule/add/page';
import ListClassSchedulePage from '@/app/dashboard/student-management/class-schedule/list/page';

const TABS: TabBarItemProps[] = [
  { text: 'Daftar Jadwal Kelas', key: 'list_class_schedule' },
  { text: 'Tambah Jadwal Kelas', key: 'add_class_schedule' },
];

function ClassSchedulePage() {
  const [activeTab, setActiveTab] = useState('list_class_schedule');

  const renderContent = () => {
    switch (activeTab) {
      case 'list_class_schedule':
        return <ListClassSchedulePage />;
      case 'add_class_schedule':
        return <AddClassSchedulePage />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="relative z-1 w-full flex justify-center items-center flex-col bg-white">
        <Topbar title="Jadwal Kelas" />
        <div className="w-full h-screen overflow-y-auto">
          <div className="mx-auto pt-[103px] flex flex-col gap-5 max-w-[936px] w-full h-fit pb-9">
            <TitlePage title="Jadwal Kelas" />
            <TabBar items={TABS} activeKey={activeTab} onTabClick={setActiveTab} />
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
}

export default ClassSchedulePage;

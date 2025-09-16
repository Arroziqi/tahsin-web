'use client';

import React, { useState } from 'react';
import Topbar from '@/components/topbar/Topbar';
import TitlePage from '@/components/text/TitlePage';
import TabBar, { TabBarItemProps } from '@/components/button/TabBar';
import StudentPage from '@/app/dashboard/student-management/assessment/student/page';
import RegistrationDocumentPage from '@/app/dashboard/student-management/assessment/registration-document/page';

const TABS: TabBarItemProps[] = [
  { text: 'Siswa', key: 'student' },
  { text: 'Dokumen Pendaftaran', key: 'registration_document' },
];

function AssessmentPage() {
  const [activeTab, setActiveTab] = useState('student');

  const renderContent = () => {
    switch (activeTab) {
      case 'student':
        return <StudentPage />;
      case 'registration_document':
        return <RegistrationDocumentPage />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={'relative z-1 w-full flex justify-center items-center flex-col bg-white'}>
        <Topbar title={'Kelola Siswa'} />

        <div className="w-full h-screen overflow-y-auto">
          <div className="mx-auto pt-[103px] flex flex-col gap-5 max-w-[936px] w-full h-fit pb-9">
            <TitlePage title="Kelola Siswa" />
            <TabBar items={TABS} activeKey={activeTab} onTabClick={setActiveTab} />
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
}

export default AssessmentPage;

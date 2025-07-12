'use client';

import React, { useState } from 'react';
import Topbar from '@/components/topbar/Topbar';
import TitlePage from '@/components/text/TitlePage';
import TabBar, { TabBarItemProps } from '@/components/button/TabBar';
import LevelTable from '@/components/table/LevelTable';
import Spinner from '@/components/alert/Spinner';
import ErrorAlert from '@/components/alert/ErrorAlert';
import useLevels from '@/hooks/fetchData/useLevels';
import useTimes from '@/hooks/fetchData/useTimes';
import useDays from '@/hooks/fetchData/useDays';
import TimeTable from '@/components/table/TimeTable';
import DayTable from '@/components/table/DayTable';

const TABS: TabBarItemProps[] = [
  { text: 'Level Kelas', key: 'level' },
  { text: 'Sesi Waktu', key: 'time' },
  { text: 'Hari Tersedia', key: 'day' },
];

function ClassManagementPage() {
  const {
    data: levels,
    loading: loadingLevels,
    error: errorLevels,
    refresh: refreshLevels,
  } = useLevels();
  const {
    data: times,
    loading: loadingTimes,
    error: errorTimes,
    refresh: refreshSessions,
  } = useTimes();
  const { data: days, loading: loadingDays, error: errorDays, refresh: refreshDays } = useDays();
  const [activeTab, setActiveTab] = useState('level');

  const isLoading = loadingLevels || loadingTimes || loadingDays;
  const isError = errorLevels || errorTimes || errorDays;

  const renderContent = () => {
    switch (activeTab) {
      case 'level':
        return (
          <LevelTable
            dataFetched={levels}
            loading={loadingLevels}
            error={errorLevels}
            refreshLevels={refreshLevels}
          />
        );
      case 'time':
        return (
          <TimeTable
            dataFetched={times}
            loading={loadingTimes}
            error={errorTimes}
            refreshTimes={refreshSessions}
          />
        );
      case 'day':
        return (
          <DayTable
            dataFetched={days}
            loading={loadingDays}
            error={errorDays}
            refreshDays={refreshDays}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className={'relative z-1 w-full flex justify-center items-center flex-col bg-white'}>
        <Topbar title={'Kelola Kelas'} />

        <div className="w-full h-screen overflow-y-auto">
          <div className="mx-auto pt-[103px] flex flex-col gap-5 max-w-[936px] w-full h-fit pb-9">
            <TitlePage title="Pengaturan Kelas | Kelola level, sesi, dan hari tersedia" />
            <TabBar items={TABS} activeKey={activeTab} onTabClick={setActiveTab} />
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Notifikasi */}
      {isLoading && <Spinner />}

      {isError && <ErrorAlert errorResponse={isError} />}
    </>
  );
}

export default ClassManagementPage;

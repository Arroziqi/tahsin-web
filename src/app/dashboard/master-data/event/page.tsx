'use client';

import React from 'react';
import Topbar from '@/components/topbar/Topbar';
import TitlePage from '@/components/text/TitlePage';
import CardView from '@/components/card/CardView';
import StatsWithIcon from '@/components/card/StatsWithIcon';
import EventTable from '@/components/table/EventTable';
import useEvents from '@/hooks/fetchData/useEvents';

function EventPage() {
  const { data, loading, error, refresh, setError } = useEvents();

  // Calculate statistics
  const totalActiveEvents = React.useMemo(() => {
    return data.filter((event) => event.isActive).length;
  }, [data]);

  return (
    <div className="relative z-1 w-full flex justify-center items-center flex-col bg-white">
      <Topbar title="Kelola Event" />
      <div className="w-full h-screen overflow-y-auto">
        <div className="mx-auto pt-[103px] flex flex-col gap-5 max-w-[936px] w-full h-fit pb-9">
          <TitlePage title="Daftar Event" />

          {/* Statistics Cards */}
          <CardView className="w-fit flex flex-row gap-16">
            <StatsWithIcon
              data={data.length.toString()}
              label="Total Event"
              src="/img/calendar.svg"
              alt="calendar icon"
            />
            <StatsWithIcon
              data={totalActiveEvents.toString()}
              label="Event Aktif"
              src="/img/event.svg"
              alt="active icon"
            />
          </CardView>

          {/* Event Table */}
          <EventTable dataFetched={data} loading={loading} error={error} refreshEvents={refresh} />
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center">
          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" />
          Memuat data...
        </div>
      )}

      {/* Error Notification */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center">
          <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" />
          {error}
          <button onClick={() => setError(null)} className="ml-2">
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export default EventPage;

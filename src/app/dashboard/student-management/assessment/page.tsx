'use client';

import React from 'react';
import Topbar from '@/components/topbar/Topbar';
import TitlePage from '@/components/text/TitlePage';
import EnrollmentTable from '@/components/table/EnrollmentTable';
import useEnrollments from '@/hooks/fetchData/enrollment/useEnrollment';

function AssessmentPage() {
  const { data, loading, error, refresh, setError } = useEnrollments();
  return (
    <div className="relative z-1 w-full flex justify-center items-center flex-col bg-white">
      <Topbar title="Halaman Assessment" />
      <div className="w-full h-screen overflow-y-auto">
        <div className="mx-auto pt-[103px] flex flex-col gap-5 max-w-[936px] w-full h-fit pb-9">
          <TitlePage title="Halaman Assessment" />;
          <EnrollmentTable
            dataFetched={data}
            loading={loading}
            error={error}
            refreshEnrollments={refresh}
          />
        </div>
      </div>
    </div>
  );
}

export default AssessmentPage;

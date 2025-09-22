// CashPaymentPage.tsx
'use client';

import React from 'react';
import ClassScheduleTable from '@/components/table/ClassScheduleTable';
import { useClassSchedules } from '@/hooks/fetchData/classSchedule/useClassSchedules';

function ListClassSchedulePage() {
  const { data, loading, error, refetch } = useClassSchedules();

  return (
    <ClassScheduleTable
      dataFetched={data}
      loading={loading}
      error={error}
      refreshClassSchedules={refetch}
    />
  );
}

export default ListClassSchedulePage;

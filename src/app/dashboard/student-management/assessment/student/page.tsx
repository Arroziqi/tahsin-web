'use client';

import React from 'react';
import StudentTable from '@/components/table/StudentTable';
import useStudents from '@/hooks/fetchData/useStudents';

function StudentPage() {
  const { data, loading, error, refresh, setError } = useStudents();
  return (
    <StudentTable dataFetched={data} loading={loading} error={error} refreshStudents={refresh} />
  );
}

export default StudentPage;

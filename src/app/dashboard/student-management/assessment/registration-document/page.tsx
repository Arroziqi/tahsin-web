'use client';

import React from 'react';
import EnrollmentTable from '@/components/table/EnrollmentTable';
import useEnrollments from '@/hooks/fetchData/enrollment/useEnrollment';

function RegistrationDocumentPage() {
  const { data, loading, error, refresh, setError } = useEnrollments();
  return (
    <EnrollmentTable
      dataFetched={data}
      loading={loading}
      error={error}
      refreshEnrollments={refresh}
    />
  );
}

export default RegistrationDocumentPage;

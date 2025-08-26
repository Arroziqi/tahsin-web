// CashPaymentPage.tsx
'use client';

import React from 'react';
import TransactionTable from '@/components/table/TransactionTable';
import useTransactions from '@/hooks/fetchData/transaction/useTransactions';

function UpdatePaymentPage() {
  const { data, loading, error, setError, refresh } = useTransactions();

  return (
    <TransactionTable
      dataFetched={data}
      loading={loading}
      error={error}
      refreshTransactions={refresh}
    />
  );
}

export default UpdatePaymentPage;

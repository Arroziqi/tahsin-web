'use client';

import React, { useState } from 'react';
import Topbar from '@/components/topbar/Topbar';
import TitlePage from '@/components/text/TitlePage';
import TabBar, { TabBarItemProps } from '@/components/button/TabBar';
import Spinner from '@/components/alert/Spinner';
import ErrorAlert from '@/components/alert/ErrorAlert';
import useTransactions from '@/hooks/fetchData/transaction/useTransactions';
import CashPaymentPage from '@/app/dashboard/student-management/payment/cash-payment/page';
import UpdatePaymentPage from '@/app/dashboard/student-management/payment/update-payment/page';

const TABS: TabBarItemProps[] = [
  { text: 'Pembayaran Cash', key: 'cash_payment' },
  { text: 'Update Pembayaran', key: 'update_payment' },
];

function PaymentPage() {
  const {
    data: transactions,
    loading: loadingTransactions,
    error: errorTransactions,
    refresh: refreshTransactions,
  } = useTransactions();

  const [activeTab, setActiveTab] = useState('cash_payment');

  const isLoading = loadingTransactions;
  const isError = errorTransactions;

  const renderContent = () => {
    switch (activeTab) {
      case 'cash_payment':
        return <CashPaymentPage />;
      case 'update_payment':
        return <UpdatePaymentPage />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={'relative z-1 w-full flex justify-center items-center flex-col bg-white'}>
        <Topbar title={'Kelola Pembayaran'} />

        <div className="w-full h-screen overflow-y-auto">
          <div className="mx-auto pt-[103px] flex flex-col gap-5 max-w-[936px] w-full h-fit pb-9">
            <TitlePage title="Kelola Pembayaran" />
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

export default PaymentPage;

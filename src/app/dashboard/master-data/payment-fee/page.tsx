'use client';

import React from 'react';
import Topbar from '@/components/topbar/Topbar';
import TitlePage from '@/components/text/TitlePage';
import CardView from '@/components/card/CardView';
import StatsWithIcon from '@/components/card/StatsWithIcon';
import usePaymentFees from '@/hooks/fetchData/usePaymentFees';
import PaymentFeeTable from '@/components/table/PaymentFeeTable';

function PaymentFeePage() {
  const { data, loading, error, refresh, setError } = usePaymentFees();

  return (
    <div className="relative z-1 w-full flex justify-center items-center flex-col bg-white">
      <Topbar title="Kelola Biaya Pembayaran" />
      <div className="w-full h-screen overflow-y-auto">
        <div className="mx-auto pt-[103px] flex flex-col gap-5 max-w-[936px] w-full h-fit pb-9">
          <TitlePage title="Daftar Biaya Pembayaran" />

          {/* Statistics Cards */}
          <CardView className="w-fit flex flex-row gap-16">
            <StatsWithIcon
              data={data.length.toString()}
              label="Total Biaya Pembayaran"
              src="/img/money.svg"
              alt="money icon"
            />
          </CardView>

          {/* Biaya Pembayaran Table */}
          <PaymentFeeTable
            dataFetched={data}
            loading={loading}
            error={error}
            refreshPaymentFees={refresh}
          />
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

export default PaymentFeePage;

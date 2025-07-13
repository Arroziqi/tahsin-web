import React from 'react';
import FilterStatus from '@/components/filter/FilterStatus';
import SearchBar from '@/components/filter/SearchBar';
import { ColumnDefinition } from '@/components/table/RichTable';
import useTableController from '@/hooks/component/useTableController';
import GenericRichTable from '@/components/table/GenericRichTable';

interface GenericTableProps<T> {
  dataFetched: T[];
  columns: ColumnDefinition<T>[];
  searchableFields: string[];
  loading?: boolean;
  error?: string | null;

  showStatusFilter?: boolean;
  statusList?: string[];
  selectedStatus?: number;
  onStatusChange?: (index: number) => void;
  statusFieldName?: keyof T;

  addDataComponent: React.ReactNode;
}

function getNestedValue(obj: any, path: string) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

function GenericTableWrapper<T>({
  dataFetched,
  columns,
  searchableFields,
  loading = false,
  error = null,
  showStatusFilter = false,
  statusList = [],
  selectedStatus = 0,
  onStatusChange = () => {},
  statusFieldName,
  addDataComponent = null,
}: GenericTableProps<T>) {
  const selectedStatusValue =
    showStatusFilter && selectedStatus !== undefined && selectedStatus !== 0
      ? statusFieldName === 'isActive'
        ? selectedStatus === 1
          ? 'true'
          : 'false'
        : statusList[selectedStatus]
      : undefined;

  const {
    searchTerm,
    setSearchTerm,
    sortConfig,
    requestSort,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData: rawPaginatedData,
  } = useTableController<T>(dataFetched, statusFieldName, selectedStatusValue);

  const filteredData = rawPaginatedData.filter((item) => {
    return searchableFields.some((field) => {
      const value = getNestedValue(item, field);
      return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  const emptyState = (
    <div className="flex flex-col items-center justify-center">
      <p className="text-gray-500">Tidak ada data ditemukan</p>
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="mt-2 text-blue-500 hover:text-blue-700 cursor-pointer"
        >
          Hapus Pencarian
        </button>
      )}
    </div>
  );

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-4">
        {showStatusFilter && (
          <FilterStatus
            status={statusList}
            selectedStatus={selectedStatus}
            onChange={onStatusChange}
          />
        )}
        <div className="flex items-center gap-4">
          <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          {addDataComponent}
        </div>
      </div>

      <GenericRichTable<T>
        columns={columns}
        data={filteredData}
        loading={loading}
        error={error}
        sortConfig={sortConfig ?? undefined}
        onSort={(key) => {
          if (typeof key === 'string' && key.includes('.')) return; // ⛔️ hindari nested key
          requestSort(key as keyof T); // ✅ pastikan hanya top-level key
        }}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        emptyState={emptyState}
      />
    </div>
  );
}

export default GenericTableWrapper;

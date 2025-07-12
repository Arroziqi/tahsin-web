import FilterStatus from '@/components/filter/FilterStatus';
import SearchBar from '@/components/filter/SearchBar';
import { ColumnDefinition } from '@/components/table/RichTable';
import useTableController from '@/hooks/component/useTableController';
import GenericRichTable from '@/components/table/GenericRichTable';

interface GenericTableProps<T> {
  dataFetched: T[];
  columns: ColumnDefinition<T>[];
  searchableFields: (keyof T)[];
  loading?: boolean;
  error?: string | null;

  showStatusFilter?: boolean;
  statusList?: string[];
  selectedStatus?: number;
  onStatusChange?: (index: number) => void;
  statusFieldName?: keyof T;

  addDataComponent: React.ReactNode;
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
      ? statusList[selectedStatus]
      : undefined;

  const {
    searchTerm,
    setSearchTerm,
    sortConfig,
    requestSort,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
  } = useTableController<T>(
    dataFetched,
    searchableFields,
    showStatusFilter ? statusFieldName : undefined,
    selectedStatusValue
  );

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
        data={paginatedData}
        loading={loading}
        error={error}
        sortConfig={sortConfig}
        onSort={requestSort}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        emptyState={emptyState}
      />
    </div>
  );
}

export default GenericTableWrapper;

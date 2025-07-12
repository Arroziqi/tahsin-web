import React from 'react';
import { SortIcon } from '../icon/SortIcon';
import Th from './Th';
import Td from './Td';

export interface ColumnDefinition<T> {
  key: any;
  label: string;
  className?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface RichTableProps<T> {
  columns: ColumnDefinition<T>[];
  data: T[]; // This should be the ALREADY PAGINATED data from useTableController
  loading?: boolean;
  error?: string | null;
  sortConfig?: {
    key: keyof T;
    direction: 'ascending' | 'descending';
  } | null;
  onSort?: (key: keyof T) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  emptyState?: React.ReactNode;
}

function RichTable<T>({
  columns,
  data,
  loading = false,
  error = null,
  sortConfig = null,
  onSort,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  emptyState,
}: RichTableProps<T>) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-black rounded-lg">
        <thead className="rounded-lg bg-gray-100">
          <tr>
            {columns.map((column) => (
              <Th
                key={column.key.toString()}
                className={column.className}
                onClick={() => onSort?.(column.key)}
              >
                <div className="flex items-center gap-2">
                  {column.label}
                  {sortConfig?.key === column.key && <SortIcon direction={sortConfig!.direction} />}
                </div>
              </Th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <Td key={column.key.toString()}>
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key] || '-')}
                  </Td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center">
                {emptyState || (
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-gray-500">No data found</p>
                  </div>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && onPageChange && (
        <div className="flex justify-between items-center mt-4 text-black">
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50 cursor-pointer"
          >
            Previous
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-8 h-8 rounded-md cursor-pointer ${
                  currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default RichTable;

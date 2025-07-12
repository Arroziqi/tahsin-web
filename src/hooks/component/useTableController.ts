import { useEffect, useMemo, useState } from 'react';

export type SortDirection = 'ascending' | 'descending';

interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

function useTableController<T>(
  dataFetched: T[],
  searchableFields: (keyof T)[],
  statusField?: keyof T,
  selectedStatusValue?: string
) {
  const [data, setData] = useState<T[]>(dataFetched);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Reset data when dataFetched changes
  useEffect(() => {
    setData(dataFetched);
    setCurrentPage(1); // Reset to first page when data changes
  }, [dataFetched]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatusValue]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const requestSort = (key: keyof T) => {
    let direction: SortDirection = 'ascending';
    if (sortConfig?.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page when sorting
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = searchableFields.some((field) =>
        String(item[field]).toLowerCase().includes(searchTerm.toLowerCase())
      );

      const matchesStatus =
        statusField && selectedStatusValue
          ? String(item[statusField] ?? '').toLowerCase() === selectedStatusValue.toLowerCase()
          : true;

      return matchesSearch && matchesStatus;
    });
  }, [data, searchableFields, statusField, selectedStatusValue, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal === bVal) return 0;
      if (aVal == null) return sortConfig.direction === 'ascending' ? 1 : -1;
      if (bVal == null) return sortConfig.direction === 'ascending' ? -1 : 1;

      return (aVal < bVal ? -1 : 1) * (sortConfig.direction === 'ascending' ? 1 : -1);
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / itemsPerPage));

  // Ensure currentPage is within valid range
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  return {
    searchTerm,
    setSearchTerm: handleSearch,
    sortConfig,
    requestSort,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalPages,
    paginatedData,
    sortedData, // For debugging purposes
    filteredData, // For debugging purposes
  };
}

export default useTableController;

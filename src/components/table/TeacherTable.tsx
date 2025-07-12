import React, { useEffect, useState } from 'react';
import FilterStatus from '@/components/filter/FilterStatus';
import SearchBar from '@/components/filter/SearchBar';
import RichTable, { ColumnDefinition } from '@/components/table/RichTable';
import { Pencil, Trash2 } from 'lucide-react';
import { TeacherResponseDataType, TeacherStatus } from '@/hooks/fetchData/useTeachers';

interface TeacherTableProps {
  dataFetched: TeacherResponseDataType[];
  loading?: boolean;
  error?: string | null;
}

const statusList = ['Semua', 'Aktif', 'Cuti'];

function TeacherTable({ dataFetched = [], loading = false, error = null }: TeacherTableProps) {
  const [data, setData] = useState<TeacherResponseDataType[]>(dataFetched);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof TeacherResponseDataType;
    direction: 'ascending' | 'descending';
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setData(dataFetched);
    setCurrentPage(1);
  }, [dataFetched]);

  const handleStatusChange = (index: number) => {
    setSelectedStatus(index);
    setCurrentPage(1);
  };

  const filteredData = data.filter((item) => {
    const matchesSearch = Object.values(item).some((val) =>
      val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesStatus =
      selectedStatus === 0 ||
      (selectedStatus === 1 && item.status === 'ACTIVE') ||
      (selectedStatus === 2 && item.status === 'ON_LEAVE');

    return matchesSearch && matchesStatus;
  });

  const sortedData = React.useMemo(() => {
    const sortableData = [...filteredData];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (!a[sortConfig.key] && !b[sortConfig.key]) return 0;
        if (!a[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        if (!b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;

        // @ts-ignore
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        // @ts-ignore
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const requestSort = (key: keyof TeacherResponseDataType) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig?.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const columns: ColumnDefinition<TeacherResponseDataType>[] = [
    {
      key: 'id',
      label: 'ID',
      className: 'rounded-tl-lg',
    },
    {
      key: 'username',
      label: 'Username',
    },
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'noTelp',
      label: 'Phone',
      render: (value: string) => <span className="text-[#828282]">{value || '-'}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: TeacherStatus) => {
        const statusMap = {
          ACTIVE: 'Aktif',
          ON_LEAVE: 'Cuti',
          RESIGNED: 'Mengundurkan Diri',
        };

        const colorMap = {
          ACTIVE: 'bg-[#EEFBD1] text-[#1F5305]',
          ON_LEAVE: 'bg-[#FFF3CD] text-[#856404]',
          RESIGNED: 'bg-[#FCE6CF] text-[#CF0000]',
        };

        return (
          <span
            className={`text-[#4B5563] font-medium px-[13px] py-[2px] rounded-sm ${colorMap[value] || ''}`}
          >
            {statusMap[value] || '-'}
          </span>
        );
      },
    },
    {
      key: 'createdAt',
      label: 'Tanggal Bergabung',
      className: 'whitespace-nowrap',
      render: (value: Date) => (
        <span className="text-[#828282]">{value ? formatDate(value) : '-'}</span>
      ),
    },
    {
      key: 'actions',
      label: 'Aksi',
      render: (_, row) => (
        <div className="flex gap-3">
          <button
            className="text-[#828282] hover:text-blue-700 cursor-pointer"
            title="Edit"
            onClick={() => console.log('Edit', row.id)}
          >
            <Pencil size={16} />
          </button>
          <button
            className="text-[#828282] hover:text-red-700 cursor-pointer"
            title="Hapus"
            onClick={() => console.log('Hapus', row.id)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
      className: 'rounded-tr-lg text-center',
    },
  ];

  const emptyState = (
    <div className="flex flex-col items-center justify-center">
      <p className="text-gray-500">Tidak ada pengajar ditemukan</p>
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="mt-2 text-blue-500 hover:text-blue-700"
        >
          Hapus pencarian
        </button>
      )}
    </div>
  );

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-4">
        <FilterStatus
          status={statusList}
          selectedStatus={selectedStatus}
          onChange={handleStatusChange}
        />
        <SearchBar value={searchTerm} onChange={handleSearch} />
      </div>

      <RichTable<TeacherResponseDataType>
        columns={columns}
        data={sortedData}
        loading={loading}
        error={error}
        sortConfig={sortConfig}
        onSort={requestSort}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        emptyState={emptyState}
      />
    </div>
  );
}

export default TeacherTable;

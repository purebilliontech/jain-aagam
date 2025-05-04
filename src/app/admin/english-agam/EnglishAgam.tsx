"use client"
import React, { useEffect, useState, useCallback } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/dataTable/dataTable';
import { EnglishAgamContactDTO } from '@/schema/englishAagam';
import { usePagination } from '@/hooks/usePagination';
import { getEnglishAagams } from './action';
import { DataTableColumnHeader } from '@/components/dataTable/columnHeader';
import CustomFilter from './CustomFilter';



export default function EnglishAagam() {
  const [englishAagams, setEnglishAagams] = useState<EnglishAgamContactDTO[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { pagination, onPaginationChange } = usePagination(20, 0);


  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getEnglishAagams(pagination.pageIndex, searchTerm);
      setEnglishAagams(result.data.englishAagamList);
      setTotalRows(result.data.meta.totalCount);
      console.log('result',result)
    } catch (error) {
      console.error("Failed to fetch English Aagams:", error);
    } finally {
      setLoading(false);
    }
  }, [pagination.pageIndex, searchTerm]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const columns: ColumnDef<EnglishAgamContactDTO>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    },
    {
      accessorKey: "city",
      header: ({ column }) => <DataTableColumnHeader column={column} title="City" />,
    },
    {
      accessorKey: "country",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Country" />,
    },
    {
      accessorKey: "email",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    },
    {
      accessorKey: "contactNumber",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Phone" />,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">English Aagam Contacts</h2>
      </div>
      <DataTable
        columns={columns}
        data={englishAagams}
        CustomFilterComponent={(props) => (
          <CustomFilter
            globalFilter={props.globalFilter}
            setGlobalFilter={(value) => {
              props.setGlobalFilter(value);
              setSearchTerm(value);
            }}
          />
        )}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
        totalRows={totalRows}
        loading={loading}
      />
    </div>
  );
}
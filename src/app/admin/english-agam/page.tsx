"use client"
import React, { useEffect, useState, useCallback } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/dataTable/dataTable';
import { EnglishAgamContactDTO } from '@/schema/englishAagam';
import { usePagination } from '@/hooks/usePagination';
import { getEnglishAagams } from './action';
import { DataTableColumnHeader } from '@/components/dataTable/columnHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CustomFilterProps {
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
}

const CustomFilter = ({ globalFilter, setGlobalFilter }: CustomFilterProps) => {
  const [searchInput, setSearchInput] = useState(globalFilter);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setGlobalFilter(searchInput);
    },
    [searchInput, setGlobalFilter]
  );

  return (
    <form className="flex w-full items-center gap-2" onSubmit={handleSearch}>
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-4 h-4 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <Input
          className="pl-10 text-sm rounded-lg bg-white border-slate-200 focus-visible:ring-slate-300"
          placeholder="Search English Aagam by name, city, or country ..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <Button type="submit" variant="outline" className="border-slate-200 text-slate-700 hover:text-slate-900">
        Search
      </Button>
    </form>
  );
};

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
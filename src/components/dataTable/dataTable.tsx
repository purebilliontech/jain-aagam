"use client";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useState,
  useTransition,
} from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  RowSelectionState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DataTablePagination } from "../dataTable/tablePagination";
import { Input } from "../ui/input";
import { DataTableViewOptions } from "./dataTableViewOptions";
import { usePagination } from "@/hooks/usePagination";

export type CustomFilterComponentProps = {
  globalFilter: string;
  setGlobalFilter: Dispatch<SetStateAction<string>>;
};
type DataTableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
  CustomFilterComponent?: FC<CustomFilterComponentProps>;
  filterRequired?: boolean;
  pagination?: ReturnType<typeof usePagination>["pagination"];
  onPaginationChange?: ReturnType<typeof usePagination>["onPaginationChange"];
  getRowProps?: (row: Row<T>) => { className?: string };
  totalRows?: number;
  showTopButtons?: boolean;
  loading?: boolean;
};

export function DataTable<T>({
  columns,
  data,
  CustomFilterComponent = undefined,
  filterRequired = true,
  pagination = undefined,
  onPaginationChange = undefined,
  getRowProps = undefined,
  totalRows = undefined,
  showTopButtons = true,
  loading = false,
}: DataTableProps<T>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [isPending, startTransition] = useTransition();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [rowSelection] = useState<RowSelectionState>({});
  const {
    pagination: internalPagination,
    onPaginationChange: internalPaginationChange,
  } = usePagination();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: onPaginationChange ?? internalPaginationChange,
    manualPagination: !!onPaginationChange && !!pagination,
    rowCount: totalRows,
    state: {
      sorting,
      globalFilter,
      columnFilters,
      rowSelection,
      pagination: pagination ?? internalPagination,
    },
    onSortingChange: setSorting,
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Table Controls */}
      <div className="flex items-center gap-4 py-4">
        {filterRequired && CustomFilterComponent && (
          <CustomFilterComponent
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        )}

        {filterRequired && !CustomFilterComponent && (
          <div className="flex w-full items-center gap-4">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <Input
                className="pl-10 text-sm rounded-lg bg-white border-slate-200 focus-visible:ring-slate-300"
                placeholder="Search..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>
          </div>
        )}

        {showTopButtons && (
          <div className="flex ml-auto gap-2">
            <DataTableViewOptions table={table} />
          </div>
        )}
      </div>

      {/* Table */}
      <div className="w-full rounded-lg border border-slate-200 overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-slate-100 border-b border-slate-200">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-slate-600 font-medium text-xs uppercase tracking-wider py-3">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: Row<T>) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-slate-50 border-b border-slate-100 last:border-0"
                  {...(getRowProps ? getRowProps(row) : {})}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-slate-500"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <svg className="w-8 h-8 text-slate-300 animate-spin" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      {/* <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /> */}
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M4 12a8 8 0 018-8" />
                    </svg>
                    <p>Loading...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-slate-500"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <svg className="w-8 h-8 text-slate-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.5 11.5V11m7 0v.5m-8-4c0-4 1.773-5 3.5-5s3.5 1 3.5 5m-7 0h7m-7 7c0 1 .6 3 3.5 3s3.5-2 3.5-3m-7-3v3m7-3v3m-8-8c0-5 2-6 4.5-6s4.5 1 4.5 6v2c0 5-2 6-4.5 6s-4.5-1-4.5-6v-2Z" />
                    </svg>
                    <p>No results found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <DataTablePagination table={table} />
    </div>
  );
}

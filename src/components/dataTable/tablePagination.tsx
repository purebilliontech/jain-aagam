import React, { useState, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  onPaginationChange?: (
    page: number,
    pageSize: number,
    setTotalRecords: React.Dispatch<React.SetStateAction<number>>,
  ) => void;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-2 py-4">
      <div className="text-sm text-slate-500 mb-4 sm:mb-0">
        Showing <span className="font-medium text-slate-700">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to{" "}
        <span className="font-medium text-slate-700">
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}
        </span>{" "}
        of <span className="font-medium text-slate-700">{table.getFilteredRowModel().rows.length}</span> results
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-500">Rows</label>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(parseInt(value))}
          >
            <SelectTrigger className="h-8 w-[70px] border-slate-200 text-sm bg-white">
              <SelectValue
                placeholder={`${table.getState().pagination.pageSize}`}
              />
            </SelectTrigger>
            <SelectContent side="bottom">
              {[10, 20, 30, 50, 100].map((size) => (
                <SelectItem key={size} value={`${size}`} className="text-sm">
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
            onClick={table.previousPage}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          
          <span className="px-3 text-sm text-slate-600">
            <span className="font-medium">{table.getState().pagination.pageIndex + 1}</span>
            <span className="mx-1">/</span>
            <span>{table.getPageCount() || 1}</span>
          </span>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
            onClick={table.nextPage}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface TablePaginationProps {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  siblingCount?: number;
  onPageChange: (page: number) => void;
}

export function TablePagination({
  currentPage,
  pageSize,
  totalCount,
  siblingCount = 1,
  onPageChange,
}: TablePaginationProps) {
  const [pageInputValue, setPageInputValue] = useState(currentPage.toString());
  
  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pageSize);
  
  // Update input when page changes externally
  useEffect(() => {
    setPageInputValue(currentPage.toString());
  }, [currentPage]);
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    // Add first page
    if (leftSiblingIndex > 1) {
      pageNumbers.push(1);
      if (leftSiblingIndex > 2) {
        pageNumbers.push('...');
      }
    }

    // Add middle pages
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pageNumbers.push(i);
    }

    // Add last page
    if (rightSiblingIndex < totalPages) {
      if (rightSiblingIndex < totalPages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();
  
  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInputValue(e.target.value);
  };
  
  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const pageNumber = parseInt(pageInputValue);
    if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
      // Reset to current page if invalid
      setPageInputValue(currentPage.toString());
      return;
    }
    
    onPageChange(pageNumber);
  };
  
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1 py-4">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 border-slate-200"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onPageChange(1);
        }}
        disabled={currentPage === 1}
        type="button"
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 border-slate-200"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onPageChange(currentPage - 1);
        }}
        disabled={currentPage === 1}
        type="button"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      
      {pageNumbers.map((pageNumber, index) => (
        pageNumber === '...' ? (
          <span key={`ellipsis-${index}`} className="px-3 text-sm text-slate-600">...</span>
        ) : (
          <Button
            key={`page-${pageNumber}`}
            variant={currentPage === pageNumber ? "default" : "outline"}
            className={`h-8 w-8 ${currentPage === pageNumber ? 'bg-primaryBlue text-white' : 'border-slate-200 text-slate-600'}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onPageChange(pageNumber as number);
            }}
            type="button"
          >
            {pageNumber}
          </Button>
        )
      ))}
      
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 border-slate-200"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onPageChange(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
        type="button"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 border-slate-200"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onPageChange(totalPages);
        }}
        disabled={currentPage === totalPages}
        type="button"
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
      
      {/* Page number input */}
      <div className="ml-2 flex items-center">
        <span className="text-sm text-slate-500 mr-2">Go to:</span>
        <input
          type="text"
          value={pageInputValue}
          onChange={handlePageInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handlePageInputSubmit(e);
            }
          }}
          className="h-8 w-14 rounded-md border border-slate-200 px-2 text-sm"
          aria-label="Go to page"
        />
        <Button 
          type="button"
          onClick={handlePageInputSubmit}
          size="sm" 
          variant="outline" 
          className="ml-1 h-8 border-slate-200 text-xs"
        >
          Go
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export const usePagination = (initialPageSize = 10, initialPageIndex = 0) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: initialPageIndex,
    pageSize: initialPageSize,
  });

  const onPaginationChange = (updater: ((state: PaginationState) => PaginationState) | PaginationState) => {
    setPagination((prev) => {
      return typeof updater === "function" ? updater(prev) : updater;
    });
  };

  return {
    pagination,
    onPaginationChange,
  };
};

export default usePagination;
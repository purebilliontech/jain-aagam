import React from "react";
import { Input } from "../ui/input";
import { CustomFilterComponentProps } from "../dataTable/dataTable";

export const SearchInputGlobalFilter: React.FC<
  CustomFilterComponentProps & {
    children: React.ReactNode;
    isGlobalFilter?: boolean;
  }
> = ({ globalFilter, setGlobalFilter, children, isGlobalFilter = true }) => {
  return (
    <div className="flex w-full items-center gap-4 max-md:flex-col md:flex-row">
      {/* Global text filter */}
      <div
        className={`flex w-full flex-row items-center gap-4 ${!isGlobalFilter ? "hidden" : ""}`}
      >
        <div className="relative w-full max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-4 w-4 text-slate-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <Input
            className="rounded-lg border-slate-200 bg-white pl-10 text-sm focus-visible:ring-slate-300"
            placeholder="Search..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="ml-auto flex gap-2">{children}</div>
    </div>
  );
};

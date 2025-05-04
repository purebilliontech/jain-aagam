import React, { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CustomFilterProps {
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
}

const CustomFilter: React.FC<CustomFilterProps> = ({ globalFilter, setGlobalFilter }) => {
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

export default CustomFilter;
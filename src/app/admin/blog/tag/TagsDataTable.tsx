"use client";

import React, { useState, useCallback } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/dataTable/dataTable";
import { usePagination } from "@/hooks/usePagination";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/dataTable/columnHeader";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { getTags } from "./actions";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";
import type { BlogTagsDTO } from "@/schema/blogTag";

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
          placeholder="Search tags by name or slug..."
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

export default function TagsDataTable() {
  const router = useRouter();
  const [tags, setTags] = useState<BlogTagsDTO[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const { pagination, onPaginationChange } = usePagination(10, 0);

  const { hasPermissions } = useAuth();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getTags({
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        search: searchTerm,
        sortBy,
        sortDirection,
      });

      if (!result.success) {
        toast.error("Failed to fetch tags");
        return;
      }

      setTags(result.data?.tags || []);
      setTotalRows(result.data?.meta.totalCount || 0);
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    } finally {
      setLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, searchTerm, sortBy, sortDirection]);

  // Update data when pagination or filters change
  React.useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const handleAddTag = () => {
    router.push("/admin/blog/tag/new");
  };

  const handleEditTag = (tagId: string) => {
    router.push(`/admin/blog/tag/${tagId}`);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const columns: ColumnDef<BlogTagsDTO>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.getValue("name")}</span>
        </div>
      ),
    },
    {
      accessorKey: "slug",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Slug" />,
    },
    {
      accessorKey: "active",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Active" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.getValue("active") ? "Yes" : "No"}</span>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
      cell: ({ row }) => formatDate(row.getValue("createdAt")),
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Updated At" />,
      cell: ({ row }) => formatDate(row.getValue("updatedAt")),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditTag(row.original.id)}
            className="h-8 w-8 p-0 text-slate-600 hover:text-blue-600"
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tags</h2>
        {hasPermissions(['modify:blog-tag']) &&
          <Button onClick={handleAddTag} >
            Add Tag
          </Button>
        }
      </div>
      <DataTable
        columns={columns}
        data={tags}
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
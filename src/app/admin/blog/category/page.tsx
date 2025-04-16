import { Suspense } from "react";
import dynamic from "next/dynamic";
import CategoriesDataTable from "./CategoriesDataTable";

export default function CategoriesPage() {
  return (
    <div className="container mx-auto p-6">
      <Suspense fallback={<div>Loading...</div>}>
        <CategoriesDataTable />
      </Suspense>
    </div>
  );
}
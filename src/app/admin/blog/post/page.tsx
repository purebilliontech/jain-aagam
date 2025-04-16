import { Suspense } from "react";
import BlogDataTable from "./BlogsDataTable";

export default function CategoriesPage() {
  return (
    <div className="container mx-auto p-6">
      <Suspense fallback={<div>Loading...</div>}>
        <BlogDataTable />
      </Suspense>
    </div>
  );
}
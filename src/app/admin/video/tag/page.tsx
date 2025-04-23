import { Suspense } from "react";
import dynamic from "next/dynamic";
import CategoriesDataTable from "./TagsDataTable";
import { authorizeUser } from "@/lib/auth";
import NoPermission from "@/components/common/NoPermission";
import TagsDataTable from "./TagsDataTable";

export default async function TagsPage() {

  const user = await authorizeUser(["view:blog-category"]);

  if (!user.success) {
    return (
      <NoPermission message={user.message} />
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Suspense fallback={<div>Loading...</div>}>
        <TagsDataTable />
      </Suspense>
    </div>
  );
}
import { Suspense } from "react";
import VideoTagsDataTable from "./VideoTagsDataTable";
import { authorizeUser } from "@/lib/auth";
import NoPermission from "@/components/common/NoPermission";

export default async function VideoTagsPage() {

  const user = await authorizeUser(["view:video-tag"]);

  if (!user.success) {
    return (
      <NoPermission message={user.message} />
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Suspense fallback={<div>Loading...</div>}>
        <VideoTagsDataTable />
      </Suspense>
    </div>
  );
}
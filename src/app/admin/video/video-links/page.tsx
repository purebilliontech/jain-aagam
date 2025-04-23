import { Suspense } from "react";
import { authorizeUser } from "@/lib/auth";
import NoPermission from "@/components/common/NoPermission";
import YoutubeVideosDataTable from "./YoutubeVideosDataTable";

export default async function VideoTagsPage() {

  const user = await authorizeUser(["view:video"]);

  if (!user.success) {
    return (
      <NoPermission message={user.message} />
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Suspense fallback={<div>Loading...</div>}>
        <YoutubeVideosDataTable />
      </Suspense>
    </div>
  );
}
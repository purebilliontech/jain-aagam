import { Suspense } from "react";
import PlaylistTable from "./PlaylistTable";
import { authorizeUser } from "@/lib/auth";
import NoPermission from "@/components/common/NoPermission";

export default async function PlaylistPage() {
    const user = await authorizeUser(["view:frontend-playlist"]);

    if (!user.success) {
        return (
            <NoPermission message={user.message} />
        );
    }

    return (
        <div className="container mx-auto p-6">
            <Suspense fallback={<div>Loading...</div>}>
                <PlaylistTable />
            </Suspense>
        </div>
    );
}
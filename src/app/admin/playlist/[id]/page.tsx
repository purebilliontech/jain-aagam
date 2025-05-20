import { notFound } from "next/navigation";
import PlaylistForm from "./PlaylistForm";
import { getPlaylistById } from "./actions";
import { authorizeUser } from "@/lib/auth";
import NoPermission from "@/components/common/NoPermission";

interface PlaylistPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function PlaylistPage({ params }: PlaylistPageProps) {
    const { id } = await params;

    const { success, data: playlist } = await getPlaylistById(id);

    // If not creating a new playlist and playlist wasn't found
    if (id !== "new" && !success) {
        return notFound();
    }

    const user = await authorizeUser(["view:frontend-playlist"]);

    if (!user.success) {
        return (
            <NoPermission message={user.message} />
        );
    }

    return (
        <div className="space-y-6">
            <PlaylistForm playlist={playlist} />
        </div>
    );
}
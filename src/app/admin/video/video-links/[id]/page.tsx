import { notFound } from "next/navigation";
import VideoForm from "./VideoForm";
import { getVideoById, getTags } from "./actions";
import { authorizeUser } from "@/lib/auth";
import NoPermission from "@/components/common/NoPermission";

interface VideoPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function VideoPage({ params }: VideoPageProps) {
    const { id } = await params;

    const { success: videoSuccess, data: video } = await getVideoById(id);
    const { success: tagsSuccess, data: tags } = await getTags();

    // If not creating a new video and video wasn't found
    if (id !== "new" && !videoSuccess) {
        return notFound();
    }

    const user = await authorizeUser(["view:video"]);

    if (!user.success) {
        return (
            <NoPermission message={user.message} />
        );
    }

    return (
        <div className="space-y-6">
            <VideoForm video={video} tags={tags} />
        </div>
    );
}
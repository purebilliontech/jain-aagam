import { redirect } from "next/navigation";
import PlaylistForm from "./PlaylistForm";
import { getPlaylistById, getAllVideos } from "./actions";

interface PlaylistPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PlaylistPage({ params }: PlaylistPageProps) {
  const { id } = await params;

  const [playlistResult, videosResult] = await Promise.all([
    getPlaylistById(id),
    getAllVideos(),
  ]);

  if (!playlistResult.success || !playlistResult.data) {
    redirect("/admin/video/playlist");
  }

  return (
    <div className="container mx-auto py-6">
      <PlaylistForm
        playlist={playlistResult.data}
        allVideos={videosResult.success ? videosResult.data : []}
      />
    </div>
  );
}
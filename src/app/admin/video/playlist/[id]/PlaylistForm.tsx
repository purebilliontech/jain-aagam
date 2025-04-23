"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash, Trash2, X } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import type { PlaylistWithVideos } from "@/schema/playlist";
import type { YoutubeVideoDTO } from "@/schema/video";
import { updatePlaylistVideos } from "./actions";

export default function PlaylistForm({
  playlist,
  allVideos
}: {
  playlist: PlaylistWithVideos,
  allVideos: YoutubeVideoDTO[]
}) {
  const router = useRouter();
  const { hasPermissions } = useAuth();

  // Get video IDs from playlist
  const initialVideoIds = playlist.playlistVideos.map(pv => pv.videoId);
  const [selectedVideoIds, setSelectedVideoIds] = useState<string[]>(initialVideoIds);

  const handleSaveVideos = async () => {
    try {
      const result = await updatePlaylistVideos(playlist.id, selectedVideoIds);
      if (result.success) {
        toast.success("Playlist videos updated successfully");
        router.refresh();
      } else {
        toast.error("Failed to update playlist videos");
      }
    } catch (error) {
      console.error("Error updating playlist videos:", error);
      toast.error("An error occurred while updating playlist videos");
    }
  };

  // Prepare list of videos not yet in the playlist
  const availableVideos = allVideos.filter(
    video => !selectedVideoIds.includes(video.id)
  );

  return (
    <div>
      <Card className="container mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="text-center">{playlist.name}</CardTitle>
          <CardDescription className="text-center text-primary">{playlist.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Playlist Videos</h3>

            {hasPermissions(["modify:video"]) && (
              <div className="form-item">
                <label className="form-label">Add Videos</label>
                <Select
                  onValueChange={(selectedVideoId) => {
                    if (!selectedVideoIds.includes(selectedVideoId)) {
                      setSelectedVideoIds([...selectedVideoIds, selectedVideoId]);
                    }
                  }}
                  value=""
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a video" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {availableVideos.map(video => (
                        <SelectItem className="cursor-pointer" key={video.id} value={video.id}>
                          {video.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Current Videos</h4>
              {selectedVideoIds.length === 0 ? (
                <p className="text-sm text-gray-500">No videos in this playlist</p>
              ) : (
                <div className="space-y-2">
                  {selectedVideoIds.map((videoId) => {
                    const video = allVideos.find((v) => v.id === videoId);
                    return (
                      <div key={videoId} className="flex items-center justify-between p-2 border rounded-md">
                        <span className="text-sm w-11/12" >{video?.name || "Unknown Video"}</span>
                        <button
                          type="button"
                          className="text-red-500 w-1/12 cursor-pointer hover:text-red-700"
                          onClick={() => {
                            setSelectedVideoIds(selectedVideoIds.filter(id => id !== videoId));
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {hasPermissions(["modify:video"]) && (
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/video/playlist")}
              >
                Cancel
              </Button>
              <Button type="button" onClick={handleSaveVideos}>
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
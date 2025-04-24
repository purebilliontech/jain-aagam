"use server";

import { db } from "@/lib/db";
import { handleServerActionError } from "@/helpers/error";
import { PlaylistWithVideosSchema } from "@/schema/playlist";
import { authorizeUser } from "@/lib/auth";
import { YoutubeVideoDTOSchema } from "@/schema/video";

export const getPlaylistById = async (id: string) => {
  try {
    const user = await authorizeUser(["view:video"]);
    if (!user.success) {
      throw new Error(user.message);
    }

    const playlist = await db.playlist.findUnique({
      where: { id },
      include: {
        playlistVideos: {
          include: {
            video: true
          }
        }
      }
    });

    if (!playlist) return { success: false, data: null };

    return {
      success: true,
      data: PlaylistWithVideosSchema.parse(playlist)
    };
  } catch (error) {
    handleServerActionError(error);
    return { success: false, data: null };
  }
};

export const getAllVideos = async () => {
  try {
    const user = await authorizeUser(["view:video"]);
    if (!user.success) {
      throw new Error(user.message);
    }

    const videos = await db.youtubeVideo.findMany({
      orderBy: { name: 'asc' }
    });

    return {
      success: true,
      data: videos.map(video => YoutubeVideoDTOSchema.parse(video))
    };
  } catch (error) {
    handleServerActionError(error);
    return { success: false, data: [] };
  }
};

export const updatePlaylistVideos = async (playlistId: string, videoIds: string[]) => {
  try {
    const user = await authorizeUser(["modify:video"]);
    if (!user.success) {
      throw new Error(user.message);
    }

    if (!videoIds.length) {
      return { success: false, data: null, message: "No videos selected" };
    }

    await db.playlist.update({
      where: { id: playlistId },
      data: {
        playlistVideos: {
          deleteMany: {
            playlistId
          },
          createMany: {
            data: videoIds.map(videoId => ({
              playlistId,
              videoId
            }))
          }
        }
      }
    });

    return { success: true, data: null };
  } catch (error) {
    handleServerActionError(error);
    return { success: false, data: null };
  }
};
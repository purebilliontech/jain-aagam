"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GenericFormField,
  GenericFormInput,
} from "@/components/generic/GenericFormComponents";
import {
  YoutubeVideoForm,
  YoutubeVideoFormSchema,
  type YoutubeVideoWithTags,
} from "@/schema/video";
import { createVideo, updateVideoById } from "./actions";
import { useAuth } from "@/context/auth-context";
import type { VideoTagsDTO } from "@/schema/videoTag";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

export default function VideoForm({ video, tags }: { video: YoutubeVideoWithTags | null, tags: VideoTagsDTO[] }) {
  const router = useRouter();
  const isEditing = Boolean(video);

  const { hasPermissions } = useAuth();

  const form = useForm<YoutubeVideoForm>({
    resolver: zodResolver(YoutubeVideoFormSchema),
    defaultValues: {
      url: video?.url || "",
      tags: video?.tagsToVideo.map((tagToVideo) => tagToVideo.videoTagsId) || [],
      name: video?.name || "",
    },
  });

  const onSubmit = async (data: YoutubeVideoForm) => {
    try {
      if (isEditing && video) {
        const result = await updateVideoById(video.id, data);
        if (result.success) {
          toast.success("Video updated successfully");
        } else {
          toast.error("Failed to update video");
        }
      } else {
        const result = await createVideo(data);
        if (result.success && result.data) {
          toast.success("Video created successfully");
          router.replace(`/admin/video/video-links/${result.data.id}`);
        } else {
          toast.error("Failed to create video");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while saving the video");
    }
  };

  return (
    <div >
      <Card className="container mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="text-center">{isEditing ? "Edit Video" : "Create Video"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <GenericFormField
                    formLabel="Name"
                    field={field}
                    disabled={!hasPermissions(["modify:video"])}
                    cb={GenericFormInput}
                  />
                )}
              />


              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <GenericFormField
                    formLabel="URL"
                    field={field}
                    disabled={!hasPermissions(["modify:video"])}
                    cb={GenericFormInput}
                  />
                )}
              />

              <div className="form-item">
                <label className="form-label">Tags</label>
                <Select
                  onValueChange={(selectedTagId) => {
                    const currentTags = form.watch("tags");
                    if (!currentTags.includes(selectedTagId)) {
                      form.setValue("tags", [...currentTags, selectedTagId]);
                    }
                  }}
                  value=""
                  disabled={!hasPermissions(["modify:video"])}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {tags.filter(tag => !form.watch("tags").includes(tag.id)).map(tag => (
                        <SelectItem key={tag.id} value={tag.id}>
                          {tag.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-wrap gap-2">
                {form.watch("tags").map((tagId) => {
                  const tag = tags.find((t) => t.id === tagId);
                  return (
                    <div key={tagId} className="flex text-xs items-center space-x-2 bg-slate-200 px-2 py-1 rounded">
                      <span>{tag?.name}</span>
                      {hasPermissions(["modify:video"]) &&
                        <button
                          type="button"
                          className="cursor-pointer"
                          onClick={() => {
                            const updatedTags = form.watch("tags").filter((id) => id !== tagId);
                            form.setValue("tags", updatedTags);
                          }}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      }
                    </div>
                  );
                })}
              </div>


              {hasPermissions(["modify:video"]) &&
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/video/video-links")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {isEditing ? "Update" : "Create"}
                  </Button>
                </div>
              }
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
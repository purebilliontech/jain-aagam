"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GenericFormField,
  GenericFormInput,
  GenericRadioGroup,
} from "@/components/generic/GenericFormComponents";
import {
  FrontendPlaylistDTO,
  FrontendPlaylistForm,
  FrontendPlaylistFormSchema,
} from "@/schema/frontendPlaylist";
import { createPlaylist, updatePlaylistById } from "./actions";
import { useAuth } from "@/context/auth-context";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

export default function PlaylistForm({ playlist }: { playlist: FrontendPlaylistDTO | null }) {
  const router = useRouter();
  const isEditing = Boolean(playlist);

  const { hasPermissions } = useAuth();

  const form = useForm<FrontendPlaylistForm>({
    resolver: zodResolver(FrontendPlaylistFormSchema),
    defaultValues: {
      name: playlist?.name || "",
      slug: playlist?.slug || "",
      videos: playlist?.videos || [],
    },
  });

  const onSubmit = async (data: FrontendPlaylistForm) => {
    try {
      if (isEditing && playlist) {
        const result = await updatePlaylistById(playlist.id, data);
        if (result.success) {
          toast.success("Playlist updated successfully");
        } else {
          toast.error("Failed to update playlist");
        }
      } else {
        const result = await createPlaylist(data);
        if (result.success && result.data) {
          toast.success("Playlist created successfully");
          router.replace(`/admin/playlist/${result.data.id}`);
        } else {
          toast.error("Failed to create playlist");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while saving the playlist");
    }
  };

  return (
    <div>
      <Card className="container mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="text-center">{isEditing ? "Edit Playlist" : "Create Playlist"}</CardTitle>
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
                    disabled={isEditing}
                    cb={GenericFormInput}
                  />
                )}
              />

              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <GenericFormField
                      formLabel="Slug"
                      itemClass="w-full"
                      disabled={isEditing}
                      field={field}
                      cb={GenericFormInput}
                    />
                  )}
                />
                {!isEditing && <Button
                  type="button"
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    const name = form.getValues("name");
                    form.setValue("slug", name.toLowerCase().replace(/\s+/g, "-"));
                  }}
                >
                  Generate Slug
                </Button>}
              </div>

              <div className="flex  gap-2">
                <Label>Videos Urls</Label>
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    form.setValue("videos", [...form.getValues("videos"), ""]);
                  }}
                > + Add Video</Button>
              </div>
              <div className="flex flex-col gap-2">
                {form.watch("videos").map((video, index) => (
                  <div className="flex gap-2" key={index}>
                    <FormField
                      control={form.control}
                      name={`videos.${index}`}
                      render={({ field }) => (
                        <GenericFormField
                          formLabel=""
                          itemClass="w-full"
                          labelClass="hidden"
                          inputEle={<Input type="url" placeholder="video url" />}
                          disabled={!hasPermissions(["modify:frontend-playlist"])}
                          field={field}
                          cb={GenericFormInput}
                        />
                      )}
                    />
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => {
                        form.setValue("videos", form.getValues("videos").filter((_, i) => i !== index));
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>





              {hasPermissions(["modify:frontend-playlist"]) &&
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/playlist")}
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
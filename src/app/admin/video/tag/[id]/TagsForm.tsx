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
  VideoTagsDTO,
  VideoTagsForm,
  VideoTagsFormSchema,
} from "@/schema/videoTag";
import { createTag, updateTagById } from "./actions";
import { useAuth } from "@/context/auth-context";

export default function TagForm({ tag }: { tag: VideoTagsDTO | null }) {
  const router = useRouter();
  const isEditing = Boolean(tag);

  const { hasPermissions } = useAuth();

  const form = useForm<VideoTagsForm>({
    resolver: zodResolver(VideoTagsFormSchema),
    defaultValues: {
      name: tag?.name || "",
      slug: tag?.slug || "",
      active: tag?.active ?? true,
    },
  });

  const onSubmit = async (data: VideoTagsForm) => {
    try {
      if (isEditing && tag) {
        const result = await updateTagById(tag.id, data);
        if (result.success) {
          toast.success("Tag updated successfully");
        } else {
          toast.error("Failed to update tag");
        }
      } else {
        const result = await createTag(data);
        if (result.success && result.data) {
          toast.success("Tag created successfully");
          router.replace(`/admin/video/tag/${result.data.id}`);
        } else {
          toast.error("Failed to create tag");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while saving the tag");
    }
  };

  return (
    <div >
      <Card className="container mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="text-center">{isEditing ? "Edit Tag" : "Create Tag"}</CardTitle>
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
                    disabled={!hasPermissions(["modify:video-tag"])}
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
                      disabled={!hasPermissions(["modify:video-tag"])}
                      field={field}
                      cb={GenericFormInput}
                    />
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    const name = form.getValues("name");
                    form.setValue("slug", name.toLowerCase().replace(/\s+/g, "-"));
                  }}
                >
                  Generate Slug
                </Button>
              </div>

              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <GenericFormField
                    formLabel="Status"
                    divClass="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:items-center"
                    labelClass="w-2/12"
                    field={field}
                    disabled={!hasPermissions(["modify:video-tag"])}
                    cb={GenericRadioGroup}
                  />
                )}
              />
              {hasPermissions(["modify:video-tag"]) &&
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/video/tag")}
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
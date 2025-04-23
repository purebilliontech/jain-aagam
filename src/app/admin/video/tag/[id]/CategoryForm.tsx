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
  BlogCategoryDTO,
  BlogCategoryForm,
  BlogCategoryFormSchema,
} from "@/schema/blogTag";
import { createCategory, updateCategoryById } from "./actions";
import { useAuth } from "@/context/auth-context";

export default function CategoryForm({ category }: { category: BlogCategoryDTO | null }) {
  const router = useRouter();
  const isEditing = Boolean(category);

  const { hasPermissions } = useAuth();

  const form = useForm<BlogCategoryForm>({
    resolver: zodResolver(BlogCategoryFormSchema),
    defaultValues: {
      name: category?.name || "",
      slug: category?.slug || "",
      active: category?.active ?? true,
    },
  });

  const onSubmit = async (data: BlogCategoryForm) => {
    try {
      if (isEditing && category) {
        const result = await updateCategoryById(category.id, data);
        if (result.success) {
          toast.success("Category updated successfully");
        } else {
          toast.error("Failed to update category");
        }
      } else {
        const result = await createCategory(data);
        if (result.success && result.data) {
          toast.success("Category created successfully");
          router.replace(`/admin/blog/category/${result.data.id}`);
        } else {
          toast.error("Failed to create category");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while saving the category");
    }
  };

  return (
    <div >
      <Card className="container mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="text-center">{isEditing ? "Edit Category" : "Create Category"}</CardTitle>
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
                    disabled={!hasPermissions(["modify:blog-category"])}
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
                      disabled={!hasPermissions(["modify:blog-category"])}
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
                    disabled={!hasPermissions(["modify:blog-category"])}
                    cb={GenericRadioGroup}
                  />
                )}
              />
              {hasPermissions(["modify:blog-category"]) &&
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/blog/category")}
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
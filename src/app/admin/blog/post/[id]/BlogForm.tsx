"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Loader2, Trash2 } from "lucide-react";
import { Form, FormField } from "@/components/ui/form";
import { useForm, type Resolver } from "react-hook-form";
import {
    GenericFormField,
    GenericFormImageInput,
    GenericFormInput,
    GenericRadioGroup,
    GenericSelectClosure,
} from "@/components/generic/GenericFormComponents";
import { RichTextArea } from "@/components/generic/RichTextArea";
import slugify from "slugify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BlogFormSchema, type BlogDetail, type BlogForm } from "@/schema/blog";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBlogPost, updateBlogPostById } from "./actions";
import type { z } from "zod";
import { getHTMLFromContentJson } from "@/utils/blog-client";
import type { BlogCategoryDTO } from "@/schema/blogCategory";
import { useAuth } from "@/context/auth-context";

type BlogPostEditorProps = {
    blog: BlogDetail | null;
    categories: any[];
};

const BlogForm = ({
    blog,
    categories = [],
}: BlogPostEditorProps) => {
    const router = useRouter();

    const { hasPermissions } = useAuth();

    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm<BlogForm>({
        resolver: zodResolver(BlogFormSchema) as unknown as Resolver<BlogForm>,
        defaultValues: {
            title: blog?.title || "",
            synopsis: blog?.synopsis || "",
            contentJson: blog?.contentJson || ({} as any),
            authorName: blog?.authorName || "",
            readingTimeSeconds: blog?.readingTimeSeconds || 0,
            slug: blog?.slug || "",
            tags: blog?.tags || [],
            categoryId: blog?.categoryId || "",
            banner: blog?.banner || undefined,
            published: blog?.published || false,
        },
    });

    const saveBlog = async (formData: BlogForm) => {
        console.log(formData);
        try {
            if (blog) {
                const result = await updateBlogPostById(blog.id, formData);
                if (result.success) {
                    toast.success("Blog Updated Successfully");
                } else {
                    toast.error("Failed to Update Blog");
                }
            } else {
                const result = await createBlogPost(formData);
                if (result.success && result.data) {
                    toast.success("Blog Created Successfully");
                    router.replace(`/admin/blog/post/${result.data.id}`);
                } else {
                    toast.error("Failed to Create Blog");
                }
            }
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(saveBlog)}>
                <div className="p-4">
                    <Link href={"/admin/blog/post"}>
                        <div className="mb-6 flex items-center gap-2">
                            <ChevronLeft className="h-4 w-4" />
                            <span className="text-sm text-gray-500">Blog posts</span>
                        </div>
                    </Link>
                    <div className="flex justify-between">
                        <h1 className="mb-6 text-2xl font-semibold">Blog posts</h1>
                        <div className="flex gap-5">
                            {/* {blog && (
                                <Link target="_blank" href={`/admin/blog/preview/${blog.slug}`}>
                                    <Button type="button" variant={"secondary"} className="px-10">
                                        Preview
                                    </Button>
                                </Link>
                            )} */}
                            {hasPermissions(["modify:blog"]) &&
                                <Button
                                    type="submit"
                                    variant={loading ? "outline" : "default"}
                                    className="px-10"
                                >
                                    {loading && <Loader2 className="animate-spin" />}
                                    {loading ? "Saving" : "Save Blog"}
                                </Button>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="space-y-6 md:col-span-2">
                            <Card>
                                <CardContent className="pt-6">

                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <GenericFormField
                                                formLabel="Title"
                                                field={field}
                                                inputEle={
                                                    <Input type="text" placeholder="Enter Blog Title" />
                                                }
                                                divClass="relative"
                                                cb={GenericFormInput}
                                            />
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="contentJson"
                                        render={({ field }) => (
                                            <RichTextArea
                                                value={getHTMLFromContentJson(field.value)}
                                                onChange={(content, contentJson) => {
                                                    form.setValue(
                                                        "contentJson",
                                                        contentJson as any,
                                                    );
                                                }}
                                                className=""
                                                buttonClass={"buttonClass"}
                                                buttonDivClass={"buttonDivClass"}
                                                editorClass={"h-full"}
                                                innerDivClass={"innerDivClass"}
                                                outerDivClass={"outerDivClass"}
                                            />
                                        )}
                                    />
                                </CardContent>
                            </Card>
                            {/* <Card>
                                <CardHeader>
                                    <h2>Add Meta Tags</h2>
                                </CardHeader>
                                <CardContent>
                                    <PageConfigComp
                                        metaTags={metaTags}
                                        pageConfigs={blog?.PageConfig || []}
                                        savePageConfig={handleAddMetaTag}
                                    />
                                </CardContent>
                            </Card> */}
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center space-x-2">
                                        <FormField
                                            control={form.control}
                                            name="slug"
                                            render={({ field }) => (
                                                <GenericFormField
                                                    formLabel="Slug"
                                                    inputEle={
                                                        <Input type="text" placeholder="Enter Blog Slug" {...field} />
                                                    }
                                                    field={field}
                                                    cb={GenericFormInput}
                                                    divClass="relative"
                                                    itemClass="w-full"
                                                    labelClass="text-md"
                                                />
                                            )}
                                        />
                                        <Button
                                            variant="secondary"
                                            type="button"
                                            className="mt-5"
                                            onClick={() => {
                                                form.setValue(
                                                    "slug",
                                                    slugify(form.getValues("title"), {
                                                        strict: true,
                                                        lower: true,
                                                    }),
                                                );
                                            }}
                                        >
                                            Generate Slug
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <FormField
                                        control={form.control}
                                        name="published"
                                        render={({ field }) => (
                                            <GenericFormField
                                                formLabel="Visibility"
                                                field={field}
                                                radioButtonLabels={["Visible", "Hidden"]}
                                                cb={GenericRadioGroup}
                                                labelClass="text-md"
                                            />
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <FormField
                                        control={form.control}
                                        name="banner"
                                        render={({ field }) => (
                                            <GenericFormField
                                                formLabel="Featured Image"
                                                field={field}
                                                cb={GenericFormImageInput}
                                            />
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <div className="space-y-4">
                                        <div>
                                            <FormField
                                                control={form.control}
                                                name="categoryId"
                                                render={({ field }) => (
                                                    <GenericFormField
                                                        formLabel="Category"
                                                        itemClass={` ${form.formState.errors.readingTimeSeconds?.message ? "min-h-20" : ""}`}
                                                        divClass="w-full"
                                                        field={field}
                                                        cb={GenericSelectClosure({
                                                            className: "w-full",
                                                            triggerClass: "w-full",
                                                            options: categories.map((category: BlogCategoryDTO) => ({
                                                                value: category.id,
                                                                display: category.name,
                                                            })),
                                                        })}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <FormField
                                                control={form.control}
                                                name="synopsis"
                                                render={({ field }) => (
                                                    <GenericFormField
                                                        formLabel="Synopsis"
                                                        field={field}
                                                        inputEle={
                                                            <Textarea
                                                                className="border focus-visible:ring-0"
                                                                rows={4}
                                                                placeholder="Write a brief synopsis of the blog post"
                                                            />
                                                        }
                                                        cb={GenericFormInput}
                                                        divClass="relative"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <h2 className="mb-4 font-medium">Organization</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <FormField
                                                control={form.control}
                                                name="authorName"
                                                render={({ field }) => (
                                                    <GenericFormField
                                                        formLabel="Author Name"
                                                        field={field}
                                                        cb={GenericFormInput}
                                                        inputEle={<Input type="text" placeholder="" />}
                                                        divClass="relative"
                                                        itemClass="w-full"
                                                        labelClass="text-md"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between pb-2">
                                        <h2 className="mb-4 font-medium">Tags</h2>
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                const tags = form.getValues("tags");
                                                form.setValue("tags", [...tags, ""]);
                                            }}
                                        >
                                            Add Tag
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        {form.watch("tags").map((tag, index) => (
                                            <div key={index} className="flex gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name={`tags.${index}`}
                                                    render={({ field }) => (
                                                        <GenericFormField
                                                            formLabel=""
                                                            field={field}
                                                            inputEle={
                                                                <Input
                                                                    type="text"
                                                                    placeholder="Enter tag"
                                                                    {...field}
                                                                />
                                                            }
                                                            cb={GenericFormInput}
                                                            divClass="relative"
                                                            itemClass="w-full"
                                                            labelClass="text-md"
                                                        />
                                                    )}
                                                />
                                                <Button
                                                    variant="ghost"
                                                    type="button"
                                                    onClick={() => {
                                                        const tags = form.getValues("tags");
                                                        form.setValue(
                                                            "tags",
                                                            tags.filter((_, i) => i !== index),
                                                        );
                                                    }}
                                                >
                                                    <Trash2 />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </form>
        </Form >
    );
};

export default BlogForm;

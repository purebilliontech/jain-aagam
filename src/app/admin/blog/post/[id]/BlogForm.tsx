"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Loader2, X } from "lucide-react";
import { Form, FormField } from "@/components/ui/form";
import { useForm, type Resolver } from "react-hook-form";
import {
    GenericFormField,
    GenericFormImageInput,
    GenericFormInput,
    GenericRadioGroup,
} from "@/components/generic/GenericFormComponents";
import { RichTextArea } from "@/components/generic/RichTextArea";
import slugify from "slugify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BlogFormSchema, type BlogDetail, type BlogForm } from "@/schema/blog";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBlogPost, updateBlogPostById, getTagsList } from "./actions";
import { getHTMLFromContentJson } from "@/utils/blog-client";
import { useAuth } from "@/context/auth-context";
import { useEffect } from "react";
import type { BlogTagsDTO } from "@/schema/blogTag";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type BlogPostEditorProps = {
    blog: BlogDetail | null;
    tags: BlogTagsDTO[];
};

const BlogForm = ({ blog, tags }: BlogPostEditorProps) => {
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
            tags: blog?.blogToTags.map((tag) => tag.tagId) || [],
            banner: blog?.banner || undefined,
            published: blog?.published || false,
        },
    });

    const saveBlog = async (formData: BlogForm) => {
        setLoading(true);
        try {
            const contentJsonString = JSON.stringify(formData.contentJson);
            if (blog) {
                const result = await updateBlogPostById(blog.id, formData, contentJsonString);
                if (result.success) {
                    toast.success("Blog Updated Successfully");
                } else {
                    toast.error("Failed to Update Blog");
                }
            } else {
                const result = await createBlogPost(formData, contentJsonString);
                if (result.success && result.data) {
                    toast.success("Blog Created Successfully");
                    router.replace(`/admin/blog/post/${result.data.id}`);
                } else {
                    toast.error("Failed to Create Blog");
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while saving");
        } finally {
            setLoading(false);
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
                            {hasPermissions(["modify:blog"]) &&
                                <Button
                                    type="submit"
                                    variant={loading ? "outline" : "default"}
                                    className="px-10"
                                    disabled={loading}
                                >
                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {loading ? "Saving" : "Save Blog"}
                                </Button>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="space-y-6 md:col-span-2">
                            <Card>
                                <CardContent className="pt-6 ">
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
                                                divClass="relative mb-5"
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
                                                    console.log(contentJson);
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
                                        <div>
                                            <FormField
                                                control={form.control}
                                                name="readingTimeSeconds"
                                                render={({ field }) => (
                                                    <GenericFormField
                                                        formLabel="Reading Time (seconds)"
                                                        field={{
                                                            ...field,
                                                            value: field.value || 0,
                                                            onChange: (e) => field.onChange(Number(e.target.value))
                                                        }}
                                                        cb={GenericFormInput}
                                                        inputEle={<Input type="number" min="0" />}
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
                                    <h2 className="mb-4 font-medium">Tags</h2>

                                    <div className="form-item mb-3">
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
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default BlogForm;
import React from 'react'
import { getBlogPostById, getCategoriesList } from './actions';
import { notFound } from 'next/navigation';
import { BlogFormSchema } from '@/schema/blog';
import BlogForm from './BlogForm';
import { authorizeUser } from '@/lib/auth';
import NoPermission from '@/components/common/NoPermission';

const BlogIndexPage = async ({ params }: {
    params: Promise<{
        id: string;
    }>;
}) => {

    const user = await authorizeUser(["view:blog"]);

    if (!user.success) {
        return (
            <NoPermission message={user.message} />
        );
    }

    const { id } = await params;

    const { success, data: blog } = await getBlogPostById(id);

    const { data: categories } = await getCategoriesList();

    // If not creating a new category and category wasn't found
    if (id !== "new" && !success) {
        return notFound();
    }
    return (
        <>
            <BlogForm blog={blog} categories={categories} />
        </>
    )
}

export default BlogIndexPage
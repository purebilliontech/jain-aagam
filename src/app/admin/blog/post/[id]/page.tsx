import React from 'react'
import { getBlogPostById } from './actions';
import { notFound } from 'next/navigation';
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

    // If not creating a new blog post and the post wasn't found
    if (id !== "new" && !success) {
        return notFound();
    }
    
    return (
        <>
            <BlogForm blog={blog} />
        </>
    )
}

export default BlogIndexPage
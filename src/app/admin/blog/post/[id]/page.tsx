import React from 'react'
import { getBlogPostById, getTagsList } from './actions';
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

    if (id !== "new" && !success) {
        return notFound();
    }

    const { data: tags } = await getTagsList();


    return (
        <>
            <BlogForm tags={tags} blog={blog} />
        </>
    )
}

export default BlogIndexPage
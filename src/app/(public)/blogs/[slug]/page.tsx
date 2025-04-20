import React from 'react'
import BlogDetailPage from './BlogDetailPage';
import { getBlogBySlug } from './actions';

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {

    const { slug } = await params;

    const blog = await getBlogBySlug(slug);

    if (!blog.success && !blog.data) {
        return <div>Blog Not Found</div>;
    }

    return (
        <BlogDetailPage blog={blog.data?.blog!} mediaList={blog.data?.mediaList!} />
    )
}

export default Page;
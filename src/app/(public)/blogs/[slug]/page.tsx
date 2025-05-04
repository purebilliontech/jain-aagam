import React from 'react'
import BlogDetailPage from './BlogDetailPage';
import { getBlogBySlug } from './actions';

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {

    const { slug } = await params;

    const blog = await getBlogBySlug(slug);

    if (!blog.success || !blog.data) {
        return <div>Blog Not Found</div>;
    }

    const { blog: blogData, mediaList } = blog.data;

    if (!blogData || !mediaList) {
        return <div>Blog Data Incomplete</div>;
    }

    return (
        <BlogDetailPage blog={blogData} mediaList={mediaList} />
    )
}

export default Page;
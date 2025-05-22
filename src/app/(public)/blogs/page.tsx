export const revalidate = 60;

import React from 'react'
import BlogsListPage from './BlogsListPage'
import { getBlogsList, getAllBlogTags } from './actions';

const Page = async () => {

    const blogs = await getBlogsList();
    const tags = await getAllBlogTags();

    if (!blogs.success || !tags.success) {
        return <div>Failed to fetch blogs or tags</div>;
    }

    return (
        <BlogsListPage blogs={blogs.data} tags={tags.data} pagination={blogs.pagination} />
    )
}

export default Page
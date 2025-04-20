import React from 'react'
import BlogsListPage from './BlogsListPage'
import { getBlogsList } from './actions';

const Page = async () => {

    const blogs = await getBlogsList();

    if (!blogs.success) {
        return <div>Failed to fetch blogs</div>;
    }

    return (
        <BlogsListPage blogs={blogs.data} />
    )
}

export default Page
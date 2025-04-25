import React from 'react'
import BlogsListPage from './BlogsListPage'
import { getBlogsList } from './actions';

const Page = async () => {

    const blogs = await getBlogsList();
    console.log('This is blogs',blogs)

    if (!blogs.success) {
        return <div>Failed to fetch blogs</div>;
    }

    return (
        <BlogsListPage blogs={blogs.data} />
    )
}

export default Page
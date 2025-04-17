import React from 'react'
import { getBlogPostById, getCategoriesList } from './actions';
import { notFound } from 'next/navigation';
import { BlogFormSchema } from '@/schema/blog';
import BlogForm from './BlogForm';

const BlogIndexPage = async ({ params }: { params: { id: string } }) => {

    const { id } = params;

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
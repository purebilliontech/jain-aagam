import BlogCard from '@/components/blog/BlogCard'
import FEButton from '@/components/common/FEButton'
import SectionTitle from '@/components/common/SectionTitle'
import type { BlogWithTagsAndBanner } from '@/schema/blog'
import Link from 'next/link'
import React from 'react'

const AgamWisdom = ({ blogs }: { blogs: BlogWithTagsAndBanner[] }) => {
    return (
        <section className='mt-32 mb-20 max-w-7xl w-full mx-auto p-5'>
            <SectionTitle title='Agam Wisdom' subtitle='BLOGS & VIDEOS' />
            <div className="flex flex-wrap justify-center mt-24 ">
                {blogs.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        slug={blog.slug}
                        title={blog.title}
                        date={blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : new Date(blog.createdAt).toLocaleDateString()}
                        tags={blog.blogToTags.map(tag => tag.tag.name)}
                        image={blog.banner}
                    />
                ))}
            </div>
            <div className="flex justify-center">
                <Link href={'/blogs'}>
                    <FEButton className='text-center mx-auto mt-20'>READ MORE</FEButton>
                </Link>
            </div>

        </section>
    )
}

export default AgamWisdom
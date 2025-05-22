import BlogCard from '@/components/blog/BlogCard'
import FEButton from '@/components/common/FEButton'
import SectionTitle from '@/components/common/SectionTitle'
import YTVideoPlayer from '@/components/common/YTVideoPlayer'
import type { BlogWithTagsAndBanner } from '@/schema/blog'
import { FrontendPlaylistDTO } from '@/schema/frontendPlaylist'
import Link from 'next/link'
import React from 'react'

const AgamWisdom = ({ blogs, videos }: { blogs: BlogWithTagsAndBanner[], videos: FrontendPlaylistDTO | null }) => {
    return (
        <section className='mt-32 mb-20 max-w-7xl w-full mx-auto p-5'>
            <SectionTitle title='Agam Wisdom' subtitle='BLOGS & VIDOS' />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-24 ">
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


            {videos && videos.videos && (
                <div className="justify-center mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {videos.videos.map((video) => (
                        <YTVideoPlayer className='w-full rounded-lg overflow-hidden' key={video} videoUrl={video} />
                    ))}
                </div>
            )}

        </section>
    )
}

export default AgamWisdom
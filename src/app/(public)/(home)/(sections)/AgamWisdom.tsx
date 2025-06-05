import BlogCard from '@/components/blog/BlogCard'
import FEButton from '@/components/common/FEButton'
import SectionTitle from '@/components/common/SectionTitle'
import YTVideoPlayer from '@/components/common/YTVideoPlayer'
import type { BlogWithTagsAndBanner } from '@/schema/blog'
import { FrontendPlaylistDTO } from '@/schema/frontendPlaylist'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'

const AgamWisdom = ({ blogs, videos }: { blogs: BlogWithTagsAndBanner[], videos: FrontendPlaylistDTO | null }) => {
    return (
        <section className=' py-10 pt-20 max-w-7xl w-full mx-auto p-5'>
            <SectionTitle title='Aagam Wisdom' subtitle='BLOGS & VIDEOS' className='pb-10' />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {blogs.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        slug={blog.slug}
                        title={blog.title}
                        date={moment(blog.publishedAt).format("LL")}
                        tags={blog.blogToTags.map(tag => tag.tag.name)}
                        image={blog.banner}
                    />
                ))}
            </div>
            <div className="flex justify-center">
                <Link href={'/blogs'}>
                    <FEButton className='text-center mx-auto mt-14'>READ MORE</FEButton>
                </Link>
            </div>
            {videos && videos.videos && (
                <div className="justify-center pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {videos.videos.map((video) => (
                        <YTVideoPlayer className='w-full rounded-lg overflow-hidden' key={video} videoUrl={video} />
                    ))}
                </div>
            )}
            <div className="flex justify-center">
                <Link href={'/videos'}>
                    <FEButton className='text-center mx-auto mt-14'>VIEW MORE</FEButton>
                </Link>
            </div>
        </section>
    )
}

export default AgamWisdom
import type { MediaDTO } from '@/schema/media'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogCard = ({ title, date, tags, image, slug }: { title: string, date: string, tags: string[], image?: MediaDTO, slug: string }) => {
    return (
        <>
            <Link href={`/blogs/${slug}`} className="w-full h-full ">
                <div className="flex flex-col h-full overflow-hidden bg-card-ui md:rounded-4xl rounded-2xl">
                    {image ?
                        <Image src={image.url} className='h-52 object-cover' width={600} height={500} alt={image.alt} />
                        : <Image src={'/static/placeholder.png'} className='h-52 object-cover' width={600} height={500} alt='Image for presentation' />}
                    <div className="md:p-8 p-5">
                        <h3 className='font-mono text-2xl font-semibold italic !text-[#686151] ' >
                            {title}
                        </h3>
                        <p className='font-mono text-lg font-semibold mt-2 text-[#8E8777] italic'>
                            {new Date(date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 md:px-8 px-5 pb-8">
                        {tags.map((tag, index) => (
                            <span key={index} className="inline-block bg-primary-ui md:px-4 px-2 md:py-1.5 py-1  text-white rounded-full text-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>
        </>
    )
}

export default BlogCard
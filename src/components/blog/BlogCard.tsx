import type { MediaDTO } from '@/schema/media'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Typography from '../common/typography'

const BlogCard = ({ title, date, tags, image, slug }: { title: string, date: string, tags: string[], image?: MediaDTO, slug: string }) => {
    return (
        <>
            <Link href={`/blogs/${slug}`} className="w-full h-full ">
                <div className="flex flex-col h-full overflow-hidden bg-card-ui md:rounded-4xl rounded-2xl">
                    {image ?
                        <Image src={image.url} className='h-52 object-cover' width={600} height={500} alt={image.alt} />
                        : <Image src={'/static/placeholder.png'} className='h-52 object-cover' width={600} height={500} alt='Image for presentation' />}
                    <div className="md:p-8 p-5">
                        <Typography variant='h4' className='font-mono font-semibold italic ' >
                            {title}
                        </Typography>
                        <Typography variant='p' className='font-mono font-semibold mt-2 text-typography italic'>{date}</Typography>
                    </div>
                    <div className="flex flex-wrap gap-2 md:px-8 px-5 pb-8">
                        {tags.map((tag, index) => (
                            <span key={index} className="inline-block bg-primary-ui md:px-5 px-3 md:py-1.5 py-1  text-white rounded-full">
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
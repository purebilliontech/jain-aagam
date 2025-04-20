import type { MediaDTO } from '@/schema/media'
import Image from 'next/image'
import React from 'react'

const BlogCard = ({ title, date, tags, image }: { title: string, date: string, tags: string[], image?: MediaDTO }) => {
    return (
        <>
            <div className="md:w-1/3 p-5">
                <div className="flex flex-col overflow-hidden bg-card-ui md:rounded-4xl rounded-2xl">
                    {image ?
                        <Image src={image.url} className='h-52 object-cover' width={600} height={500} alt={image.alt} />
                        : <Image src={'/static/placeholder.png'} className='h-52 object-cover' width={600} height={500} alt='Image for presentation' />}
                    <div className="md:p-8 p-5">
                        <h3 className='font-mono font-semibold italic text-2xl text-typography' >
                            {title}
                        </h3>
                        <p className='font-mono font-semibold text-xl mt-4 italic'>{date}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 md:px-8 px-5 pb-8">
                        {tags.map((tag, index) => (
                            <span key={index} className="inline-block bg-primary-ui md:px-7 px-5 md:py-2 py-1.5 md:text-lg font-medium text-white  rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogCard
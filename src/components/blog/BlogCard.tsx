import Image from 'next/image'
import React from 'react'

const BlogCard = ({ title, date, tags }: { title: string, date: string, tags: string[] }) => {
    return (
        <>
            <div className="md:w-1/3 p-5">
                <div className="flex flex-col overflow-hidden bg-card rounded-4xl">
                    <Image src={'/static/placeholder.png'} className='h-52 object-cover' width={600} height={500} alt='Image for presentation' />
                    <div className="p-8">
                        <h3 className='font-mono font-semibold italic text-2xl text-typography' >
                            {title}
                        </h3>
                        <p className='font-mono font-semibold text-xl mt-4 italic'>{date}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 px-8 pb-8">
                        {tags.map((tag, index) => (
                            <span key={index} className="inline-block bg-primary px-7 py-2 text-lg font-medium text-white  rounded-full">
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
import BlogCard from '@/components/blog/BlogCard'
import { Search } from 'lucide-react'
import React from 'react'


const tags = ['Happiness', 'Jain Agam', 'Jainism']

const BlogsListPage = () => {
    return (
        <>
            <div className="bg-[#E9E2D2] w-full h-96">
                <h1 className='p-20 text-6xl'>ARTICLES</h1>
            </div>

            <div className="max-w-7xl mx-auto flex p-5 mt-10">


                <div className="md:w-2/3 flex flex-wrap gap-2 px-8 pb-8">
                    {tags.map((tag, index) => (
                        <span key={index} className="inline-block bg-primary-ui px-7 py-2 text-lg font-medium text-white  rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="md:w-1/3">

                    <div className="flex border-b border-primary-ui ">
                        <Search className='text-primary-ui' />
                        <input className='w-full  border-none outline-none px-2 pb-1 text-lg' />
                    </div>
                </div>

            </div>

            <div className="flex flex-wrap max-w-7xl mx-auto p-5 space-y-16">
                <BlogCard date='' tags={['Happiness', 'Wellness']} title='Title space for as long as 2 lines' />
                <BlogCard date='' tags={['Happiness', 'Wellness']} title='Title space for as long as 2 lines' />
                <BlogCard date='' tags={['Happiness', 'Wellness']} title='Title space for as long as 2 lines' />
                <BlogCard date='' tags={['Happiness', 'Wellness']} title='Title space for as long as 2 lines' />
                <BlogCard date='' tags={['Happiness', 'Wellness']} title='Title space for as long as 2 lines' />
                <BlogCard date='' tags={['Happiness', 'Wellness']} title='Title space for as long as 2 lines' />

            </div>


        </>
    )
}

export default BlogsListPage
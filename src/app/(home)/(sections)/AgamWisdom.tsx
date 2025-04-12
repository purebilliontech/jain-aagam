import BlogCard from '@/components/blog/BlogCard'
import FEButton from '@/components/common/FEButton'
import SectionTitle from '@/components/common/SectionTitle'
import React from 'react'

const AgamWisdom = () => {
    return (
        <section className='mt-32 mb-20 max-w-7xl w-full mx-auto p-5'>
            <SectionTitle title='Agam Wisdom' subtitle='BLOGS & VIDEOS' />
            <div className="flex flex-wrap justify-center mt-24 ">
                <BlogCard title='Title space for as long as 2 lines' date='4th April, 2025' tags={['Happiness', 'Wellness']} />
                <BlogCard title='Title space for as long as 2 lines' date='4th April, 2025' tags={['Happiness', 'Wellness']} />
                <BlogCard title='Title space for as long as 2 lines' date='4th April, 2025' tags={['Happiness', 'Wellness']} />
                <BlogCard title='Title space for as long as 2 lines' date='4th April, 2025' tags={['Happiness', 'Wellness']} />
            </div>
            <div className="flex justify-center">
                <FEButton className='text-center mx-auto mt-20'>READ MORE</FEButton>
            </div>

        </section>
    )
}

export default AgamWisdom
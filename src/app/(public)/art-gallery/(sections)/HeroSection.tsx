import SectionTitle from '@/components/common/SectionTitle'
import Typography from '@/components/common/typography'
import YTVideoPlayer from '@/components/common/YTVideoPlayer'
import React from 'react'

export default function HeroSection() {
    return (
        <>
            <div className='max-w-7xl mx-auto p-5 py-10 pt-20'>
                <SectionTitle title='Aaradhya Art Gallery' subtitle=' BRINGING JAIN LITERATURE TO LIFE ' className='pb-10' />

                <Typography variant='p' className='text-justify  text-typography'>Aaradhya Art Gallery is an exquisite collection of paintings and artwork that depict inspiring and heart-touching stories from the glorious history of Jainism. Every painting has been exclusively created by renowned artists to bring to life moments that can transform our mindset and change our destiny. Inspired by Param Gurudev Shree Namramuni Maharaj Saheb, the Aaradhya Art Gallery presents 108 paintings that aim to take forward the legacy of Jain culture, literature and philosophy through stunning artwork that speak a thousand words and awaken the profound wisdom of the Jain Aagam Scriptures as revealed by Bhagwan Mahavir. </Typography>

                <YTVideoPlayer videoUrl='https://www.youtube.com/watch?v=qJUuaDaDA90' className='my-10 rounded-lg overflow-hidden max-w-5xl mx-auto' />

            </div>
        </>
    )
}

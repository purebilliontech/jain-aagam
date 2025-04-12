import FEButton from '@/components/common/FEButton'
import Image from 'next/image'
import React from 'react'

const EnglishAgam = () => {
    return (
        <section className='relative h-full px-48 py-32'>
            <Image className='-z-10 absolute top-0 left-0 inset-0 object-cover object-center' src={'/static/english-agam-bg.png'} fill alt='Agams BG' />
            <div className='z-50 bg-[#E9E2D2ED] p-14 max-w-7xl mx-auto rounded-4xl flex flex-col md:flex-row gap-10'>
                <div className="w-1/3">
                    <Image src={'/static/red-book.png'} width={500} height={1000} alt='Red Book' className='mx-auto' />
                </div>
                <div className="w-2/3 pt-3">
                    <h3 className='text-typography font-semibold font-mono text-4xl'>Launching ENGLISH Aagams</h3>
                    <p className='text-typography text-2xl mt-5 mb-12'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi dolores officia saepe illo suscipit, libero ut quod quibusdam at ratione animi cumque id doloribus autem labore deleniti ad voluptate neque sint laudantium est veniam ipsam error. Nulla, fugit, libero omnis inventore non cumque natus ab soluta placeat ex magni expedita.</p>
                    <FEButton>BOOK NOW</FEButton>
                </div>
            </div>

        </section>
    )
}

export default EnglishAgam
import FEButton from '@/components/common/FEButton'
import Image from 'next/image'
import React from 'react'

const EnglishAgam = () => {
    return (
        <section className='relative h-full px-5 py-10 md:px-10 lg:px-20 xl:px-48'>
            <Image className='-z-10 absolute top-0 left-0 inset-0 object-cover object-center' src={'/static/english-agam-bg.png'} fill alt='Agams BG' />

            <div className='z-50 bg-[#E9E2D2ED] p-5 md:p-10 lg:p-14 max-w-7xl mx-auto rounded-4xl flex flex-col md:flex-row gap-5 md:gap-10'>
                <div className="w-full pt-2 md:pt-0 md:w-1/3 flex justify-center">
                    <Image src={'/static/red-book.png'} width={300} height={600} alt='Red Book' className='mx-auto' />
                </div>
                <div className="w-full md:w-2/3 pt-3">
                    <h3 className='text-typography font-semibold font-mono text-2xl md:text-3xl lg:text-4xl text-center md:text-left'>Launching ENGLISH Aagams</h3>
                    <p className='text-typography text-lg md:text-xl lg:text-2xl mt-5 mb-8 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi dolores officia saepe illo suscipit, libero ut quod quibusdam at ratione animi cumque id doloribus autem labore deleniti ad voluptate neque sint laudantium est veniam ipsam error. Nulla, fugit, libero omnis inventore non cumque natus ab soluta placeat ex magni expedita.</p>
                    <div className="flex justify-center md:justify-start">
                        <FEButton>BOOK NOW</FEButton>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EnglishAgam
import SectionTitle from '@/components/common/SectionTitle'
import Image from 'next/image'
import React from 'react'

const WhatAreAgams = () => {
    return (
        <>
            <section className='max-w-7xl mx-auto p-5'>
                <SectionTitle title='What are Aagams?' subtitle='THE TIMELESS WISDOM' />

                <div className="flex flex-col md:flex-row items-center gap-16 mt-20 mb-20">

                    <div className="md:w-1/2">
                        <Image src={'/static/placeholder.png'} width={500} height={500} alt='Image for presentation' />
                    </div>
                    <div className="md:w-1/2">

                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga libero molestias aperiam inventore dolorem ad deserunt sequi maiores, natus corporis tempore ea ducimus sit cumque. Exercitationem laudantium itaque velit nam maxime explicabo reiciendis, nesciunt beatae animi? Architecto autem dicta, maiores nihil, repudiandae ratione quaerat deserunt nesciunt nisi quam minima corporis!</p>
                    </div>

                </div>

                <Image src={'/static/tree.png'} width={2000} height={1000} alt='Image for presentation' className='mx-auto mt-20' />
            </section>
        </>
    )
}

export default WhatAreAgams
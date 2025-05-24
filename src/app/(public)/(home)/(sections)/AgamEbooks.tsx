"use client"

import FEButton from '@/components/common/FEButton'
import SectionTitle from '@/components/common/SectionTitle'
import Image from 'next/image'
import React, { useState } from 'react'

const AgamEbooks = () => {
    const [expanded, setExpanded] = useState(false)

    return (
        <>
            <section className='md:mt-32 mt-10 mb-20 max-w-7xl w-full mx-auto p-5'>
                <SectionTitle title='Agam eBooks' subtitle='EXPLORE' />

                {/* Responsive grid layout */}
                <div className="md:mt-24 mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-6 md:gap-8 lg:gap-10">
                    {Array.from({ length: expanded ? 34 : 8 }).map((_, index) => (
                        <Image
                            src={`/static/ebooks/ebook-${index}.jpg`}
                            key={index}
                            alt="Agam Ebooks"
                            width={300}
                            height={300}
                            className='w-full h-auto rounded-lg object-contain border border-gray-200'
                        />
                    ))}

                </div>

                <div className="flex justify-center">
                    <FEButton
                        className='text-center mx-auto mt-12 sm:mt-16 md:mt-20'
                        onClick={() => {
                            setExpanded(!expanded)
                            if (expanded) {
                                window.scrollTo({
                                    top: 3000,
                                    behavior: 'smooth'
                                })
                            }
                        }}>
                        {expanded ? "SHOW LESS" : "EXPLORE ALL"}
                    </FEButton>
                </div>
            </section>
        </>
    )
}

export default AgamEbooks
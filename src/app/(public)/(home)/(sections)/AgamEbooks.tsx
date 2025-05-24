"use client"

import FEButton from '@/components/common/FEButton'
import SectionTitle from '@/components/common/SectionTitle'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Document, Page } from 'react-pdf'


const ebooks = [
    {
        image: '/static/ebooks/ebook-0.jpg',
        pdf: '/ebooks/shree-acharang-sutra-part-2.pdf',
    },
    {
        image: '/static/ebooks/ebook-1.jpg',
        pdf: '/ebooks/shree-antagad-sutra.pdf',
    },
    {
        image: '/static/ebooks/ebook-2.jpg',
        pdf: '/ebooks/shree-anuttarovavai-sutra.pdf',
    },
    {
        image: '/static/ebooks/ebook-3.jpg',
        pdf: '/ebooks/shree-anuyogdwar-sutra.pdf',
    },
    {
        image: '/static/ebooks/ebook-4.jpg',
        pdf: '/ebooks/shree-avashyak-sutra.pdf',
    },
    {
        image: '/static/ebooks/ebook-5.jpg',
        pdf: '/ebooks/shree-bhagwati-sutra-part-1.pdf',
    },
    {
        image: '/static/ebooks/ebook-6.jpg',
        pdf: '/ebooks/shree-bhagwati-sutra-part-2.pdf',
    },
    {
        image: '/static/ebooks/ebook-7.jpg',
        pdf: '/ebooks/shree-bhagwati-sutra-part-3.pdf',
    },
    {
        image: '/static/ebooks/ebook-8.jpg',
        pdf: '/ebooks/shree-bhagwati-sutra-part-4.pdf',
    },
    {
        image: '/static/ebooks/ebook-9.jpg',
        pdf: '/ebooks/shree-bhagwati-sutra-part-5.pdf',
    },
    {
        image: '/static/ebooks/ebook-10.jpg',
        pdf: '/ebooks/shree-chandra-surya-pragnapti-sutra.pdf',
    },
    {
        image: '/static/ebooks/ebook-11.jpg',
        pdf: '/ebooks/shree-dashvaikalik-sutra.pdf',
    },
    {
        image: '/static/ebooks/ebook-12.jpg',
        pdf: '/ebooks/shree-gnatadharmakatha-sutra.pdf',
    },
    {
        image: '/static/ebooks/ebook-13.jpg',
        pdf: '/ebooks/shree-jambudweep-pragnapti-sutra.pdf',
    },
    {
        image: '/static/ebooks/ebook-14.jpg',
        pdf: '/ebooks/shree-jivajivabhigam-sutra.pdf',
    },
    {
        image: '/static/ebooks/ebook-15.jpg',
        pdf: '/ebooks/shree-nandi-sutra.pdf',
    },
    {
        image: '/static/ebooks/ebook-16.jpg',
        pdf: '/ebooks/shree-nishith-sutra.pdf',
    },
    {
        image: '/static/ebooks/ebook-17.jpg',
        pdf: '/ebooks/shree-pannavana-sutra-part-1.pdf',
    },
    {
        image: '/static/ebooks/ebook-18.jpg',
        pdf: '/ebooks/shree-pannavana-sutra-part-2.pdf',
    },
    {
        image: '/static/ebooks/ebook-19.jpg',
        pdf: '/ebooks/shree-pannavana-sutra-part-3.pdf',
    },
    {
        image: '/static/ebooks/ebook-20.jpg',
        pdf: '/ebooks/shree-prashnavyakaran-sutra.pdf',
    },
    {
        image: '/static/ebooks/ebook-21.jpg',
        pdf: '/ebooks/shree-raipaseniya-sutra.pdf',
    },
    {
        image: '/static/ebooks/ebook-22.jpg',
        pdf: '/ebooks/shree-samavayang-sutra.pdf',
    },
    {
        image: '/static/ebooks/ebook-23.jpg',
        pdf: '/ebooks/shree-suyagadang-sutra-part-1.pdf',
    },
    {
        image: '/static/ebooks/ebook-24.jpg',
        pdf: '/ebooks/shree-suyagadang-sutra-part-2.pdf',
    },
    {
        image: '/static/ebooks/ebook-25.jpg',
        pdf: '/ebooks/shree-thanang-sutra-part-1.pdf',
    },
    {
        image: '/static/ebooks/ebook-26.jpg',
        pdf: '/ebooks/shree-thanang-sutra-part-2.pdf',
    },
    {
        image: '/static/ebooks/ebook-27.jpg',
        pdf: '/ebooks/shree-tran-chhed-sutra.pdf',
    },
    {
        image: '/static/ebooks/ebook-28.jpg',
        pdf: '/ebooks/shree-upang-sutra.pdf',
    },
    {
        image: '/static/ebooks/ebook-29.jpg',
        pdf: '/ebooks/shree-upasakdashang-sutra.pdf',
    },
    {
        image: '/static/ebooks/ebook-30.jpg',
        pdf: '/ebooks/shree-uttaradhyayan-sutra-part-1.pdf',
    },
    {
        image: '/static/ebooks/ebook-31.jpg',
        pdf: '/ebooks/shree-uttaradhyayan-sutra-part-2.pdf',
    },
    {
        image: '/static/ebooks/ebook-32.jpg',
        pdf: '/ebooks/shree-uvavai-sutra.pdf',
    },
    {
        image: '/static/ebooks/ebook-33.jpg',
        pdf: '/ebooks/shree-vipak-sutra.pdf',
    },


]

const AgamEbooks = () => {
    const [expanded, setExpanded] = useState(false);

    const [openEbook, setOpenEbook] = useState<string | null>(null);


    return (
        <>
            <section className='md:mt-32 mt-10 mb-20 max-w-7xl w-full mx-auto p-5'>
                <SectionTitle title='Agam eBooks' subtitle='EXPLORE' />

                {/* Responsive grid layout */}
                <div className="md:mt-24 mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-6 md:gap-8 lg:gap-10">
                    {ebooks.slice(0, expanded ? ebooks.length : 8).map((ebook, index) => (
                        <div key={index}>
                            <Link href={ebook.pdf} target='_blank'>
                                <Image
                                    src={ebook.image}
                                    key={index}
                                    alt="Agam Ebooks"
                                    width={300}
                                    height={300}
                                    onClick={() => setOpenEbook(ebook.pdf)}
                                    className='w-full h-auto rounded-lg object-contain border border-gray-200'
                                />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* {openEbook && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                        <div className='bg-white p-4 rounded-lg'>
                            <Document file={openEbook} >
                                <Page pageNumber={1} />
                            </Document>
                        </div>
                    </div>
                )} */}


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
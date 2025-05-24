import Typography from '@/components/common/typography'
import Image from 'next/image'
import React from 'react'

export default function ShowcaseImage() {
    return (
        <div className="p-5">

            <div className="max-w-7xl mx-auto relative my-10">

                <Image src='/static/art/horizontal2.png' alt='Showcase' width={1000} height={1000} className=' object-contain w-full h-full rounded-xl' />

                <div className="w-full h-full flex absolute top-0 left-0 z-50 bg-black/55 rounded-2xl">
                    <div className="w-1/3 p-1 border-r-4 border-white flex items-center justify-end">
                        <Typography variant='h3' className='max-sm:text-sm md:!text-5xl  text-[#E9E2D2] text-right'>
                            <span className='italic font-medium md:mr-3'>
                                Historic
                            </span>
                            <br />
                            <span className=' font-bold'>
                                Art.
                            </span>
                        </Typography>
                    </div>
                    <div className="w-1/3 md:p-5 p-2 border-l-4 border-white border-r-4 flex items-center justify-end">
                        <Typography variant='h3' className='max-sm:text-sm md:!text-5xl  text-[#E9E2D2] text-right'>
                            <span className='italic font-medium md:mr-3'>
                                Compelling
                            </span>
                            <br />
                            <span className=' font-bold'>
                                Art.
                            </span>
                        </Typography>
                    </div>
                    <div className="w-1/3 md:p-5 p-2 border-l-4 border-white flex items-center justify-end">
                        <Typography variant='h3' className='max-sm:text-sm md:!text-5xl  text-[#E9E2D2] text-right'>
                            <span className='italic font-medium md:mr-3'>
                                Eye-opening

                            </span>
                            <br />
                            <span className=' font-bold'>
                                Masterpieces.
                            </span>
                        </Typography>
                    </div>
                </div>
            </div>
        </div>


    )
}

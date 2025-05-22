import Typography from '@/components/common/typography'
import Image from 'next/image'
import React from 'react'

export default function ShowcaseImage() {
    return (
        <div className="p-5">

            <div className="max-w-7xl mx-auto relative my-10">

                <Image src='/static/art/horizontal.png' alt='Showcase' width={500} height={500} className=' object-contain w-full h-full rounded-xl' />

                <div className="w-full h-full flex absolute top-0 left-0 z-50 bg-black/35 rounded-2xl">
                    <div className="w-1/3 md:p-5 p-2 border-r-4 border-white flex items-center justify-end">
                        <Typography variant='h3' className='max-sm:text-sm text-white text-right'>
                            Historic
                            Art.
                        </Typography>
                    </div>
                    <div className="w-1/3 md:p-5 p-2 border-l-4 border-white border-r-4 flex items-center justify-end">
                        <Typography variant='h3' className='max-sm:text-sm text-white text-right'>
                            Compelling Art.
                        </Typography>
                    </div>
                    <div className="w-1/3 md:p-5 p-2 border-l-4 border-white flex items-center justify-end">
                        <Typography variant='h3' className='max-sm:text-sm text-white text-right'>
                            Eye-opening Masterpieces.
                        </Typography>
                    </div>
                </div>
            </div>
        </div>


    )
}

import Typography from '@/components/common/typography'
import Image from 'next/image'
import React from 'react'


const TreeMarker = ({ className, title, subtitle }: { className: string, title: string, subtitle: string }) => {
    return (
        <div className={`absolute group ${className}`}>
            <div className="bg-[#E3DFD5] sm:w-16 sm:h-16 w-12 h-12 p-2 text-center flex justify-center items-center rounded-full">
                <Typography variant='h4' className='!sm:text-sm !text-xs leading-tight w-full italic text-typography'>{title}</Typography>
            </div>
            <div className="absolute -top-5 border-l-8 border-typography left-16 md:left-44 sm:left-36 sm:pl-3 p-1 md:min-w-52 w-28 sm:min-w-40 group-hover:opacity-100 opacity-0 transition-opacity duration-300 ">
                <Typography variant='h4' className='w-full italic text-typography max-sm:text-sm'>{title}</Typography>
                <Typography variant='p' className='!sm:text-base w-full font-mono  italic text-typography/70 !text-xs leading-none'>{subtitle}</Typography>
            </div>
        </div>
    )
}


export default function AgamTree() {
    return (
        <>
            <div className="max-w-7xl mx-auto relative my-20 md:h-screen">
                <Image src={'/static/home/tree.png'} alt='Jain Agam Map' className='w-full h-full object-contain max-sm:p-5' width={2000} height={1000} />

                <TreeMarker className='top-[30%] left-[50%]' title="Upang Agam" subtitle='The core texts like the trunk of a tree' />
                <TreeMarker className='sm:top-[50%] top-[47%] left-[48%]' title="Ang Agam" subtitle='The core texts like the trunk of a tree' />
                <TreeMarker className='sm:top-[70%] top-[67%] left-[50%]' title="Mul Agam" subtitle='The roots or fundamental basics' />

            </div>
        </>
    )
}

"use client"

import Typography from '@/components/common/typography'
import Image from 'next/image'
import React, { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TreeMarker = ({ className, title, subtitle, number }: { className: string, title: string, subtitle: string, number: number }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 1
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div ref={ref} className={`absolute ${className}`}>
            <div className="bg-[#E3DFD5] sm:w-16 sm:h-16 w-14 h-14 p-2 text-center flex justify-center items-center rounded-full">
                <Typography variant='h4' className='!sm:text-sm !text-xs leading-tight w-full italic text-typography'>{title}</Typography>
            </div>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute -top-5 border-l-8 border-primary-ui bg-white/50 left-16 md:left-44 sm:left-36 sm:pl-3 p-1 md:min-w-52 w-28 sm:min-w-40"
                    >
                        <Typography variant='h4' className='w-full italic text-typography max-sm:text-sm'>{title}</Typography>
                        <Typography variant='p' className='!sm:text-base w-full font-mono italic text-typography/70 !text-xs leading-none'>{subtitle}</Typography>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function AgamTree() {
    return (
        <>
            <div className="max-w-7xl mx-auto relative my-20 md:h-screen">
                <Image src={'/static/home/tree.png'} alt='Jain Aagam Map' className='w-full h-full object-contain max-sm:p-5' width={2000} height={1000} />
                <TreeMarker className='top-[30%] left-[55%]' title="Upang Aagam" subtitle='Just like the branches and leaves form a part of the tree' number={3} />
                <TreeMarker className='sm:top-[50%] top-[53%] left-[48%]' title="Ang Aagam" subtitle='The core texts like the trunk of a tree' number={1} />
                <TreeMarker className='sm:top-[70%] top-[72%] left-[55%]' title="Mool Aagam" subtitle='The roots or fundamental basics' number={2} />
            </div>
        </>
    )
}

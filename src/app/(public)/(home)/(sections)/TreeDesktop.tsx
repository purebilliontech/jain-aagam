"use client"

import Typography from '@/components/common/typography'
import Image from 'next/image'
import React, { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TreeMarker = ({ className, title, subtitle, isLeft = true, lineClassName = '', number }: {
    lineClassName?: string,
    className: string,
    title: string,
    subtitle: string,
    isLeft: boolean,
    number: number
}) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                root: document.querySelector('.tree-container'),
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
            <div className={`flex items-center ${isLeft ? 'flex-row-reverse' : ''}`}>
                <div className="dot w-5 h-5 rounded-full bg-[#E3DFD5]"></div>
                <div className={`line h-1 w-20 bg-[#E3DFD5] ${lineClassName}`}></div>
                <div className="relative">
                    <div className="bg-[#E3DFD5] sm:w-20 sm:h-20 w-16 h-26 p-2 text-center flex justify-center items-center rounded-full">
                        <Typography variant='h4' className='leading-tight !text-lg w-full italic text-typography'>{title}</Typography>
                    </div>
                    <AnimatePresence>
                        {isVisible && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                className={`absolute min-w-40 -top-5 border-primary-ui px-2 bg-white/50 ${isLeft ? 'right-24 border-r-8' : 'left-24 border-l-8'}`}
                            >
                                <Typography variant='h4' className='w-full italic text-typography max-sm:text-sm'>{title}</Typography>
                                <Typography variant='p' className='!sm:text-base w-full font-mono italic text-typography/70 !text-xs leading-none'>{subtitle}</Typography>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default function AgamTree() {
    return (
        <>
            <div className="max-w-7xl mx-auto relative my-20 md:w-screen aspect-video">
                <Image src={'/static/home/tree.png'} alt='Jain Agam Map' className='w-full h-full object-contain max-sm:p-5' width={2000} height={1000} />

                <TreeMarker
                    className='top-[30%] left-[50%]'
                    title="Upang Aagam"
                    subtitle='Just like the branches and leaves form a part of the tree'
                    isLeft={false}
                    lineClassName='lg:w-60 md:w-28'
                    number={3}
                />

                <TreeMarker
                    className='sm:top-[50%] top-[47%] right-[49%]'
                    title="Ang Aagam"
                    subtitle='The core texts like the trunk of a tree'
                    isLeft={true}
                    lineClassName='lg:w-60 md:w-28'
                    number={1}
                />

                <TreeMarker
                    className='sm:top-[70%] top-[67%] left-[50%]'
                    title="Mool Aagam"
                    subtitle='The roots or fundamental basics'
                    isLeft={false}
                    lineClassName='lg:w-60 md:w-28'
                    number={2}
                />
            </div>
        </>
    )
}

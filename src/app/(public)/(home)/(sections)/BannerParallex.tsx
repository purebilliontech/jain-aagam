"use client";

import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import React from 'react'

const BannerParallex = () => {

    const ref = React.useRef(null);

    const { scrollY } = useScroll();
    const s = useTransform(scrollY, [0, 500], [1, 1.4]);

    // const book = useTransform(scrollY, [0, 500], [-30, 200]);

    const bottom = useTransform(scrollY, [0, 500], [-10, 100]);

    const mainScale = useTransform(scrollY, [0, 500], [1, 0.7]);


    return (
        <div ref={ref} className='h-screen max-md:h-[80vh] w-screen overflow-hidden relative' >
            <motion.div style={{ y: bottom }} className="absolute bottom-0 left-0 w-full">
                <Image src={'/static/layers/bottom.png'} alt='Banner' width={1000} height={1000} className='object-cover w-full z-50' />
            </motion.div>

            <motion.div style={{ scale: s }} className="absolute bottom-0 left-1/2 max-md:scale-150 max-md:bottom-10 -translate-x-1/2 w-full max-w-7xl px-20">
                <Image src={'/static/layers/book.png'} alt='Banner' width={1000} height={1000} className='object-cover w-full z-50' />
            </motion.div>


            <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}

                style={{ scale: mainScale }} className="absolute top-10 left-1/2 max-sm:max-w-64 -translate-x-1/2 w-full max-w-60">
                <Image src={'/static/layers/main.png'} alt='Banner' width={1000} height={1000} className='object-cover w-full z-50 ' />
            </motion.div>

            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                // style={{ scale: mainScale, y: book }}
                className="absolute bottom-[10vh] w-full"
            >
                <h1 className='text-4xl md:text-5xl lg:text-7xl font-bold text-center text-[#ECA055] z-50 tracking-wider [text-shadow:_2px_2px_2px_rgb(0_0_0_/_40%)]'>AAGAM SHASTRA</h1>

                <h2 className='text-2xl md:text-3xl lg:text-4xl text-center font-mono text-[#ECA055] z-50 tracking-wide [text-shadow:_2px_2px_2px_rgb(0_0_0_/_40%)]'>The sacred scriptures of Jainism</h2>
            </motion.div>



            <div className="h-screen w-screen relative overflow-hidden">
                <Image src={'/static/layers/bg.png'} alt='Banner' fill className='object-cover -z-50' />
            </div>



        </div>
    )
}

export default BannerParallex
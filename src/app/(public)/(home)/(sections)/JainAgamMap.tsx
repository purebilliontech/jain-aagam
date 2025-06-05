"use client"

import Typography from '@/components/common/typography'
import Image from 'next/image'
import React, { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionTitle from '@/components/common/SectionTitle'

const MapMarker = ({ className, title, subtitle, up = false }: { className: string, title: string, subtitle: string, up: boolean }) => {
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
      <div className="bg-accent-ui w-5 h-5 flex justify-center items-center rounded-full">
        <div className="bg-accent-ui w-5 h-5 md:w-3 md:h-3 rounded-full animate-ping">
        </div>
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`absolute ${up ? '-left-2 bottom-5' : '-right-20 top-5'} min-w-28 sm:left-3 p-3 md:min-w-40 bg-[#D9D2C0] rounded-lg`}
          >
            <Typography variant='h4' className='!text-base w-full italic text-typography'>{title}</Typography>
            <Typography variant='h4' className='!text-base italic text-typography/70'>{subtitle}</Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function JainAgamMap() {
  return (
    <>
      <div className=" max-w-7xl mx-auto relative my-30">
        <SectionTitle title='Aagams Across The World' subtitle='LIBRARIES & JAIN CENTRES' className='mb-10' />
        <Image src={'/static/home/map.png'} alt='Jain Aagam Map' width={2000} height={1000} />
        <MapMarker className='top-[25%] left-[5%]' title='Jain Center' subtitle='North California' up={true} />
        <MapMarker className='top-[29%] left-[8%]' title='Jain Center' subtitle='South California' up={false} />
        <MapMarker className='top-[20%] left-[50%]' title='The British Library' subtitle='London, UK' up={true} />
      </div>
    </>
  )
}

"use client"

import Typography from '@/components/common/typography'
import Image from 'next/image'
import React, { useState } from 'react'


const MapMarker = ({ className, title, subtitle }: { className: string, title: string, subtitle: string }) => {

  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className={`absolute group ${className}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="bg-red-400 w-3 h-3 flex justify-center items-center rounded-full">
        <div className="bg-red-400 w-3 h-3 rounded-full animate-ping">
        </div>
      </div>
      <div className={`absolute top-5 -left-5 min-w-28 sm:left-3 p-3 md:min-w-40  ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 bg-[#D9D2C0] rounded-lg `}>
        <div className="w-6 h-6 bg-white rounded-full"></div>
        <Typography variant='h4' className='!text-base w-full italic text-typography'>{title}</Typography>
        <Typography variant='h4' className='!text-base italic text-typography/70'>{subtitle}</Typography>
      </div>
    </div>
  )
}


export default function JainAgamMap() {
  return (
    <>
      <div className="max-w-7xl mx-auto relative my-20">
        <Image src={'/static/home/map.png'} alt='Jain Agam Map' width={2000} height={1000} />

        <MapMarker className='top-[15%] left-[10%]' title='The British Library' subtitle='Prof. Peter Flugel' />
        <MapMarker className='top-[20%] left-[50%]' title='The British Library' subtitle='Prof. Peter Flugel' />
        <MapMarker className='top-[40%] left-[70%]' title='The British Library' subtitle='Prof. Peter Flugel' />

      </div>
    </>
  )
}

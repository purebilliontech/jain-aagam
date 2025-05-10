import Image from 'next/image'
import React from 'react'

interface SectionTitleProps {
    title: string;
    subtitle: string;
    className?: string; // Optional prop for custom Tailwind CSS classes
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, className }) => {
    return (
        <>
<<<<<<< HEAD
            <div className='max-w-7xl mx-auto'>
                <p className='font-sans font-bold text-secondary-ui text-xs tracking-[0.2em] text-center'>{subtitle}</p>
=======
            <div className={`max-w-7xl mx-auto ${className}`}>

                <p className='font-sans font-bold text-secondary-ui tracking-[0.2em] text-center mb-1.5'>{subtitle}</p>
>>>>>>> 70bfe749b4fde972dfd7e42b21130faf86777305

                <div className="flex items-center md:flex-row flex-col">
                    <div className="md:w-1/5 w-1/2 max-md:my-3">
                        <Image src={'/static/title-ornament.png'} width={300} height={24} alt='Image for presentation' />
                    </div>
                    <div className="md:w-3/5">
                        <h2 className="md:text-6xl text-4xl text-primary-ui font-semibold font-mono text-center">{title}</h2>
                    </div>
                    <div className="md:w-1/5 md:block hidden">
                        <Image src={'/static/title-ornament.png'} width={300} height={24} alt='Image for presentation' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionTitle
import Image from 'next/image'
import React from 'react'
import Typography from './typography';

interface SectionTitleProps {
    title: string;
    subtitle: string;
    className?: string; // Optional prop for custom Tailwind CSS classes
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, className }) => {
    return (
        <>
            <div className={`max-w-7xl mx-auto ${className}`}>

                <Typography variant='p' className='font-sans font-bold text-xs text-secondary-ui tracking-[4px] text-center mb-1.5'>{subtitle}</Typography>

                <div className="flex items-center md:flex-row flex-col">
                    <div className="flex-1 max-md:my-3">
                        <Image src={'/static/title-ornament.png'} width={500} height={30} alt='Image for presentation' />
                    </div>
                    <div className="px-10">
                        <Typography variant='h2' className="text-primary-ui  text-center">{title}</Typography>
                    </div>
                    <div className="flex-1 md:block hidden">
                        <Image src={'/static/title-ornament.png'} width={500} height={30} alt='Image for presentation' />
                    </div>
                </div>


                {/* <div className="flex items-center md:flex-row flex-col">
                    <div className="md:w-1/5 w-1/2 max-md:my-3">
                        <Image src={'/static/title-ornament.png'} width={500} height={30} alt='Image for presentation' />
                    </div>
                    <div className="md:w-3/5">
                        <Typography variant='h2' className="text-primary-ui  text-center">{title}</Typography>
                    </div>
                    <div className="md:w-1/5 md:block hidden">
                        <Image src={'/static/title-ornament.png'} width={500} height={30} alt='Image for presentation' />
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default SectionTitle
import SectionTitle from '@/components/common/SectionTitle'
import Image from 'next/image'
import React from 'react'

const ViewsOnJainism = () => {
    return (
        <section className='max-w-7xl mx-auto p-5 my-20'>
            <SectionTitle title='Views on Jainism' subtitle='WORLD THINKERS & SCIENTISTS' />
            <div className="">
                <div className="flex flex-col md:flex-row mt-16 gap-10">
                    <div className="md:w-1/5">
                        <Image src={'/static/placeholder.png'} width={500} height={500} alt='Image for presentation' />
                    </div>
                    <div className="md:w-4/5 pt-5">
                        <p className='text-justify text-typography font-sans text-xl'>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis."
                        </p>
                        <p className='text-typography font-mono text-xl mt-10'>- Albert Einesten</p>
                    </div>
                </div>

                <div className="flex md:px-20 px-5 my-20">
                    <div className="w-5 h-5 bg-primary-ui rounded-full"></div>
                    <div className="h-1 w-full bg-primary-ui mt-[9px]"></div>
                    <div className="w-5 h-5 bg-primary-ui rounded-full"></div>
                </div>
            </div>

            <div className="">
                <div className="flex gap-10 md:flex-row-reverse flex-col mt-16">
                    <div className="md:w-1/5">
                        <Image src={'/static/placeholder.png'} width={500} height={500} alt='Image for presentation' />
                    </div>
                    <div className="md:w-4/5 pt-5">
                        <p className='text-justify text-typography font-sans text-xl'>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis."
                        </p>
                        <p className='text-typography font-mono text-xl mt-10'>- Albert Einesten</p>
                    </div>
                </div>

                <div className="flex md:px-20 px-5 my-20">
                    <div className="w-5 h-5 bg-primary-ui rounded-full"></div>
                    <div className="h-1 w-full bg-primary-ui mt-[9px]"></div>
                    <div className="w-5 h-5 bg-primary-ui rounded-full"></div>
                </div>
            </div>

        </section >
    )
}

export default ViewsOnJainism
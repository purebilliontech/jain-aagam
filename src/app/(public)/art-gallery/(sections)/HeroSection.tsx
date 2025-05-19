import SectionTitle from '@/components/common/SectionTitle'
import Typography from '@/components/common/typography'
import React from 'react'

export default function HeroSection() {
    return (
        <>
            <div className='max-w-7xl mx-auto p-5 my-10'>
                <SectionTitle title='Aradhya Art Gallery' subtitle='ART GALLERY' />

                <Typography variant='p' className='text-justify mt-5 text-foreground-ui'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo nostrum fugit maxime illum eos architecto, quod quisquam dolore distinctio aliquid molestiae repellendus doloremque adipisci? Tempora maxime accusamus amet eveniet atque obcaecati neque quis minima soluta sunt et, eaque culpa laborum corporis repudiandae impedit sit magnam molestiae. Incidunt tempore alias suscipit?</Typography>

                <div className="max-w-5xl mx-auto bg-[#E3DFD5] h-[500px] my-10 rounded-lg p-5">
                    <p>Video Placeholder</p>

                </div>

            </div>
        </>
    )
}

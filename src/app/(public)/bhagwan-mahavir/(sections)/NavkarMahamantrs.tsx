"use client"

import SectionTitle from '@/components/common/SectionTitle'
import Typography from '@/components/common/typography'
import YTVideoPlayer from '@/components/common/YTVideoPlayer'
import React, { useState } from 'react'

const mahaMantras = [
    {
        line: 'Namo Arihantanam',
        meaning: 'I bow down to the Arihants'
    },
    {
        line: 'Namo Siddhanam',
        meaning: 'I bow down to the Siddhas'
    },
    {
        line: 'Namo Ayariyanam',
        meaning: 'I bow down to the Acharyas'
    },
    {
        line: 'Namo Uvajjhayanam',
        meaning: 'I bow down to the Upadhyays'
    },
    {
        line: 'Namo Loe Savva-Sahunam',
        meaning: 'I bow down to all the Sadhu-Sadhvijis in the world'
    },
    {
        line: 'Eso Panch Namokkaro',
        meaning: 'The salutations to these five great ones'
    },
    {
        line: 'Savva Paav Panaasano',
        meaning: 'has the power to destroy all sins'
    },
    {
        line: 'Mangalam Cha Savvesim',
        meaning: 'Amongst all that is auspicious'
    },
    {
        line: 'Padhamam Havai Mangalam',
        meaning: 'the Navkar Mantra is the foremost'
    }
]

const NavkarMahamantrs = () => {
    const [selectedMeaning, setSelectedMeaning] = useState<string>("I bow down to the Arihants");
    return (
        <>
            <section className='max-w-7xl mx-auto p-5 my-20'>
                <SectionTitle title='Navkar Mahamantras' subtitle='THE UNIVERSAL MANTRA' />
                <div className="flex flex-col md:flex-row max-md:gap-10 items-center md:mt-24">
                    <div className="md:w-1/3">

                    </div>

                    <div className="md:w-1/3">
                        {mahaMantras.map((mantra, index) => (
                            <div onMouseEnter={() => setSelectedMeaning(mantra.meaning)}>
                                <Typography variant='h4' key={index} className='text-center  font-mono font-semibold text-typography cursor-pointer hover:text-primary-ui'>{mantra.line}</Typography>
                            </div>
                        ))}
                    </div>

                    <div className="md:w-1/3">
                        <div className="px-6 py-20 h-fit w-fit md:ml-auto rounded-4xl bg-[#DCD3C2]">
                            <Typography variant='h4' className='font-mono text-typography text-center font-semibold'>
                                {selectedMeaning}
                            </Typography>
                        </div>
                    </div>

                </div>
                <Typography variant='p' className='text-justify my-20'>
                    Namaskar Mahamantra is a universal Mantra of peace and Maitri (friendship) towards every living being.
                    <br />
                    <br />
                    While most Mantras are dedicated to individuals, Namaskar Mantra is the only mantra that is dedicated to inner qualities.
                    <br />
                    <br />
                    Jain philosophy explains that purity is Godliness. Namaskar Mantra is a tribute of appreciation to all the great souls who have attained this absolute purity in the infinite past, are striving to attain inner purity in the present, or will attain it in the future.
                    <br />
                    <br />
                    Jainism believes that every soul has the potential to be Parmatma, to attain absolute purity. Hence, Namaskar Mantra is respect towards every soul in the world. Namaskar Mantra is a timeless mantra, it has no creator, and no destroyer. Every syllable of this Mantra possesses infinite meanings, infinite potential and infinite energy. Any form of physical illness, mental negativity, critical obstacles can be erased by this selfless mantra, and one can experience a rejuvenation of positivity in life.
                    <br />
                    <br />
                    The way a child can approach his mother at any hour of the day without hesitation, this mantra can also be recited anytime, anywhere and by anyone - to experience peace, positivity and feel absolutely relaxed.
                </Typography>

                <YTVideoPlayer className='max-w-7xl mx-auto md:h-[80vh] flex flex-col items-center justify-center ' videoUrl={"https://www.youtube.com/watch?v=ia0c2tzXXqE"} />

            </section >
        </>
    )
}

export default NavkarMahamantrs
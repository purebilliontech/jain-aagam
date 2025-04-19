import SectionTitle from '@/components/common/SectionTitle'
import React from 'react'


const mahaMantras = [
    'Namo Arihantanam',
    'Namo Siddhanam',
    'Namo Ayariyanam',
    'Namo Uvvajhayanam',
    'Namo Loe Savva Sahunam',
    'Eso Panch Namokkaro',
    'Savva Paav Panasano',
    'Mangalam Cha Savve Singh',
    'Padhamam Havai Mangalam',
]

const NavkarMahamantrs = () => {
    return (
        <>
            <section className='max-w-7xl mx-auto p-5 my-20'>
                <SectionTitle title='Navkar Mahamantras' subtitle='THE UNIVERSAL MANTRA' />
                <div className="flex items-center mt-24">
                    <div className="md:w-1/3">

                    </div>

                    <div className="md:w-1/3">
                        {mahaMantras.map((mantra) => (
                            <p key={mantra} className='text-center text-3xl font-mono font-semibold text-typography'>{mantra}</p>
                        ))}
                    </div>

                    <div className="md:w-1/3">
                        <div className="px-6 py-20 h-fit w-fit md:ml-auto rounded-4xl bg-[#DCD3C2]">
                            <p className='font-mono text-typography text-center font-semibold text-2xl'>EVERY LINE <br /> WITH MEANING</p>
                        </div>
                    </div>

                </div>

                <p className='text-justify text-foreground-ui text-xl mt-28' >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    <br /><br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <div className="max-w-3xl bg-[#DCD3C2] flex justify-center items-center rounded-2xl mt-28 h-[50vh] mx-auto">
                    <p >NAVKAR MANTRA VIDEO</p>
                </div>

            </section>
        </>
    )
}

export default NavkarMahamantrs
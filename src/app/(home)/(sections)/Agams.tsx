import Image from 'next/image'
import React from 'react'

const Agams = () => {
    return (
        <>
            <section className='relative h-full'>
                <Image className='-z-10 absolute top-0 left-0 inset-0 object-cover object-center' src={'/static/agams-bg.png'} fill alt='Agams BG' />
                <div className='z-50 xl:px-20 py-20  max-w-7xl mx-auto'>
                    <h3 className='text-3xl font-mono font-semibold text-primary'>Ang Aagams:</h3>
                    <p className='text-muted text-xl font-mono font-semibold'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
                        ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                    </p>

                    <h3 className='text-3xl mt-5 font-mono font-semibold text-primary'>Upang Aagams:</h3>
                    <p className='text-muted text-xl font-mono font-semibold'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
                        ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                    </p>

                    <h3 className='text-3xl mt-5 font-mono font-semibold text-primary'>Mool Aagams:</h3>
                    <p className='text-muted text-xl font-mono font-semibold'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
                        ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                    </p>

                    <h3 className='text-3xl mt-5 font-mono font-semibold text-primary'>Chhed Aagams:</h3>
                    <p className='text-muted text-xl font-mono font-semibold'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
                        ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                    </p>

                    <h3 className='text-3xl mt-5 font-mono font-semibold text-primary'>Avashyak Aagams:</h3>
                    <p className='text-muted text-xl font-mono font-semibold'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
                        ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                    </p>
                </div>

            </section>
        </>
    )
}

export default Agams
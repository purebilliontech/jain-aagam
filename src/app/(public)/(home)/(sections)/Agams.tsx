import Image from 'next/image'
import React from 'react'

const AgamSection = ({ title, content }: { title: string, content: string }) => {
    return (
        <div className='mt-5 p-4 md:p-0'>
            <h3 className='text-2xl md:text-3xl font-mono font-semibold text-primary-ui'>{title}</h3>
            <p className='text-muted-ui text-lg md:text-xl font-mono font-semibold'>
                {content}
            </p>
        </div>
    )
}

const Agams = () => {
    const agamData = [
        { title: 'Ang Aagams:', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.' },
        { title: 'Upang Aagams:', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.' },
        { title: 'Mool Aagams:', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.' },
        { title: 'Chhed Aagams:', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.' },
        { title: 'Avashyak Aagams:', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.' },
    ];

    return (
        <>
            <section className='relative h-full'>
                <Image className='-z-10 absolute top-0 left-0 inset-0 object-cover object-center' src={'/static/agams-bg.png'} fill alt='Agams BG' />
                <div className='z-50 px-5 md:px-10 xl:px-20 py-20 max-w-7xl mx-auto'>
                    {agamData.map((agam, index) => (
                        <AgamSection key={index} title={agam.title} content={agam.content} />
                    ))}
                </div>
            </section>
        </>
    )
}

export default Agams
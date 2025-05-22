import React from 'react'

const Upvasana = ({ title, content, reference }: { title: string, content: string, reference: string }) => {
    return (
        <>
            <section className='relative h-full px-5 py-10 md:px-10 lg:px-20 xl:px-48 bg-[url("/static/gatha-bg.png")] bg-no-repeat bg-fixed bg-center bg-cover'>
                {/* <Image className='-z-10 absolute top-0 left-0 inset-0 object-cover object-center' src={'/static/ebooks-sutra-bg.png'} fill alt='Agams BG' /> */}
                <div className='z-50 bg-[#F6F7F2D4] p-5 py-10 md:p-10 lg:p-14 max-w-7xl mx-auto rounded-4xl'>
                    <h2 className="text-[#E68C3A] text-2xl md:text-4xl font-normal font-mono text-center">
                        {title}
                    </h2>
                    <p className="text-justify w-fit mx-auto text-typography mt-7">
                        {content}
                    </p>
                    <p className="text-xl md:text-2xl text-center font-sans font-semibold text-typography mt-10">
                        {reference}
                    </p>
                </div>
            </section>
        </>
    )
}

export default Upvasana
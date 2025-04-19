import Image from 'next/image'
import React from 'react'

const Upvasana = () => {
    return (
        <section className="w-full relative flex flex-col items-center justify-center self-center h-96 md:h-[400px]">
            <Image
                src={"/static/ebooks-sutra-bg.png"}
                layout="fill"
                objectFit="cover"
                alt="Shree Uttaradhyayan Sutra background image"
                className="z-0"
            />
            <div className="absolute flex flex-col items-center justify-center z-10 bg-[#F6F7F2D4] w-[85%] h-[85%] self-center rounded-4xl p-4 md:p-8">
                <h2 className="text-[#E68C3A] text-2xl md:text-4xl font-normal font-mono text-center">
                    ॥ ઉપવાસના વિચારોના મૂળતત્વ ॥
                </h2>
                <p className="text-justify w-full md:w-[60%] text-typography mt-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                    ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
                    accumsan lacus vel facilisis.Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tem
                </p>
                <p className="text-xl md:text-2xl font-sans font-semibold text-typography mt-11">
                    Shree Uttaradhyayan Sutra
                </p>
            </div>
        </section>
    )
}

export default Upvasana
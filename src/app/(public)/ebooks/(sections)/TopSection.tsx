import Image from 'next/image'
import React from 'react'

const TopSection = () => {
    return (
        <>
            <section className="flex flex-col md:flex-row bg-amber-50 mx-auto">
                <div className="w-full md:w-1/3">
                    <Image
                        src="/static/bhagwan-mahavir.png"
                        alt="Bhagwan Mahavir"
                        className="rounded border-2 border-gray-300"
                        width={450}
                        height={100}
                    />
                </div>
                <div className="w-full md:w-2/3 flex flex-col justify-center pl-0 md:pl-8 mt-4 md:mt-0">
                    <h1 className="text-4xl md:text-6xl lg:8xl font-sans font-bold text-primary-ui mb-4 text-center md:text-left">
                        BHAGWAN
                        <br />
                        MAHAVIR
                    </h1>
                </div>
            </section>
        </>

    )
}

export default TopSection
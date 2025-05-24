import Image from 'next/image'
import React from 'react'

const InnerBanner = ({ image, alt, children }: { image: string, alt: string, children?: React.ReactNode }) => {
    return (
        <section className="relative w-screen h-[70vh]">
            <Image
                src={image}
                alt={alt}
                width={2000}
                height={2000}
                className="w-screen h-full object-cover absolute -z-50 top-0 left-0"
            />
            {children}
        </section>
    )
}

export default InnerBanner
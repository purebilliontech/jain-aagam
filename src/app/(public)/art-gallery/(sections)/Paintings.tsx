import Typography from '@/components/common/typography'
import Image from 'next/image'
import React from 'react'

const Painting = ({ title, subtitle, image, content, reverse }: { title: string, subtitle: string, image: string, content: React.ReactNode, reverse: boolean }) => {
    return (
        <div className={`flex items-center my-10 flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''}`}>
            <div className="p-5 md:w-1/2 flex flex-col gap-3 text-center md:text-left">
                <Typography variant='h2' className='text-primary-ui'>{title}</Typography>
                <Typography variant='h3' className='text-muted-foreground-ui'>{subtitle}</Typography>
                <Typography variant='p' className='text-muted-foreground-ui text-justify'>{content}</Typography>
            </div>
            <div className="p-5 md:w-1/2">
                <Image src={image} alt='Painting 1' width={500} height={500} className=' object-contain w-full h-full rounded-lg' />
            </div>

        </div>
    )
}


export default function Paintings() {
    return (
        <>
            <div className="max-w-7xl mx-auto">

                <Painting
                    title='Painting Title 1'
                    subtitle='Subtitle'
                    image='/static/art/painting.png'
                    content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi deserunt nihil a repellat, reprehenderit rerum provident assumenda eveniet, consequatur quia cupiditate fugiat dolor qui corrupti blanditiis beatae ipsa omnis illo labore minima ducimus animi. Doloremque distinctio perferendis consequatur optio consectetur accusantium animi reprehenderit cum et, eligendi magni in! Labore, necessitatibus!'
                    reverse={false}
                />

                <Painting
                    title='Painting Title 2'
                    subtitle='Subtitle'
                    image='/static/art/painting.png'
                    content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi deserunt nihil a repellat, reprehenderit rerum provident assumenda eveniet, consequatur quia cupiditate fugiat dolor qui corrupti blanditiis beatae ipsa omnis illo labore minima ducimus animi. Doloremque distinctio perferendis consequatur optio consectetur accusantium animi reprehenderit cum et, eligendi magni in! Labore, necessitatibus!'
                    reverse={true}
                />

            </div>
        </>
    )
}

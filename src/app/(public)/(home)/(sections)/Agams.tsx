import Typography from '@/components/common/typography'
import React from 'react'

const AgamSection = ({ title, content }: { title: string, content: string }) => {
    return (
        <div className='mt-5 '>
            <Typography variant='h3' className='text-primary-ui text-justify'>{title}</Typography>
            <Typography variant='p' className='text-muted-ui text-justify'>
                {content}
            </Typography>
        </div>
    )
}

const Agams = () => {
    const agamData = [
        { title: 'Ang Sutras:', content: 'These are the core texts, the direct preachings of Parmatma Mahavir that were weaved into scriptures by his chief disciples – the Gandhars. They are also known as the Dwaadshangi Ganipitak or the eternal 12 texts of wisdom. The twelfth sutra has been lost with time; there are 11 Ang Sutras with us today.' },
        { title: 'Upang Sutras:', content: 'These are the subsidiary texts, the scriptures which have been derived from the core Ang Sutras. These scriptures have been created by Acharya Bhagwants, and there are numerous Upaang Sutras, of which 12 texts are with us today. ' },
        { title: 'Mool Sutras:', content: 'These texts reveal the fundamentals of Jainism, just like the roots of a tree. Mool Sutras contain profound insights on life-transforming lessons shared by Bhagwan Mahavir.' },
        { title: 'Chhed Sutras:', content: 'These are distinctive scriptures formulated specially for the conduct of ascetics. While in sadhana, if a seeker commits faults or mistakes, Chhed Sutras throw light on well-defined corrective measures and forms of repentance for self-improvement. ' },
        { title: 'Avashyak Sutras:', content: 'Avashyak Sutra is an independent Sutra that has been mandated as ‘a must’ for laymen and ascetics alike. It highlights spiritual practices for daily inner cleansing and sadhanas for daily self-purification.' },
    ];

    return (
        <>
            <section className='relative h-full bg-[url("/static/agams-bg.png")] bg-cover bg-fixed bg-center'>
                {/* <Image className='-z-10 absolute top-0 left-0 inset-0 object-cover object-center' src={'/static/agams-bg.png'} fill alt='Agams BG' /> */}
                <div className='z-50 px-5 py-20 max-w-5xl mx-auto'>
                    {agamData.map((agam, index) => (
                        <AgamSection key={index} title={agam.title} content={agam.content} />
                    ))}
                </div>
            </section>
        </>
    )
}

export default Agams
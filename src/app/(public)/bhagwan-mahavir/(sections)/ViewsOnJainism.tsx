import SectionTitle from '@/components/common/SectionTitle'
import Typography from '@/components/common/typography'
import React from 'react'

const viewsOnJainism = [
    {
        quote: "I say with conviction that the doctrine for which the name of Lord Mahavira is glorified nowadays is the doctrine of Ahimsa. If anyone has practiced to the fullest extent and has propagated most the doctrine of Ahimsa, it was Lord Mahavira.",
        author: "Mahatma Gandhi"
    },
    {
        quote: "The external mystery of the world is its intelligibility. True religion fastens to this element of intelligibility and creates a system of thought and action which leads to true harmony and bliss. And it is indeed so with Jainism.",
        author: "Albert Einstein"
    },
    {
        quote: "Jainism is of very high order. Its important teachings are based upon science. The more the scientific knowledge advances the more those Jain teachings will be proven.",
        author: "Dr. L. P. Tessitori, Italy"
    },
    {
        quote: "Jainism has contributed to the world the sublime doctrine of Ahimsa. No other religion has emphasized the importance of Ahimsa and carried out its practice to the extent that Jainism has done. Jainism deserves to become the universal religion because of its Ahimsa doctrine.",
        author: "Justice Ranglekar, Bombay High Court"
    },
    {
        quote: "The Jain Sadhu leads a life which is praised by all. He practices the vratas (restraints) and rites strictly and shows to the world the way one has to go in order to realize the atman (soul). Even the life of a Jain householder is so faultless that India should be proud of him.",
        author: "Dr. Satischandra Vidhya Bhushan"
    },
    {
        quote: "I adore so greatly the principles of the Jain religion that I would like to be reborn in a Jain community.",
        author: "George Bernard Shaw"
    },
    {
        quote: "O Arhan! You are equipped with the arrow of Vastuswarpa, the law of teaching, and the ornaments of the four infinite qualities. O Arhan! You have attained omniscient knowledge in which the universe is reflected. O Arhan! You are the protector of all the Souls (Jivas) in the world. O Arhan! The destroyer of Kama (lust)! There is no strong person equal to you.",
        author: "Yajur Veda, Chapter 19"
    },
    {
        quote: "The right of welcoming the delegates of the universal peace organization belongs to the Jains only. Because Ahimsa alone contributes to the establishment of universal peace. Tirthankars, the propounders of Jainism, preached to the world the Ahimsa doctrine. Therefore, who else except the followers of Bhagwan Parshwanath and Mahavira can preach universal peace?",
        author: "Dr. Radha Vinodpal"
    }
]


const ViewsOnJainism = () => {
    return (
        <section className='max-w-7xl mx-auto p-5 my-20'>
            <SectionTitle title='Views on Jainism' subtitle='WORLD THINKERS & SCIENTISTS' />
            {viewsOnJainism.map((view, index) => (
                <div key={index}>
                    <div className="">
                        <div className="flex flex-col md:flex-row gap-10">
                            <div className="pt-5">
                                <Typography variant='p' className='text-justify text-typography font-sans'>
                                    &ldquo;{view.quote}&rdquo;
                                </Typography>
                                <Typography variant='p' className='text-typography font-mono font-semibold mt-5'>- {view.author}</Typography>
                            </div>
                        </div>

                        <div className="flex my-10">
                            <div className="w-4 h-4 bg-primary-ui rounded-full"></div>
                            <div className="h-0.5 w-full bg-primary-ui mt-[9px]"></div>
                            <div className="w-4 h-4 bg-primary-ui rounded-full"></div>
                        </div>
                    </div>
                </div>
            ))}


        </section >
    )
}

export default ViewsOnJainism
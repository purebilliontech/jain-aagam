import Typography from '@/components/common/typography'
import Image from 'next/image'
import React from 'react'

const Painting = ({ title, subtitle, image, content, reverse }: { title: string, subtitle: string, image: string, content: React.ReactNode, reverse: boolean }) => {
    return (
        <div className={`flex items-center py-10 flex-col lg:flex-row ${reverse ? 'lg:flex-row-reverse' : ''}`}>
            <div className="p-5 lg:w-1/2 flex flex-col gap-3 text-center lg:text-left md:max-w-2xl">
                <Typography variant='h3' className='text-foreground-ui'>{title}</Typography>
                <Typography variant='h4' className='text-primary-ui '>{subtitle}</Typography>
                <Typography variant='p' className='text-muted-foreground-ui text-justify'>{content}</Typography>
            </div>
            <div className="p-5 lg:w-1/2">
                <Image src={image} alt='Painting 1' width={1000} height={1000} className='object-cover aspect-square w-full h-full rounded-3xl overflow-hidden ' />
            </div>

        </div>
    )
}


export default function Paintings() {
    return (
        <>
            <div className="bg-muted-ui py-10 ">

                <div className="max-w-7xl mx-auto ">

                    <Painting
                        title='The Story of Mahasati Chandanbala'
                        subtitle='Undeterred Tolerance, Unwavering Devotion'
                        image='/static/art/painting1.png'
                        content="Arya Chandanbala was the Chief Sadhviji under Bhagwan Mahavir. She had lost her parents at a very young age, and faced sveeral hardships. Eventually, she was adopted by a wealthy couple because of her virtuosity. But her adoptive mother later accused her of evil intentions and imprisoned her for 3 days. Despite this, she remained calm, attributing her situation to karma. Upon her adoptive father' s return, he found her in misery and sought to free her. However, Chandana waited to offer food to someone worthy before eating. To her utmost surprise, Bhagwan Mahavir arrived, ending his 6-month fast upon all his 13 vows being fulfilled and accepted being offered by Chandana. She later adopted renunciation under him, achieving kevalgnan (omniscience) and nirvana (liberation), becoming a revered figure in Jainism."
                        reverse={false}
                    />

                    <Painting
                        title='Bhagwan Rushabhdev Varshitapp Parna'
                        subtitle='Limitless Patience, Unmatched Determination'
                        image='/static/art/painting2.png'
                        content="Parmatma Aadinath, also known as Bhagwan Rushabhdev, is the first Tirthankar in Jainism. When he still king, he had given a command to a few villagers that they must tie the mouths of their oxen to prevent them from eating the harvest on the field. They followed his instructions, but did not untie the mouths at night, and the oxen remained deprived of food because of this for an entire night. The cost of this one oversight resulted in karma due to which even Bhagwan Rushabhdev did not get food and water in alms for 13 months and 13 years after his renunciation. And yet, without being deterred, he continued in his spiritual journey, unmoved. Finally, Prince Shreyanshkumar ended his fast with 108 pots of ikshuras, a day which is now celebrated as Akshay Tritiya."
                        reverse={true}
                    />

                    <Painting
                        title="Bahubali's attains Kegvalgnan (Omniscience)"
                        subtitle='Letting Go of Ego'
                        image='/static/art/painting3.png'
                        content={`Bahubali, the son of Bhagwan Rushabhdev, took diksha after realising the truth. For 12 and a half years, he stood still like a tree and remained unmoved in deep meditation. However, he had a vow. He wished to go to Bhagwan Rushabhdev only after attaining kevalgnan, because he did not wish to bow down to his 98 brothers who had taken diksha before him. His sisters, Brahmi and Sundari were sent by Bhagwan Rushabhdev with a message. They hinted to him that his ego was the obstacle, and said, " Get down from the elephant," symbolising his pride. Bahubali realised this, and the moment he lifted his leg to go to Bhagwan Rushabhdev, he destroyed all his karma and attained kevalgnan. `}
                        reverse={false}
                    />

                </div>
            </div>
        </>
    )
}

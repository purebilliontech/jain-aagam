import SectionTitle from '@/components/common/SectionTitle'
import Typography from '@/components/common/typography'
import React from 'react'

export default function TimingsSection() {
    return (
        <>
            <div id='timings' className='max-w-7xl mx-auto p-5 py-10 pt-20'>
                <SectionTitle title='An Immersive Experience' subtitle='EXPLORE' className='pb-10' />

                <Typography variant='p' className='text-justify mx-auto w-fit text-typography '>Visit Parasdham Girnar for an exclusive, experiential display of the Aaradhya Art Gallery </Typography>

                {/* <Typography variant='h5' className='text-foreground-ui text-center mt-5'>Venue</Typography> */}
                <Typography variant='p' className='text-justify mx-auto mt-3 w-fit text-foreground-ui'>Parasdham Girnar, Rupayatan Road, Bhavnath Taleti, Girnar, Junagadh – 362004</Typography>
                <div className="flex md:flex-row flex-col gap-10 py-10">
                    <div className="md:w-1/2">
                        <Typography variant='h5' className='text-foreground-ui text-center mb-2'>Weekday Visiting Hours</Typography>
                        <Typography variant='p' className='text-justify mx-auto w-fit text-foreground-ui'>1st slot: 11.15am</Typography>
                        <Typography variant='p' className='text-justify mx-auto w-fit text-foreground-ui'>2nd slot: 5.00pm</Typography>
                        <Typography variant='p' className='text-justify mx-auto w-fit text-foreground-ui'>3rd slot: 7.00pm</Typography>
                    </div>
                    <div className="md:w-1/2">
                        <Typography variant='h5' className='text-foreground-ui text-center mb-2'>Weekend Visiting Hours</Typography>
                        <Typography variant='p' className='text-justify mx-auto w-fit text-foreground-ui'>1st slot: 10.30am</Typography>
                        <Typography variant='p' className='text-justify mx-auto w-fit text-foreground-ui'>2nd slot: 11.30am</Typography>
                        <Typography variant='p' className='text-justify mx-auto w-fit text-foreground-ui'>3rd slot: 2.00pm</Typography>
                        <Typography variant='p' className='text-justify mx-auto w-fit text-foreground-ui'>4th slot: 3.30pm</Typography>
                        <Typography variant='p' className='text-justify mx-auto w-fit text-foreground-ui'>5th slot: 5.00pm</Typography>
                        <Typography variant='p' className='text-justify mx-auto w-fit text-foreground-ui'>6th slot: 7.00pm</Typography>
                    </div>

                </div>

            </div>
        </>
    )
}

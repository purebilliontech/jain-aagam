import FEButton from '@/components/common/FEButton'
import Link from 'next/link'
import React from 'react'

const JoinMission = () => {
    return (
        <>
            <section className='max-w-7xl mx-auto p-5 py-40'>
                <h2 className='text-primary-ui text-center font-montserrat font-semibold text-2xl'>TO JOIN THE JAIN AAGAM MISSION, <br /> CONTACT:</h2>
                <div className="flex justify-center">
                    <Link href='tel:+919167109889'>
                        <FEButton className='rounded-full mt-10' >+91 91671 09889</FEButton>
                    </Link>
                </div>
            </section>
        </>
    )
}

export default JoinMission
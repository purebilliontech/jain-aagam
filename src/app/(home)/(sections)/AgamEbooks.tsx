import FEButton from '@/components/common/FEButton'
import SectionTitle from '@/components/common/SectionTitle'
import React from 'react'

const AgamEbooks = () => {
    return (
        <>
            <section className='mt-32 max-w-7xl w-full mx-auto p-5'>
                <SectionTitle title='Agam Ebooks' subtitle='EXPLORE' />
                <div className=" flex justify-center mt-24 gap-10">
                    <div className="bg-secondary w-52 h-72"></div>
                    <div className="bg-secondary w-52 h-72"></div>
                    <div className="bg-secondary w-52 h-72"></div>
                    <div className="bg-secondary w-52 h-72"></div>
                </div>
                <div className="flex justify-center">
                    <FEButton className='text-center mx-auto mt-20'>EXPLORE ALL</FEButton>
                </div>
            </section>
        </>
    )
}

export default AgamEbooks
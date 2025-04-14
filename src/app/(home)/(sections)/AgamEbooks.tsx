import FEButton from '@/components/common/FEButton'
import SectionTitle from '@/components/common/SectionTitle'
import React from 'react'

const AgamEbooks = () => {
    return (
        <>
            <section className='mt-32 mb-20 max-w-7xl w-full mx-auto p-5'>
                <SectionTitle title='Agam Ebooks' subtitle='EXPLORE' />

                {/* Responsive grid layout */}
                <div className="mt-24 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10">
                    <div className="bg-secondary-ui w-40 h-56 sm:w-44 sm:h-64 md:w-48 md:h-68 lg:w-52 lg:h-72"></div>
                    <div className="bg-secondary-ui w-40 h-56 sm:w-44 sm:h-64 md:w-48 md:h-68 lg:w-52 lg:h-72"></div>
                    <div className="bg-secondary-ui w-40 h-56 sm:w-44 sm:h-64 md:w-48 md:h-68 lg:w-52 lg:h-72"></div>
                    <div className="bg-secondary-ui w-40 h-56 sm:w-44 sm:h-64 md:w-48 md:h-68 lg:w-52 lg:h-72"></div>
                </div>

                <div className="flex justify-center">
                    <FEButton className='text-center mx-auto mt-12 sm:mt-16 md:mt-20'>EXPLORE ALL</FEButton>
                </div>
            </section>
        </>
    )
}

export default AgamEbooks
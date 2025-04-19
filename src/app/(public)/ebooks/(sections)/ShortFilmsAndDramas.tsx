import SectionTitle from '@/components/common/SectionTitle'
import React from 'react'

const ShortFilmsAndDramas = () => {
    return (
        <>
            <section className='max-w-7xl mx-auto p-5'>
                <SectionTitle title='Short Films & Dramas' subtitle='INSPIRATION' />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
                    <div className="bg-foreground-ui p-6 flex items-center justify-center rounded-lg h-40">
                        <p className="text-center text-white font-medium">
                            Short Film 1
                        </p>
                    </div>
                    <div className="bg-foreground-ui p-6 flex items-center justify-center rounded-lg h-40">
                        <p className="text-center text-white font-medium">
                            Short Film 2
                        </p>
                    </div>
                    <div className="bg-foreground-ui p-6 flex items-center justify-center rounded-lg h-40">
                        <p className="text-center text-white font-medium">
                            Short Film 3
                        </p>
                    </div>
                    <div className="bg-foreground-ui p-6 flex items-center justify-center rounded-lg h-40">
                        <p className="text-center text-white font-medium">
                            Drama 1
                        </p>
                    </div>
                    <div className="bg-foreground-ui p-6 flex items-center justify-center rounded-lg h-40">
                        <p className="text-center text-white font-medium">
                            Drama 2
                        </p>
                    </div>
                    <div className="bg-foreground-ui p-6 flex items-center justify-center rounded-lg h-40">
                        <p className="text-center text-white font-medium">
                            Drama 3
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShortFilmsAndDramas
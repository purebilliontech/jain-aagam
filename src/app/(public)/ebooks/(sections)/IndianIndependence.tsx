import SectionTitle from '@/components/common/SectionTitle'
import React from 'react'

const IndianIndependence = () => {
    return (
        <>
            <section className="max-w-7xl mx-auto bg-white py-26">
                <SectionTitle title="Indian Independence" subtitle="WORLD INFLUENCE" />

                <div className="flex flex-wrap gap-4 mb-8 mt-20">
                    <div className="flex-1 bg-foreground-ui p-6 flex items-center justify-center rounded-lg h-96">
                        <p className="text-center text-white font-medium">
                            GANDHIJI & BHAGWAN ANUVR PHOTO
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex-1 bg-foreground-ui p-4 flex items-center justify-center rounded-lg h-40">
                            <p className="text-center text-white font-medium">
                                DELHI MUSEUM PHOTOS
                            </p>
                        </div>
                        <div className="flex-1 bg-foreground-ui p-4 flex items-center justify-center rounded-lg h-40">
                            <p className="text-center text-white">EMPTY</p>
                        </div>
                    </div>

                    <div className="bg-foreground-ui p-4 flex items-center justify-center rounded-lg h-96 w-full md:w-80">
                        <p className="text-center text-white font-medium">
                            GANDHIJI&apos;S HANDWRITINGS
                        </p>
                    </div>
                </div>

                {/* Lorem Ipsum Text */}
                <div className="my-40">
                    <p className="text-xl font-sans text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                        ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
                        accumsan lacus vel facilisis. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
                        gravida. Risus commodo viverra maecenas accumsan lacus vel
                        facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                        maecenas accumsan lacus vel facilisis.
                    </p>
                </div>

                {/* Bottom Flex Section */}
                <div className="grid md:grid-cols-3 grid-cols-1 gap-10 mb-8 justify-center">
                    <div className=" bg-foreground-ui p-4 flex items-center justify-center rounded-lg h-96 w-full md:w-auto">
                        <p className="text-center text-white font-medium">
                            GANDHIJI & BICHARJI SWAMI PAINTING
                        </p>
                    </div>
                    <div className=" bg-foreground-ui p-4 flex items-center justify-center rounded-lg h-96 w-full md:w-auto">
                        <p className="text-center text-white font-medium">
                            GANDHIJI & CHIVALU MARRJI MAHASATIH PHOTO
                        </p>
                    </div>
                    <div className="bg-foreground-ui p-4 flex items-center justify-center rounded-lg h-96 w-full md:w-auto">
                        <p className="text-center text-white font-medium">
                            GANDHIJI & SHRIMAD RAJCHANDRAJI
                        </p>
                    </div>
                </div>

                <div className="mt-40">
                    <p className="text-xl font-sans text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                        ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
                        accumsan lacus vel facilisis. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
                        gravida. Risus commodo viverra maecenas accumsan lacus vel
                        facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                        maecenas accumsan lacus vel facilisis.
                    </p>
                </div>
            </section>
        </>
    )
}

export default IndianIndependence
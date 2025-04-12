"use client";
import {
    useMotionValueEvent,
    useScroll,
    useTransform,
    motion,
} from "motion/react";
import Image from "next/image";

import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
    title: string;
    subtitle: string;
    content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            console.log(rect);
            setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div
            className="w-full relative bg-[url('/static/timeline-bg.png')] bg-no-repeat bg-cover bg-fixed bg-white dark:bg-neutral-950 font-sans  py-20 "
            ref={containerRef}
        >

            {/* <div className="h-screen w-screen -mb-[80vh]  top-0 sticky left-0">
                <Image src={'/static/timeline-bg.png'} className=' inset-0 object-cover object-center' fill alt='Agams BG' />
            </div> */}

            <div ref={ref} className="relative max-w-7xl mx-auto pb-20">

                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-end pt-10 md:pt-40 md:gap-10"
                    >
                        <div className="sticky flex flex-col md:flex-row z-40 items-center justify-end top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                            <div className="flex flex-col items-end">

                                <h3 className="hidden md:block font-mono  text-xl md:pl-20 md:text-5xl font-bold text-[#E9E2D2] dark:text-[#E9E2D2] ">
                                    {item.title}
                                </h3>
                                <p className="hidden md:block font-mono text-lg italic md:pl-20 md:text-3xl font-bold text-[#E9E2D2] dark:text-[#E9E2D2]">{item.subtitle}</p>
                            </div>
                            <div className="h-10 ml-5 w-10 rounded-full bg-[#E9E2D2] dark:bg-black flex items-center justify-center">
                            </div>
                        </div>

                        <div className="relative pl-20 pr-4 md:pl-4 w-full">
                            <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                                {item.title}
                            </h3>
                            {item.content}{" "}
                        </div>
                    </div>
                ))}
                <div
                    style={{
                        height: height + "px",
                    }}
                    className="absolute md:left-[360px] right-5 top-0 overflow-hidden w-[7px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute top-0  w-[7px] bg-[#E9E2D2] rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};

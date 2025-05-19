"use client";
import {
    useScroll,
    useTransform,
    motion,
} from "motion/react";

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
        offset: ["start 20%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div
            className="w-full relative bg-[url('/static/timeline-bg.png')] bg-no-repeat bg-cover bg-fixed bg-white dark:bg-neutral-950 font-sans py-12 md:py-20"
            ref={containerRef}
        >
            <div ref={ref} className="relative max-w-7xl mx-auto pb-12 md:pb-20 px-4 md:px-6">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row justify-end pt-16 md:pt-40 md:gap-10"
                    >

                        {/* Mobile Title Section (Visible only on mobile) */}
                        <div className="hidden mb-4 w-full">
                            <h3 className="text-2xl font-bold text-[#E9E2D2] dark:text-[#E9E2D2]">
                                {item.title}
                            </h3>
                            <p className="text-lg italic font-semibold text-[#E9E2D2] dark:text-[#E9E2D2] mt-1">
                                {item.subtitle}
                            </p>
                        </div>

                        {/* Timeline Left Side - Date & Circle */}
                        <div className="sticky flex flex-row max-md:gap-4 z-40 items-center self-start max-w-xs lg:max-w-sm md:w-full">
                            <div className="flex flex-col items-end">
                                <h3 className="font-mono text-xl md:pl-20 md:text-5xl font-bold text-[#E9E2D2] dark:text-[#E9E2D2]">
                                    {item.title}
                                </h3>
                                <p className="font-mono text-lg italic md:pl-20 md:text-3xl font-bold text-[#E9E2D2] dark:text-[#E9E2D2]">
                                    {item.subtitle}
                                </p>
                            </div>
                            <div className="h-6 w-6 md:h-10 md:w-10 md:ml-5 rounded-full bg-[#E9E2D2] dark:bg-[#E9E2D2] flex items-center justify-center">
                            </div>
                        </div>

                        {/* Timeline Content */}
                        <div className="relative -mt-10 md:mt-0 md:pl-10 md:w-full w-1/2 ml-auto">
                            <div className="text-[#E9E2D2] dark:text-[#E9E2D2]">{item.content}</div>
                        </div>


                    </div>
                ))}

                {/* Timeline Line */}
                <div
                    style={{
                        height: height + "px",
                    }}
                    className="absolute left-36 md:left-[300px] top-0 overflow-hidden w-[3px] md:w-[7px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute top-0 w-full bg-[#E9E2D2] rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};  
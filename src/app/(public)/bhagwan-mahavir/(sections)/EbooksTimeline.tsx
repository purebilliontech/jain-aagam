"use client";
import Typography from "@/components/common/typography";
import { useScroll, useTransform, motion, useInView } from "motion/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  subtitle: string;
  content: React.ReactNode;
  alignment?: "left" | "right";
  image?: string;
}

const TimelineItem = ({ item, index }: { item: TimelineEntry; index: number }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: false, amount: 0.2 });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smoother easing
        staggerChildren: 0.2
      }}
      key={index}
      className={`flex flex-col ${index % 2 === 1 ? "md:flex-row" : "md:flex-row-reverse"
        } justify-between py-10`}
    >
      {/* Content Section */}
      <motion.div
        className={`w-full md:w-5/12 flex flex-col ${index % 2 === 1 ? "md:mr-auto" : "md:ml-auto"}`}
        initial={{ opacity: 0, x: index % 2 === 1 ? -20 : 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 1 ? -20 : 20 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="mb-10 flex flex-col items-center justify-center ">
          <Typography variant='p' className='font-sans font-bold text-xs text-secondary-ui tracking-[4px] text-center mb-1.5'>{item.subtitle}</Typography>

          <Typography variant="h2" className="text-primary-ui text-center">
            {item.title}
          </Typography>
          <Image src={'/static/ebooks-slider-line.svg'} width={400} height={24} alt='line' className="mt-3" />
        </div>

        <Typography variant='p' className='font-sans text-foreground-ui text-justify'>{item.content}</Typography>

      </motion.div>

      {/* Image Section */}
      <motion.div
        className={`w-full md:w-5/12 mt-6 md:mt-0 ${index % 2 === 1 ? "md:ml-auto" : "md:mr-auto"}`}
        initial={{ opacity: 0, x: index % 2 === 1 ? 20 : -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 1 ? 20 : -20 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        {item.image ? (
          <div className=" rounded-md overflow-hidden aspect-[4/3] shadow-md">
            <Image
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover object-top"
              width={600}
              height={600}
            />
          </div>
        ) : (
          <div className="bg-neutral-700 rounded-md aspect-[4/3] flex items-center justify-center p-8 shadow-md">
            <h3 className="text-white text-xl md:text-2xl uppercase font-medium text-center">
              {item.title}
            </h3>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export const EbooksTimeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <div
      className="w-full relative bg-white dark:bg-neutral-50 font-serif pt-10"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-12 md:pb-20 px-4 md:px-6">
        {data.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}

        {/* Center Timeline Animation - Smoother and more elegant */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-1 md:w-2 h-full bg-gradient-to-b from-transparent via-neutral-200 to-transparent hidden md:block">
          {/* This is the animated rectangle that moves down as you scroll */}
          <motion.div
            style={{
              top: 0,
              height: 120, // Taller rectangle for more presence
              y: heightTransform,
              opacity: opacityTransform,
              boxShadow: "0 0 10px rgba(217, 119, 6, 0.5)" // Subtle glow effect
            }}
            className="absolute w-full bg-gradient-to-b from-amber-500 via-amber-600 to-amber-500 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
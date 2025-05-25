"use client";
import SectionTitle from "@/components/common/SectionTitle";
import Image from "next/image";
import React from "react";

const WhatAreAgams = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionTitle
          title="What are Aagams?"
          subtitle="THE TIMELESS WISDOM"
          className="mt-20"
        />

        {/* Description Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 my-12 md:my-16 lg:my-20">
          <div className="w-full md:w-1/2">
            <div className="md:w-[400px] md:h-[400px] w-[300px] h-[300px] mx-auto  aspect-square overflow-hidden relative rounded-lg">
              <Image
                src="/static/home/nirvan.jpg"
                alt="Nirvan Aagam"
                width={500}
                height={500} // Next.js still needs these for optimization
                className=" w-full h-full object-cover object-top"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 text-justify text-[#8E8777] mt-3 md:mt-0">
            <p className="p-4 md:p-0">
              Jain Aagams are the sacred scriptures of Jainism – the texts that
              encapsulate the infinite wisdom expounded by Bhagwan Mahavir, the
              24th Tirthankar of Jainism. After attaining kevlagnan or
              omniscience, Bhagwan Mahavir illuminated the world with knowledge
              that transcended the past, present and future, encompassing every
              possible subject of the whole universe. The vast knowledge was
              then assimilated by his disciples, the Gandhars and the Acharyas,
              into Aagam scriptures. During Bhagwan Mahavir’s presence, there
              were countless Aagams. But with time, this legacy of wisdom slowly
              and gradually started depleting. Today, the world has preciously
              conserved 32 of these Aagams as per the Sthankwasi Tradition and
              45 of them as per the Derawasi Tradition.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhatAreAgams;

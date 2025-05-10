'use client'
import SectionTitle from "@/components/common/SectionTitle";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WhatAreAgams = () => {
  // Separate state for each popup
  const [isLeftPopupVisible, setIsLeftPopupVisible] = useState(false);
  const [isRightTopPopupVisible, setIsRightTopPopupVisible] = useState(false);
  const [isRightBottomPopupVisible, setIsRightBottomPopupVisible] = useState(false);

  const toggleLeftPopup = () => {
    setIsLeftPopupVisible(!isLeftPopupVisible);
  };

  const toggleRightTopPopup = () => {
    setIsRightTopPopupVisible(!isRightTopPopupVisible);
  };

  const toggleRightBottomPopup = () => {
    setIsRightBottomPopupVisible(!isRightBottomPopupVisible);
  };

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionTitle title="What are Aagams?" subtitle="THE TIMELESS WISDOM" className="mt-20" />
        
        {/* Description Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 my-12 md:my-16 lg:my-20">
          <div className="w-full md:w-1/2">
            <Image
              src={"/static/placeholder.png"}
              width={500}
              height={500}
              alt="Image for presentation"
              className="w-full h-auto"
            />
          </div>
          <div className="w-full md:w-1/2 text-[#8E8777] mt-6 md:mt-0">
            <p>
            Jain Aagams are the sacred scriptures of Jainism – the texts that encapsulate the infinite wisdom expounded by Bhagwan Mahavir, the 24th Tirthankar of Jainism. After attaining kevlagnan or omniscience, Bhagwan Mahavir illuminated the world with knowledge that transcended the past, present and future, encompassing every possible subject of the whole universe. The vast knowledge was then assimilated by his disciples, the Gandhars and the Acharyas, into Aagam scriptures. During Bhagwan Mahavir’s presence, there were countless Aagams. But with time, this legacy of wisdom slowly and gradually started depleting. Today, the world has preciously conserved 32 of these Aagams as per the Sthankwasi Tradition and 45 of them as per the Derawasi Tradition. 
            </p>
          </div>
        </div>

        {/* Tree with Interactive Elements */}
        <div className="relative flex items-center justify-center my-12 md:my-16 lg:my-20">
          {/* Main Tree Image */}
          <Image
            src={"/static/tree1.png"}
            width={2000}
            height={1000}
            alt="Tree diagram of Aagams"
            className="w-full h-auto"
          />

          {/* Left Button with Line */}
          <div className="absolute left-0 sm:left-[5%] md:left-[10%] lg:left-[12%] top-1/4 flex items-center">
            <motion.div
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-[#E3DFD5] drop-shadow-xl flex flex-col items-center justify-center font-mono text-xs sm:text-sm md:text-base lg:text-xl text-[#686151] cursor-pointer z-10"
              onClick={toggleLeftPopup}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <h2>Upang</h2>
              <h2>Aagams</h2>
            </motion.div>
            
            {/* Horizontal line and dot connecting to tree */}
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-[50vw] sm:w-[20vw] md:w-[15vw] lg:w-[20vw] h-[1px] bg-[#D9D2BF] transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-[50vw] sm:left-[20vw] md:left-[15vw] lg:left-[20vw] h-2 w-2 rounded-full bg-[#D9D2BF] transform -translate-y-1/2"></div>
            </div>
          </div>

          {/* Left Popup */}
          <AnimatePresence>
            {isLeftPopupVisible && (
              <motion.div
                className="absolute left-0 sm:left-[5%] md:left-[10%] lg:left-[0.1%] top-[calc(20%-80px)] w-64 sm:w-72 md:w-80 z-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4">
                  <div className="flex flex-col items-end">
                    <h1 className="font-mono text-lg sm:text-xl md:text-2xl leading-tight text-right">
                      Ang Aagams
                    </h1>
                    <p className="text-sm sm:text-md md:text-lg text-right text-foreground-ui font-mono break-after-auto mt-1">
                      The core texts like the trunk of a tree
                    </p>
                  </div>
                  <div className="w-2 sm:w-2.5 md:w-3 h-14 bg-[#DED2C2]"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Top Button with Line */}
          <div className="absolute right-0 sm:right-[5%] md:right-[10%] lg:right-[15%] top-1/3 flex items-center">
            <div className="relative order-2">
              <div className="absolute top-1/2 right-0 w-[50vw] sm:w-[20vw] md:w-[15vw] lg:w-[26vw] h-[1px] bg-[#D9D2BF] transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 right-[50vw] sm:right-[20vw] md:right-[15vw] lg:right-[26vw] h-2 w-2 rounded-full bg-[#D9D2BF] transform -translate-y-1/2"></div>
            </div>
            
            <motion.div
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-[#E3DFD5] drop-shadow-xl flex flex-col items-center justify-center font-mono text-xs sm:text-sm md:text-base lg:text-xl text-[#686151] cursor-pointer z-10 order-1"
              onClick={toggleRightTopPopup}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <h2>Upang</h2>
              <h2>Aagams</h2>
            </motion.div>
          </div>

          {/* Right Top Popup */}
          <AnimatePresence>
            {isRightTopPopupVisible && (
              <motion.div
                className="absolute right-0 sm:right-[5%] md:right-[10%] lg:right-[-10%] top-[calc(25%-80px)] w-64 sm:w-72 md:w-80 z-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4">
                  <div className="w-2 sm:w-2.5 md:w-3 h-14 bg-[#DED2C2] order-1"></div>
                  <div className="flex flex-col items-start order-2">
                    <h1 className="font-mono text-lg sm:text-xl md:text-2xl leading-tight text-left">
                      Ang Aagams
                    </h1>
                    <p className="text-sm sm:text-md md:text-lg text-left text-foreground-ui font-mono break-after-auto mt-1">
                      The core texts like the trunk of a tree
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Bottom Button with Line */}
          <div className="absolute right-0 sm:right-[5%] md:right-[10%] lg:right-[15%] bottom-1/5 flex items-center">
            <div className="relative order-2">
              <div className="absolute top-1/2 right-0 w-[50vw] sm:w-[20vw] md:w-[15vw] lg:w-[25vw] h-[1px] bg-[#D9D2BF] transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 right-[50vw] sm:right-[20vw] md:right-[15vw] lg:right-[25vw] h-2 w-2 rounded-full bg-[#D9D2BF] transform -translate-y-1/2"></div>
            </div>
            
            <motion.div
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-[#E3DFD5] drop-shadow-xl flex flex-col items-center justify-center font-mono text-xs sm:text-sm md:text-base lg:text-xl text-[#686151] cursor-pointer z-10 order-1"
              onClick={toggleRightBottomPopup}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <h2>Upang</h2>
              <h2>Aagams</h2>
            </motion.div>
          </div>

          {/* Right Bottom Popup */}
          <AnimatePresence>
            {isRightBottomPopupVisible && (
              <motion.div
                className="absolute right-0 sm:right-[5%] md:right-[10%] lg:right-[-10%] bottom-[calc(25%+40px)] w-64 sm:w-72 md:w-80 z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4">
                  <div className="w-2 sm:w-2.5 md:w-3 h-14 bg-[#DED2C2] order-1"></div>
                  <div className="flex flex-col items-start order-2">
                    <h1 className="font-mono text-lg sm:text-xl md:text-2xl leading-tight text-left">
                      Ang Aagams
                    </h1>
                    <p className="text-sm sm:text-md md:text-lg text-left text-foreground-ui font-mono break-after-auto mt-1">
                      The core texts like the trunk of a tree
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default WhatAreAgams;
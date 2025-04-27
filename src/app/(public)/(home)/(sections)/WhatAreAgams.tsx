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
      <section className="max-w-7xl mx-auto p-8">
        <SectionTitle title="What are Aagams?" subtitle="THE TIMELESS WISDOM" />
        <div className="flex flex-col md:flex-row items-center gap-16 mt-20 mb-20">
          <div className="md:w-1/2">
            <Image
              src={"/static/placeholder.png"}
              width={500}
              height={500}
              alt="Image for presentation"
              className="w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 text-[#8E8777]">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga
              libero molestias aperiam inventore dolorem ad deserunt sequi
              maiores, natus corporis tempore ea ducimus sit cumque.
              Exercitationem laudantium itaque velit nam maxime explicabo
              reiciendis, nesciunt beatae animi? Architecto autem dicta, maiores
              nihil, repudiandae ratione quaerat deserunt nesciunt nisi quam
              minima corporis!
            </p>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <Image
            src={"/static/tree1.png"}
            width={2000}
            height={1000}
            alt="Image for presentation"
            className="mx-auto mt-20 mb-20 w-full h-auto"
          />

          {/* Left Popup */}
          <AnimatePresence>
            {isLeftPopupVisible && (
              <motion.div
                className="w-64 absolute top-18 left-4 z-20 md:block hidden"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex items-start gap-4 p-4">
                  <div className="flex flex-col items-end">
                    <h1 className="font-mono text-2xl leading-6 text-right">
                      Ang Aagams
                    </h1>
                    <p className="text-md text-right text-foreground-ui font-mono break-after-auto mt-1">
                      The core texts like the trunk of a tree
                    </p>
                  </div>
                  <div className="w-3 h-14 bg-[#DED2C2]"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile view for left popup */}
          <AnimatePresence>
            {isLeftPopupVisible && (
              <motion.div
                className="w-64 absolute top-10 left-1/2 transform -translate-x-1/2 z-20 md:hidden block"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex items-start gap-4 p-4">
                  <div className="flex flex-col items-center w-full">
                    <h1 className="font-mono text-xl leading-6 text-center">
                      Ang Aagams
                    </h1>
                    <p className="text-sm text-center text-foreground-ui font-mono break-after-auto mt-1">
                      The core texts like the trunk of a tree
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Left Button (Upang Aagams) */}
          <motion.div
            className="w-16 h-16 md:w-30 md:h-30 rounded-full bg-[#E3DFD5] drop-shadow-xl flex flex-col items-center justify-center font-mono text-xs md:text-xl text-[#686151] absolute top-48 left-0 sm:left-10 md:left-40 cursor-pointer z-10"
            onClick={toggleLeftPopup}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <h2>Upang</h2>
            <h2>Aagams</h2>
            <div className="w-12 sm:w-20 md:w-96 h-[1px] bg-[#D9D2BF] left-16 sm:left-20 md:left-30 absolute"></div>
            <div className="h-1 w-1 md:h-2 md:w-2 rounded-full bg-[#D9D2BF] absolute left-12 sm:left-20 md:left-96"></div>
          </motion.div>

          {/* Right Top Popup */}
          <AnimatePresence>
            {isRightTopPopupVisible && (
              <motion.div
                className="w-64 absolute top-40 right-4 z-20 md:block hidden"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex items-start gap-4 p-4">
                  <div className="w-3 h-14 bg-[#DED2C2]"></div>
                  <div className="flex flex-col items-start">
                    <h1 className="font-mono text-2xl leading-6 text-left">
                      Ang Aagams
                    </h1>
                    <p className="text-md text-left text-foreground-ui font-mono break-after-auto mt-1">
                      The core texts like the trunk of a tree
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile view for right top popup */}
          <AnimatePresence>
            {isRightTopPopupVisible && (
              <motion.div
                className="w-64 absolute top-1/3 left-1/2 transform -translate-x-1/2 z-20 md:hidden block"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex items-start gap-4 p-4">
                  <div className="flex flex-col items-center w-full">
                    <h1 className="font-mono text-xl leading-6 text-center">
                      Ang Aagams
                    </h1>
                    <p className="text-sm text-center text-foreground-ui font-mono break-after-auto mt-1">
                      The core texts like the trunk of a tree
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Top Button (Upang Aagams) */}
          <motion.div
            className="w-16 h-16 md:w-30 md:h-30 rounded-full bg-[#E3DFD5] drop-shadow-xl flex flex-col items-center justify-center font-mono text-xs md:text-xl text-[#686151] absolute top-70 right-0 sm:right-10 md:right-40 cursor-pointer z-10"
            onClick={toggleRightTopPopup}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <h2>Upang</h2>
            <h2>Aagams</h2>
            <div className="w-12 sm:w-20 md:w-80 h-[1px] bg-[#D9D2BF] right-16 sm:right-20 md:right-30 absolute"></div>
            <div className="h-1 w-1 md:h-2 md:w-2 rounded-full bg-[#D9D2BF] absolute right-12 sm:right-20 md:right-80"></div>
          </motion.div>

          {/* Right Bottom Popup */}
          <AnimatePresence>
            {isRightBottomPopupVisible && (
              <motion.div
                className="w-64 absolute top-105 right-0 z-20 md:block hidden"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex items-start gap-4 p-4">
                  <div className="w-3 h-14 bg-[#DED2C2]"></div>
                  <div className="flex flex-col items-start">
                    <h1 className="font-mono text-2xl leading-6 text-left">
                      Ang Aagams
                    </h1>
                    <p className="text-md text-left text-foreground-ui font-mono break-after-auto mt-1">
                      The core texts like the trunk of a tree
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile view for right bottom popup */}
          <AnimatePresence>
            {isRightBottomPopupVisible && (
              <motion.div
                className="w-64 absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 md:hidden block"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex items-start gap-4 p-4">
                  <div className="flex flex-col items-center w-full">
                    <h1 className="font-mono text-xl leading-6 text-center">
                      Ang Aagams
                    </h1>
                    <p className="text-sm text-center text-foreground-ui font-mono break-after-auto mt-1">
                      The core texts like the trunk of a tree
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Bottom Button (Upang Aagams) */}
          <motion.div
            className="w-16 h-16 md:w-30 md:h-30 rounded-full bg-[#E3DFD5] drop-shadow-xl flex flex-col items-center justify-center font-mono text-xs md:text-xl text-[#686151] absolute bottom-20 right-0 sm:right-10 md:right-40 cursor-pointer z-10"
            onClick={toggleRightBottomPopup}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <h2>Upang</h2>
            <h2>Aagams</h2>
            <div className="w-12 sm:w-20 md:w-80 h-[1px] bg-[#D9D2BF] right-16 sm:right-20 md:right-30 absolute"></div>
            <div className="h-1 w-1 md:h-2 md:w-2 rounded-full bg-[#D9D2BF] absolute right-12 sm:right-20 md:right-80"></div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default WhatAreAgams;
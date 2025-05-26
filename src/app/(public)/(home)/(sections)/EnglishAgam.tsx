"use client";

import FEButton from "@/components/common/FEButton";
import Image from "next/image";
import React, { useState } from "react";

import Typography from "@/components/common/typography";
import EnglishAgamForm from "./EnglishAgamForm";


const EnglishAgam = () => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <section className="relative h-full px-5 py-10 md:px-10 bg-[url('/static/english-agam-bg.png')] bg-cover bg-fixed bg-center lg:px-20 xl:px-48">
      <Image
        className="-z-10 sticky top-0 left-0 inset-0 object-cover object-center"
        src={"/static/english-agam-bg.png"}
        fill
        alt="Agams BG"
        priority
      />

      <div className="z-50 bg-[#E9E2D2ED] p-5 md:p-10 lg:p-14 max-w-7xl mx-auto rounded-4xl flex flex-col md:flex-row gap-5 md:gap-10">
        <div className="w-full pt-2 md:pt-0 md:w-1/3 flex justify-center items-center">
          <Image
            src={"/static/home/english-agam-book.png"}
            width={400}
            height={600}
            alt="English Aagam Book"
            className="mx-auto w-full h-fit object-contain drop-shadow-2xl shadow-2xl "
          />
        </div>
        <div className="w-full md:w-2/3 pt-3">
          <Typography variant="h2" className="text-typography text-center md:text-left">
            Launching ENGLISH Aagams
          </Typography>
          <Typography variant="p" className="text-typography  mt-5 mb-8 text-justify">
            The Jain Aagams, originally written in the Aradhamagadhi Prakrit
            script, have been meticulously translated into Indian scripts like
            Hindi, Gujarati, Marathi, Kannada, Tamil and more by Sadhu-Sadhvijis
            over the last centuries. With the inspiration and blessings of Param
            Gurudev Shree Namramuni Maharaj Saheb, a pathbreaking effort is
            being made to conserve these precious scriptures for the coming
            generations. The Jain Aagams are being translated into English for
            global accessibility, with absolute authenticity being preserved by
            highly educated Jain sadhu-sadhvijis and distinguished scholars and
            experts.{" "}
          </Typography>
          <Typography variant="p" className="text-typography  mt-5 mb-8 text-justify">
            The first of these Aagams, Shree Upasakdashang Sutra, has been
            launched in 2024 and is now available for purchase.
          </Typography>
          <div className="flex justify-center md:justify-start">
            <FEButton onClick={() => setIsOpen(true)}>BOOK NOW</FEButton>
          </div>
        </div>
      </div>

      <EnglishAgamForm isOpen={isOpen} setIsOpen={setIsOpen} />

    </section>
  );
};

export default EnglishAgam;

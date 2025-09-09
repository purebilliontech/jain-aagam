import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const TopSection = () => {
  return (
    <section className="relative w-screen h-[35vh] sm:h-[40vh] md:h-[70vh]">
      <Image
        src={"/static/banners/ArtVenue.png"}
        alt={'Art Gallery Banner'}
        width={2000}
        height={2000}
        unoptimized
        className="w-screen h-full  absolute -z-50 top-0 left-0 hidden md:block"
      />
      <Image
        src={"/static/banners/ArtVenue.png"}
        alt={'Art Gallery Banner'}
        width={2000}
        height={2000}
        unoptimized
        className="w-screen h-full block md:hidden  absolute -z-50 top-0 left-0"
      />
      <a href="#timings" className="absolute md:bottom-5 sm:right-[20%] md:right-[18%] right-[15%] bottom-2 z-50">
        <Button variant="secondary" className="bg-accent-ui text-white shadow-xs max-md:h-5 max-md:w-16 max-md:rounded-sm max-md:text-[8px]">
          Timings
        </Button>
      </a>

    </section>
  );
};

export default TopSection;

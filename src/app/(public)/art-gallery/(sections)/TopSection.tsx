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
        className="w-screen h-full  absolute -z-50 top-0 left-0 hidden md:block"
      />
      <Image
        src={"/static/banners/ArtVenue.png"}
        alt={'Art Gallery Banner'}
        width={2000}
        height={2000}
        className="w-screen h-full block md:hidden  absolute -z-50 top-0 left-0"
      />
      <a href="#timings" className="absolute bottom-5 right-[20%] z-50">
        <Button variant="secondary" className="bg-accent-ui text-white shadow-xs ">
          Timings
        </Button>
      </a>

    </section>
  );
};

export default TopSection;

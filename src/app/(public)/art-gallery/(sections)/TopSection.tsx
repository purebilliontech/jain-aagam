import Image from "next/image";
import React from "react";

const TopSection = () => {
  return (
    <section className="relative w-screen h-[35vh] sm:h-[40vh] md:h-[70vh]">
      <Image
        src={"/static/banners/ArtGalleryDesktop.png"}
        alt={'Art Gallery Banner'}
        width={2000}
        height={2000}
        className="w-screen h-full  absolute -z-50 top-0 left-0 hidden md:block"
      />
       <Image
        src={"/static/banners/ArtGalleryMobile.png"}
        alt={'Art Gallery Banner'}
        width={2000}
        height={2000}
        className="w-screen h-full block md:hidden  absolute -z-50 top-0 left-0"
      />
    </section>
  );
};

export default TopSection;

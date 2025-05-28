import Image from "next/image";
import React from "react";

const TopSection = () => {
  return (
    <section className="relative w-screen h-[35vh] sm:h-[40vh] md:h-[70vh]">
      <Image
        src={"/static/bhagwan/BhagwanMahavirDesktop.png"}
        alt={'Art Gallery Banner'}
        width={2000}
        height={2000}
        className="w-screen h-full  absolute -z-50 top-0 left-0 hidden md:block"
      />
      <Image
        src={"/static/bhagwan/BhagwanMahavirMobile.png"}
        alt={'Art Gallery Banner'}
        width={2000}
        height={2000}
        className="w-screen h-full block md:hidden  absolute -z-50 top-0 left-0"
      />
      <div className="absolute top-1/2 right-[5%] translate-y-[-50%] sm:right-[10%] flex flex-col items-end">
        <h1 className="font-semibold text-amber-400 text-4xl sm:text-6xl md:text-8xl font-mono text-right">
          Bhagwan
        </h1>
        <h1 className="font-semibold text-amber-400 text-4xl sm:text-6xl md:text-8xl font-mono text-right">
          Mahavir
        </h1>
        <h2 className="font-normal text-amber-400 text-lg sm:text-2xl md:text-4xl font-mono text-right w-[70%] md:w-full self-end">
          The 24th Tirthankar of Jainism
        </h2>
      </div>
    </section>
  );
};

export default TopSection;

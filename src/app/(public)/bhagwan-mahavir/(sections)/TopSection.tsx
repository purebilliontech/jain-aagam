import InnerBanner from "@/components/common/InnerBanner";
import React from "react";

const TopSection = () => {
  return (
    <InnerBanner
      image={"/static/bhagwan/banner1.jpg"}
      alt="Image for presentation"
    >
      <div className="absolute top-1/2 right-[5%] translate-y-[-50%] sm:right-[10%]">
        <h1 className="font-semibold text-amber-400 text-4xl sm:text-6xl md:text-8xl font-mono text-right">
          Bhagwan
        </h1>
        <h1 className="font-semibold text-amber-400 text-4xl sm:text-6xl md:text-8xl font-mono text-right">
          Mahavir
        </h1>
        <h2 className="font-normal text-amber-400 text-lg sm:text-2xl md:text-4xl font-mono text-right  ">
          The 24th Tirthankar of Jainism
        </h2>
      </div>
    </InnerBanner>
  );
};

export default TopSection;

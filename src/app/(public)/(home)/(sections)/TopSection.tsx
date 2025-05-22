import type { CoverImageDTO } from "@/schema/pageComponents";
import Image from "next/image";
import React from "react";

const TopSection = ({ coverImage }: { coverImage: CoverImageDTO | null }) => {
  return (
    <section className="min-h-screen relative flex flex-col md:flex-row items-center justify-center md:justify-around mx-auto">
      <Image
        src={coverImage?.media.url ?? "/static/placeholder.png"}
        alt={coverImage?.media.alt ?? "Image for presentation"}
        width={2000}
        height={2000}
        className="w-screen h-screen object-cover absolute -z-50 top-0 left-0 object-center"
      />
      {/* <div className="text-center p-4 md:text-left ">
        <h2 className="text-primary-ui font-sans text-5xl md:text-8xl font-semibold">
          JAIN
        </h2>
        <h2 className="text-primary-ui font-sans text-5xl md:text-8xl font-semibold">
          AAGAM
        </h2>
        <h3 className="text-primary-ui font-mono text-2xl md:text-4xl font-medium leading-normal mt-6">
          The holy scriptures of Jainism
        </h3>
      </div> */}
    </section>
  );
};

export default TopSection;

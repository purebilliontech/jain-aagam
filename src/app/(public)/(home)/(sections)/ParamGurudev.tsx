import SectionTitle from "@/components/common/SectionTitle";
import Typography from "@/components/common/typography";
import Image from "next/image";
import React from "react";

function ParamGurudev() {
  return (
    <div className="bg-card-ui">

      <section className="max-w-7xl mx-auto p-5 py-10 md:px-25 ">
        <SectionTitle subtitle="THE INSPIRATION" title="Param Gurudev" className="pb-10" />
        <div className=" flex flex-col items-center justify-center md:flex-row md:justify-between  gap-10 ">
          <Image
            src={"/static/home/ParamGurudev.jpg"}
            height={350}
            width={350}
            className=" md:h-[450px] md:w-[450px] "
            alt="param gurudev "
          />
          <div className="p-5" >
            <Typography variant="p" className="text-primary-ui text-justify">
              The Jain Aagam Mission is inspired and led by{" "}
              <Typography variant="span" className="text-accent-foreground-ui  text-justify font-semibold" >
                Rashtrasant Param Gurudev Shree Namramuni Maharaj Saheb
              </Typography>
              , a renowned Jain spiritual leader and the founder of Parasdham.
            </Typography>
            <Typography variant="p" className="text-primary-ui  text-justify mt-4">
              Param Gurudev&apos;s profound knowledge of these sacred Aagam
              scriptures, his contemplation on the sutras in the form of Vachanis
              and his insightful expositions on these Shastras unveiling their
              deepest secrets are a treasure of wisdom that help one interweave
              timeless spiritual wisdom into daily life to experience positivity,
              prosperity and peace. The Jain Aagam Mission initiative inspired by
              Param Gurudev aims to take this legacy of Bhagwan Mahavir&apos;s
              wisdom to every home and heart across the world.
            </Typography>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ParamGurudev;

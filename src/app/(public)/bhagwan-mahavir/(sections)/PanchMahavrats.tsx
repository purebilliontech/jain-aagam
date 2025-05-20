import SectionTitle from "@/components/common/SectionTitle";
import Typography from "@/components/common/typography";
import Image from "next/image";
import React from "react";

const PanchMahavrats = () => {
  const principles = [
    {
      name: "Ahimsa",
      sanskrit: "Non-violence",
      image: "/static/panchmahavrats/ahimsa.png",
      description:
        "Ahimsa is the principle of non-violence, which includes not causing harm to any living being through thoughts, words, or actions.",
    },
    {
      name: "Satya",
      sanskrit: "Truth",
      image: "/static/panchmahavrats/satya.png",
      description:
        "Satya emphasizes the importance of truthfulness in all aspects of life, encouraging honesty and integrity.",
    },
    {
      name: "Achaurya",
      sanskrit: "Non-stealing",
      image: "/static/panchmahavrats/achaurya.png",
      description:
        "Achaurya is the vow of non-stealing,  which involves respecting others' property and not taking anything that does not belong to oneself.",
    },
    {
      name: "Brahmacharya",
      sanskrit: "Celibacy",
      image: "/static/panchmahavrats/brahmacharya.png",
      description:
        "Brahmacharya is the practice of celibacy or self-restraint, focusing on controlling desires and maintaining purity of mind and body.",
    },
    {
      name: "Aparigraha",
      sanskrit: "Non-possessiveness",
      image: "/static/panchmahavrats/aparigraha.png",
      description:
        "Aparigraha teaches non-possessiveness, encouraging individuals to live a life free from materialistic attachments and greed.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 bg-white">
      {/* Header Section */}
      <div className="text-center mb-40">
        <SectionTitle title="Panch Mahavrats" subtitle="THE FIVE GREAT VOWS" />

        <Typography variant="p" className="mx-auto mt-9 text-justify  text-primary-foreground-ui">
          The Panch Mahavrats are the five great vows that form the foundation
          of Jain ethical practice. These principles guide individuals towards a
          life of non-violence, truthfulness, non-stealing, celibacy, and
          non-possessiveness.
        </Typography>
      </div>

      {/* Cards Grid */}
      <div
        className="flex flex-wrap gap-16 md:gap-12 justify-center items-center"
      >
        {principles.map((principle, index) => (
          <div key={index} className="relative mb-16 mt-20 flex-1 min-w-[300px] max-w-[400px]">
            {/* Card with curved top cutout */}
            <div className="relative bg-[#e9e2d2] rounded-3xl w-full overflow-hidden">

              {/* Card Content */}
              <div className="pt-44 px-10 pb-10 mt-0 text-center h-full">
                <Typography variant="h3" className=" font-mono text-typography font-semibold ">
                  {principle.name}
                </Typography>
                <Typography variant="h4" className="text-foreground-ui font-semibold font-mono italic">
                  {principle.sanskrit}
                </Typography>
                <Typography variant="p" className="text-typography  text-justify mt-4 ">
                  {principle.description}
                </Typography>
              </div>
              <div className="flex-1"></div>
            </div>

            {/* Circular Image */}
            <div className="absolute w-3/4 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="rounded-full overflow-hidden border-6 border-white shadow-md">
                <Image
                  src={principle.image}
                  alt={principle.name}
                  className="w-full h-full object-cover"
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanchMahavrats;

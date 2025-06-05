"use client";

import SectionTitle from "@/components/common/SectionTitle";
import Typography from "@/components/common/typography";
import YTVideoPlayer from "@/components/common/YTVideoPlayer";
import React from "react";

const mahaMantras = [
  {
    line: "Namo Arihantanam",
    meaning: "I bow down to the Arihants",
  },
  {
    line: "Namo Siddhanam",
    meaning: "I bow down to the Siddhas",
  },
  {
    line: "Namo Ayariyanam",
    meaning: "I bow down to the Acharyas",
  },
  {
    line: "Namo Uvajjhayanam",
    meaning: "I bow down to the Upadhyays",
  },
  {
    line: "Namo Loe Savva-Sahunam",
    meaning: "I bow down to all the Sadhu-Sadhvijis in the world",
  },
  {
    line: "Eso Panch Namokkaro, Savva Paav Panaasano",
    meaning:
      "The salutations to these five great ones,has the power to destroy all sins ",
  },

  {
    line: "Mangalam Cha Savvesim, Padhamam Havai Mangalam",
    meaning:
      "Amongst all that is auspicious, the auspiciousness of this is the greatest",
  },
];

const NavkarMahamantrs = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto p-5 my-20">
        <SectionTitle
          title="Navkar Mahamantra"
          subtitle="THE UNIVERSAL MANTRA"
        />
        <div className="flex flex-col md:flex-row max-md:gap-10 items-center md:mt-10">
          <div className="self-center mx-auto">
            {mahaMantras.map((mantra, index) => (
              // <div key={index} onClick={() => setSelectedMeaning(mantra.meaning)}>
              //     <Typography variant='h4' key={index} className={`text-center hover:font-bold font-mono font-semibold  cursor-pointer ${mantra.meaning === selectedMeaning ? "text-primary-ui" : "text-typography"}`}>{mantra.line}</Typography>
              // </div>

              <div key={index}>
                <Typography
                  variant="h4"
                  className={`text-center  font-normal text-typography `}
                >
                  {mantra.line}
                </Typography>
                <Typography
                  variant="h5"
                  className="text-center font-normal italic text-primary-ui "
                >
                  {(() => {
                    const parts = mantra.meaning.split(/,(.+)/); // split at first comma only
                    return (
                      <>
                        {parts[0]}
                        {parts[1] && (
                          <>,
                            <br />
                            {parts[1].trim()}
                          </>
                        )}
                      </>
                    );
                  })()}
                </Typography>
              </div>
            ))}
          </div>

          {/* <div className="md:w-1/3">
                        <div className="px-6 h-60 flex items-center md:w-60 lg:w-80 md:ml-auto rounded-4xl shadow-xl bg-[#DCD3C2]">
                            <Typography variant='h4' className='font-mono text-typography text-center font-semibold'>
                                {selectedMeaning}
                            </Typography>
                        </div>
                    </div> */}
        </div>
        <Typography variant="p" className="text-justify text-typography my-20">
          Namaskar Mahamantra is a universal Mantra of peace and Maitri (friendship) towards every living being. While most Mantras are dedicated to individuals, Namaskar Mantra is the only mantra that is dedicated to inner qualities.
          <br />
          <br />

          Jainism believes that every soul has the potential to become God and attain absolute purity. Because purity is Godliness. Hence, in Namaskar Mantra, one bows down to every soul who has achieved purity or is striving to achieve purity. Also known as the Navkar Mantra, this is a timeless mantra which has no creator, and no destroyer. Every syllable of this Mantra possesses infinite meanings, potential and energy. Any form of physical illness, mental negativity, critical obstacles can be erased by this selfless mantra, and one can experience a rejuvenation of positivity in life.

          <br /><br />

          The way a child can approach his mother at any hour of the day without hesitation, this mantra can also be recited anytime, anywhere and by anyone - to experience peace, positivity and feel absolutely relaxed.

        </Typography>

        <YTVideoPlayer
          className="max-w-4xl mx-auto rounded-lg overflow-hidden flex flex-col items-center justify-center "
          videoUrl={"https://www.youtube.com/watch?v=ia0c2tzXXqE"}
        />
      </section>
    </>
  );
};

export default NavkarMahamantrs;

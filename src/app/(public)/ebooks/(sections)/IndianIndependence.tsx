import SectionTitle from "@/components/common/SectionTitle";
import React from "react";

const IndianIndependence = () => {
  return (
    <>
      <section className="max-w-7xl p-5 mx-auto bg-white py-26">
        <SectionTitle title="Indian Independence" subtitle="WORLD INFLUENCE" />

        <div className="flex flex-wrap gap-4 mb-8 mt-20">
          <div className="flex-1 bg-foreground-ui p-6 flex items-center justify-center rounded-lg h-96">
            <p className="text-center text-white font-medium">
              GANDHIJI & BHAGWAN ANUVR PHOTO
            </p>
          </div>

          <div className="grid md:grid-cols-1 grid-cols-2 gap-5">
            <div className="bg-foreground-ui p-4 flex items-center justify-center rounded-lg h-40">
              <p className="text-center text-white font-medium">
                DELHI MUSEUM PHOTOS
              </p>
            </div>
            <div className="flex-1 bg-foreground-ui p-4 flex items-center justify-center rounded-lg h-40">
              <p className="text-center text-white">EMPTY</p>
            </div>
          </div>

          <div className="bg-foreground-ui p-4 flex items-center justify-center rounded-lg h-96 w-full md:w-80">
            <p className="text-center text-white font-medium">
              GANDHIJI&apos;S HANDWRITINGS
            </p>
          </div>
        </div>

        {/* Lorem Ipsum Text */}
        <div className="my-40">
          <p className="text-xl font-sans text-gray-500">
            The goal of Bhagwan Mahavir&apos;s principles is to attain spiritual
            peace, secure a better rebirth, and ultimately achieve liberation
            from the cycle of birth and death. It is the path to end sorrow and
            suffering permanently. His timeless teachings not only uplift the
            individual soul but also foster a world filled with peace, harmony,
            and compassion for every living being.
          </p>
          <p className="text-xl font-sans text-gray-500 mt-4">
            Inspired by Bhagwan Mahavir’s foremost principle of Ahimsa
            (non-violence), Mahatma Gandhi led India’s independence movement
            through peaceful, bloodless resistance, setting a global example of
            nonviolent transformation. In his footsteps, Nelson Mandela devoted
            his life to liberating South Africa through the same unwavering
            commitment to peace and non-violence. His spirit and ideologies
            continue inspiring the world even today.
          </p>
        </div>

        {/* Bottom Flex Section */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-10 mb-8 justify-center">
          <div className=" bg-foreground-ui p-4 flex items-center justify-center rounded-lg h-96 w-full md:w-auto">
            <p className="text-center text-white font-medium">
              GANDHIJI & BICHARJI SWAMI PAINTING
            </p>
          </div>
          <div className=" bg-foreground-ui p-4 flex items-center justify-center rounded-lg h-96 w-full md:w-auto">
            <p className="text-center text-white font-medium">
              GANDHIJI & CHIVALU MARRJI MAHASATIH PHOTO
            </p>
          </div>
          <div className="bg-foreground-ui p-4 flex items-center justify-center rounded-lg h-96 w-full md:w-auto">
            <p className="text-center text-white font-medium">
              GANDHIJI & SHRIMAD RAJCHANDRAJI
            </p>
          </div>
        </div>

        <div className="mt-40">
          <p className="text-xl font-sans text-gray-500">
            Shri Becharji Swami of the Gondal Sanghani sect of Jainism had
            blessed Gandhiji with three infallible vows before he left for
            England – refraining from meat, alcohol and infidelity. Gandhiji
            upheld these vows despite of adversities, which ultimately had a
            deep influence on his leadership and personality, his courage and
            his sattva (inner strength).
          </p>
          <p className="text-xl font-sans text-gray-500 mt-4" >
            Pujya Shri Ujjwalkumariji Mahasatiji was a Jain sadhviji, an
            intellectual thinker and scholar, who had philosophical discussions
            for almost 20 days with Gandhiji, before India’s final battle for
            independence. Gandhiji highly admired for her visionary thoughts,
            which he said inspired him tremendously during those crucial
            moments.
          </p>
        </div>
      </section>
    </>
  );
};

export default IndianIndependence;

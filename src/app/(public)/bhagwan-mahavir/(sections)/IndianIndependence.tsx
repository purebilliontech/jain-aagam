import SectionTitle from "@/components/common/SectionTitle";
import Typography from "@/components/common/typography";
import Image from "next/image";
import React from "react";

const IndianIndependence = () => {
  return (
    <>
      <section className="max-w-7xl p-5 mx-auto bg-white py-26">
        <SectionTitle title="Indian Independence" subtitle="WORLD INFLUENCE" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
          <Image src="/static/indian-independence/1.jpg" alt="Gandhi & Bicharji Swami Painting" className="w-full h-full object-cover rounded-lg" width={700} height={700} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="grid gap-5">
              <Image src="/static/indian-independence/2.jpg" alt="Gandhi & Bicharji Swami Painting" className="w-full  object-cover rounded-lg" width={500} height={500} />
              <Image src="/static/indian-independence/3.jpg" alt="Gandhi & Bicharji Swami Painting" className="w-full object-cover rounded-lg" width={500} height={500} />
            </div>

            <Image src="/static/indian-independence/4.jpg" className="w-full h-full object-cover rounded-lg" alt="Gandhi & Bicharji Swami Painting" width={500} height={500} />
          </div>
        </div>

        {/* Lorem Ipsum Text */}
        <div className="my-20">
          <Typography variant="p" className="text-typography">
            The goal of Bhagwan Mahavir&apos;s principles is to attain spiritual
            peace, secure a better rebirth, and ultimately achieve liberation
            from the cycle of birth and death. It is the path to end sorrow and
            suffering permanently. His timeless teachings not only uplift the
            individual soul but also foster a world filled with peace, harmony,
            and compassion for every living being.
          </Typography>
          <Typography variant="p" className="mt-4 text-typography">
            Inspired by Bhagwan Mahavir’s foremost principle of Ahimsa
            (non-violence), Mahatma Gandhi led India’s independence movement
            through peaceful, bloodless resistance, setting a global example of
            nonviolent transformation. In his footsteps, Nelson Mandela devoted
            his life to liberating South Africa through the same unwavering
            commitment to peace and non-violence. His spirit and ideologies
            continue inspiring the world even today.
          </Typography>
        </div>

        {/* Bottom Flex Section */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 mt-20">
          <Image src="/static/indian-independence/a.jpg" alt="Gandhi & Bicharji Swami Painting" className="w-full h-full object-cover rounded-lg" width={700} height={700} />
          <Image src="/static/indian-independence/b.jpg" alt="Gandhi & Bicharji Swami Painting" className="w-full h-full object-cover rounded-lg" width={700} height={700} />
          <Image src="/static/indian-independence/c.jpg" alt="Gandhi & Bicharji Swami Painting" className="w-full h-full object-cover rounded-lg" width={700} height={700} />
        </div>

        <div className="mt-20">
          <Typography variant="p" className="text-typography" >
            Shri Becharji Swami of the Gondal Sanghani sect of Jainism had
            blessed Gandhiji with three infallible vows before he left for
            England – refraining from meat, alcohol and infidelity. Gandhiji
            upheld these vows despite of adversities, which ultimately had a
            deep influence on his leadership and personality, his courage and
            his sattva (inner strength).
          </Typography>
          <Typography variant="p" className="mt-4 text-typography" >
            Pujya Shri Ujjwalkumariji Mahasatiji was a Jain sadhviji, an
            intellectual thinker and scholar, who had philosophical discussions
            for almost 20 days with Gandhiji, before India’s final battle for
            independence. Gandhiji highly admired for her visionary thoughts,
            which he said inspired him tremendously during those crucial
            moments.
          </Typography>
        </div>
      </section>
    </>
  );
};

export default IndianIndependence;

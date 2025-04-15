import React from "react";
import PanchMahavrats from "../(home)/(sections)/PanchMahavrats";
import Image from "next/image";
import SectionTitle from "@/components/common/SectionTitle";
import { Timeline } from "../(home)/(sections)/Timeline";
import { EbooksTimeline } from "../(home)/(sections)/EbooksTimeline";

function Ebooks() {
  return (
    <>
      <div className="flex flex-col md:flex-row bg-amber-50 mx-auto">
        <div className="w-full md:w-1/3">
          <Image
            src="/static/bhagwan-mahavir.png"
            alt="Bhagwan Mahavir"
            className="rounded border-2 border-gray-300"
            width={450}
            height={100}
          />
        </div>
        <div className="w-full md:w-2/3 flex flex-col justify-center pl-0 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-4xl md:text-8xl font-sans font-bold text-primary-ui mb-4 text-center md:text-left">
            BHAGWAN
            <br />
            MAHAVIR
          </h1>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-7xl mx-auto bg-white">
        {/* Main Content Section */}
        <div className="px-4 md:px-16 py-20">
          <SectionTitle
            title="Bhagwan Mahavir"
            subtitle="THE 24TH TIRTHANKAR"
          />
          <p className="mt-14 text-primary-foreground-ui text-lg font-sans font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultricies gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Quis ipsum suspendisse ultricies
            gravida. Risus commodo viverra maecenas accumsan lacus vel
            facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Quis ipsum suspendisse ultricies gravida. Risus commodo viverra
            maecenas accumsan lacus vel facilisis.
          </p>
        </div>
      </div>
      <div className="w-full relative flex flex-col items-center justify-center self-center h-96 md:h-[400px]">
        <Image
          src={"/static/ebooks-sutra-bg.png"}
          layout="fill"
          objectFit="cover"
          alt="Shree Uttaradhyayan Sutra background image"
          className="z-0"
        />
        <div className="absolute flex flex-col items-center justify-center z-10 bg-[#F6F7F2D4] w-[85%] h-[85%] self-center rounded-4xl p-4 md:p-8">
          <h2 className="text-[#E68C3A] text-2xl md:text-4xl font-normal font-mono text-center">
            ॥ ઉપવાસના વિચારોના મૂળતત્વ ॥
          </h2>
          <p className="text-justify w-full md:w-[60%] text-typography mt-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tem
          </p>
          <p className="text-xl md:text-2xl font-sans font-semibold text-typography mt-11">
            Shree Uttaradhyayan Sutra
          </p>
        </div>
      </div>
      <EbooksTimeline
        data={[
          {
            title: "Knowing the self",
            subtitle: "THE DETACHED PRINCE",
            content: (
              <>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Itaque illo aliquid, molestias perferendis deserunt sequi,
                  quam et nesciunt laborum dicta vel nemo, asperiores dolore
                  accusantium eveniet. Corrupti omnis recusandae nulla?
                </p>
                <p className="mt-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
                  eum! Consectetur dignissimos ducimus, suscipit, unde odio sunt
                  iusto eius quas cumque maiores sequi voluptate distinctio eum.
                  Accusamus veritatis aut exercitationem.
                </p>
              </>
            ),
            alignment: "right",
          },
          {
            title: "Renunciation",
            subtitle: "THE MEDITATIVE EXPERIENCE",
            content: (
              <>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Itaque illo aliquid, molestias perferendis deserunt sequi,
                  quam et nesciunt laborum dicta vel nemo, asperiores dolore
                  accusantium eveniet. Corrupti omnis recusandae nulla?
                </p>
                <p className="mt-6">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Itaque illo aliquid, molestias perferendis deserunt sequi,
                  quam et nesciunt laborum dicta vel nemo, asperiores dolore
                  accusantium eveniet. Corrupti omnis recusandae nulla?
                </p>
              </>
            ),
            alignment: "left",
            image: "/static/meditation-image.jpg", // You might need a placeholder image
          },
          {
            title: "Omniscience",
            subtitle: "THE INFINITE WISDOM",
            content: (
              <>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  dui quam, semper facilisis et lacus in, lobortis sodales
                  dolor. Aenean in dignissime tellus, at vestibulum enim. Etiam
                  gravida eget nunc in faucibus.
                </p>
                <p>
                  Nulla facilisi. Vestibulum elementum, orci vel suscipit
                  tempor, eros diam scelerisque ex, vel bibendum tortor risus
                  vitae nisl. Nam eget faucibus orci.
                </p>
              </>
            ),
            alignment: "right",
          },
          {
            title: "Nirvan",
            subtitle: "THE EVERLASTING PEACE",
            content: (
              <>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  dui quam, semper facilisis et lacus in, lobortis sodales
                  dolor. Aenean in dignissime tellus, at vestibulum enim. Etiam
                  gravida eget nunc in faucibus.
                </p>
                <p className="mt-6">
                  Nulla facilisi. Vestibulum elementum, orci vel suscipit
                  tempor, eros diam scelerisque ex, vel bibendum tortor risus
                  vitae nisl. Nam eget faucibus orci.
                </p>
              </>
            ),
            alignment: "left",
          },
        ]}
      />

      {/* Trailer Video Section */}
      <div className="w-full bg-primary-ui h-[80vh] flex flex-col items-center justify-center mb-20">
        <h1 className="text-center px-4">
          TRAILER VIDEO BANNER OF AB DUNIYA JANEGI SUPER SCIENTIST KO
        </h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="INSPIRATION" subtitle="Short Films & Dramas" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10 sm:mt-16 md:mt-20">
          <div className="h-48 rounded-lg bg-secondary-ui"></div>
          <div className="h-48 rounded-lg bg-secondary-ui"></div>
          <div className="h-48 rounded-lg bg-secondary-ui"></div>
          <div className="h-48 rounded-lg bg-secondary-ui"></div>
          <div className="h-48 rounded-lg bg-secondary-ui"></div>
          <div className="h-48 rounded-lg bg-secondary-ui"></div>
          <div className="h-48 rounded-lg bg-secondary-ui"></div>
          <div className="h-48 rounded-lg bg-secondary-ui"></div>
          <div className="h-48 rounded-lg bg-secondary-ui"></div>
        </div>
      </div>
      <div className="w-full relative flex flex-col items-center justify-center self-center h-96 md:h-[400px] mt-24">
        <Image
          src={"/static/ebooks-sutra-bg.png"}
          layout="fill"
          objectFit="cover"
          alt="Shree Uttaradhyayan Sutra background image"
          className="z-0"
        />
        <div className="absolute flex flex-col items-center justify-center z-10 bg-[#F6F7F2D4] w-[85%] h-[85%] self-center rounded-4xl p-4 md:p-8">
          <h2 className="text-[#E68C3A] text-2xl md:text-4xl font-normal font-mono text-center">
            ॥ ઉપવાસના વિચારોના મૂળતત્વ ॥
          </h2>
          <p className="text-justify w-full md:w-[60%] text-typography mt-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tem
          </p>
          <p className="text-xl md:text-2xl font-sans font-semibold text-typography mt-11">
            Shree Uttaradhyayan Sutra
          </p>
        </div>
      </div>
      <PanchMahavrats />

      <div className="w-full relative flex flex-col items-center justify-center self-center h-96 md:h-[400px]">
        <Image
          src={"/static/ebooks-sutra-bg.png"}
          layout="fill"
          objectFit="cover"
          alt="Shree Uttaradhyayan Sutra background image"
          className="z-0"
        />
        <div className="absolute flex flex-col items-center justify-center z-10 bg-[#F6F7F2D4] w-[85%] h-[85%] self-center rounded-4xl p-4 md:p-8">
          <h2 className="text-[#E68C3A] text-2xl md:text-4xl font-normal font-mono text-center">
            ॥ ઉપવાસના વિચારોના મૂળતત્વ ॥
          </h2>
          <p className="text-justify w-full md:w-[60%] text-typography mt-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tem
          </p>
          <p className="text-xl md:text-2xl font-sans font-semibold text-typography mt-11">
            Shree Uttaradhyayan Sutra
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto bg-white py-26">
        {/* Header */}
        <SectionTitle title="Indian Independence" subtitle="WORLD INFLUENCE" />

        {/* Top Flex Section */}
        <div className="flex flex-wrap gap-4 mb-8 mt-20">
          {/* Large left box - spans 2 rows and 2 columns */}
          <div className="flex-1 bg-foreground-ui p-6 flex items-center justify-center rounded-lg h-96">
            <p className="text-center text-white font-medium">
              GANDHIJI & BHAGWAN ANUVR PHOTO
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Top right box */}
            <div className="flex-1 bg-foreground-ui p-4 flex items-center justify-center rounded-lg h-40">
              <p className="text-center text-white font-medium">
                DELHI MUSEUM PHOTOS
              </p>
            </div>
            {/* Bottom middle box */}
            <div className="flex-1 bg-foreground-ui p-4 flex items-center justify-center rounded-lg h-40">
              <p className="text-center text-white">EMPTY</p>
            </div>
          </div>

          {/* Far right box - spans 2 rows */}
          <div className="bg-foreground-ui p-4 flex items-center justify-center rounded-lg h-96 w-full md:w-80">
            <p className="text-center text-white font-medium">
              GANDHIJI&apos;S HANDWRITINGS
            </p>
          </div>
        </div>

        {/* Lorem Ipsum Text */}
        <div className="mb-8">
          <p className="text-xs text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
            gravida. Risus commodo viverra maecenas accumsan lacus vel
            facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
            maecenas accumsan lacus vel facilisis.
          </p>
        </div>

        {/* Bottom Flex Section */}
        <div className="flex flex-wrap gap-10 mb-8 justify-center">
          <div className="bg-foreground-ui p-4 flex items-center justify-center rounded-lg h-96 w-full md:w-auto">
            <p className="text-center text-white font-medium">
              GANDHIJI & BICHARJI SWAMI PAINTING
            </p>
          </div>
          <div className="bg-foreground-ui p-4 flex items-center justify-center rounded-lg h-96 w-full md:w-auto">
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

        {/* Bottom Lorem Ipsum Text */}
        <div>
          <p className="text-xs text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
            gravida. Risus commodo viverra maecenas accumsan lacus vel
            facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
            maecenas accumsan lacus vel facilisis.
          </p>
        </div>
      </div>

      <div className="w-full relative flex flex-col items-center justify-center self-center h-96 md:h-[400px]">
        <Image
          src={"/static/ebooks-sutra-bg.png"}
          layout="fill"
          objectFit="cover"
          alt="Shree Uttaradhyayan Sutra background image"
          className="z-0"
        />
        <div className="absolute flex flex-col items-center justify-center z-10 bg-[#F6F7F2D4] w-[85%] h-[85%] self-center rounded-4xl p-4 md:p-8">
          <h2 className="text-[#E68C3A] text-2xl md:text-4xl font-normal font-mono text-center">
            ॥ ઉપવાસના વિચારોના મૂળતત્વ ॥
          </h2>
          <p className="text-justify w-full md:w-[60%] text-typography mt-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tem
          </p>
          <p className="text-xl md:text-2xl font-sans font-semibold text-typography mt-11">
            Shree Uttaradhyayan Sutra
          </p>
        </div>
      </div>
    </>
  );
}

export default Ebooks;

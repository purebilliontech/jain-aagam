import React from "react";
import PanchMahavrats from "../(home)/(sections)/PanchMahavrats";

function Ebooks() {
  return (
    <>
      <div className="flex flex-col md:flex-row bg-amber-50  mx-auto ">
        <div className="w-full md:w-1/3">
          <img
            src="/BhagwanMahavir.png"
            alt="Bhagwan Mahavir"
            className="rounded border-2 border-gray-300"
          />
        </div>
        <div className="w-full md:w-2/3 flex flex-col justify-center pl-0 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-2xl md:text-4xl font-light text-amber-600 mb-4">
            BHAGWAN
            <br />
            MAHAVIR
          </h1>
          <div className="text-blue-500 underline mt-4">
            ← BANNER - TO BE DESIGNED→
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-7xl mx-auto bg-white">
        {/* Header Section */}

        {/* Main Content Section */}
        <div className="px-4 md:px-16 py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-2">
              <div className="h-px bg-gray-300 w-1/4"></div>
              <div className="px-4 text-sm text-gray-400 uppercase">
                THE 24TH TIRTHANKARA
              </div>
              <div className="h-px bg-gray-300 w-1/4"></div>
            </div>
            <h2 className="text-xl md:text-2xl text-amber-600 font-serif">
              Bhagwan Mahavir
            </h2>
            <div className="flex items-center justify-center mt-2">
              <div className="h-px bg-gray-300 w-1/3"></div>
            </div>
          </div>

          <div className="text-gray-600 text-sm leading-relaxed mb-12">
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultricies gravida. Risus commodo viverra
              maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Quis ipsum suspendisse ultricies
              gravida. Risus commodo viverra maecenas accumsan lacus vel
              facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Quis ipsum suspendisse ultricies gravida. Risus commodo
              viverra maecenas accumsan lacus vel facilisis.
            </p>
          </div>
        </div>

        {/* Bottom Quote Section */}
        <div className="bg-amber-100 bg-opacity-50 p-8 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="text-6xl md:text-9xl text-amber-500">ॐ</div>
          </div>
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h3 className="text-lg md:text-xl text-amber-600 font-serif mb-4">
              || ઉવસગ્ગહરં પાસં ||
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultricies gravida. Risus commodo viverra
              maecenas accumsan lacus vel facilisis Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod.
            </p>
            <p className="text-sm text-gray-700">Shreee Uvasaggaharam Sutra</p>
          </div>
        </div>
      </div>
      <PanchMahavrats />
      <div className="w-full relative py-12 md:py-16">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/static/agams-bg.png"
            alt="Traditional Food Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-4 relative z-10">
          {/* Quote Card */}
          <div className="max-w-4xl mx-auto bg-amber-50 bg-opacity-90 rounded-2xl p-8 md:p-10 shadow-md">
            {/* Gujarati Quote */}
            <h2 className="text-center text-amber-800 text-xl md:text-2xl font-medium mb-4">
              ॥ ઉપવાસના વિચારોના મૂળતત્વ ॥
            </h2>

            {/* Quote Text */}
            <p className="text-center text-gray-700 text-sm md:text-base mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan
            </p>

            {/* Quote Attribution */}
            <p className="text-right text-amber-700 text-sm italic font-medium">
              Shree Uttamchandraji Suru
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16 bg-white">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h3 className="text-xs uppercase tracking-wider text-gray-500">
            THE UNIVERSAL MANTRA
          </h3>
          <h2 className="text-xl md:text-2xl font-serif text-amber-700 mt-2">
            Navkar Mahamantra
          </h2>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Left Column - Mantra Text */}
          <div className="lg:w-1/2 text-center lg:text-right">
            <div className="space-y-1 text-gray-700">
              <p>Namo Arihanatanam</p>
              <p>Namo Siddhanam</p>
              <p>Namo Ayariyanam</p>
              <p>Namo Uvajjhayanam</p>
              <p>Namo Loe Savva Sahunam</p>
              <p>Eso Panch Namokkaro</p>
              <p>Savva Pava Panasano</p>
              <p>Mangalam Cha Savva Singha</p>
              <p>Padhamam Havai Mangalam</p>
            </div>
          </div>

          {/* Right Column - Quote Box */}
          <div className="lg:w-1/2 flex items-start justify-start lg:justify-end">
            <div className="bg-amber-100 p-6 md:p-8 w-full max-w-xs aspect-square flex items-center justify-center text-center">
              <p className="text-amber-800 text-sm md:text-base uppercase tracking-wide font-medium">
                EVERY LINE
                <br />
                WITH
                <br />
                MEANING
              </p>
            </div>
          </div>
        </div>

        {/* Description Paragraphs */}
        <div className="mb-16 max-w-4xl mx-auto">
          <p className="text-gray-700 mb-6 text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
            gravida. Risus commodo viverra maecenas accumsan lacus vel
            facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="text-gray-700 text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.
          </p>
        </div>

        {/* Video Section */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-amber-100 p-4 md:p-6 rounded-md flex items-center justify-center h-48 md:h-64">
            <p className="text-amber-800 uppercase tracking-wide font-medium">
              NAVKAR MANTRA VIDEO
            </p>
          </div>
        </div>
      </div>
      <div className="w-full relative py-12 md:py-16">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/static/agams-bg.png"
            alt="Traditional Food Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-4 relative z-10">
          {/* Quote Card */}
          <div className="max-w-4xl mx-auto bg-amber-50 bg-opacity-90 rounded-2xl p-8 md:p-10 shadow-md">
            {/* Gujarati Quote */}
            <h2 className="text-center text-amber-800 text-xl md:text-2xl font-medium mb-4">
              ॥ ઉપવાસના વિચારોના મૂળતત્વ ॥
            </h2>

            {/* Quote Text */}
            <p className="text-center text-gray-700 text-sm md:text-base mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan
            </p>

            {/* Quote Attribution */}
            <p className="text-right text-amber-700 text-sm italic font-medium">
              Shree Uttamchandraji Suru
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16 bg-white">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h3 className="text-xs uppercase tracking-wider text-gray-500">
            INDIA'S MILESTONES
          </h3>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="h-px bg-amber-300 w-16 md:w-24"></div>
            <h2 className="text-xl md:text-2xl font-serif text-amber-700">
              Indian Independence
            </h2>
            <div className="h-px bg-amber-300 w-16 md:w-24"></div>
          </div>
        </div>

        {/* Top Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Large Left Box */}
          <div className="md:col-span-1 bg-amber-100 aspect-square md:aspect-auto md:row-span-2 flex items-center justify-center p-6 text-center">
            <p className="text-amber-800 uppercase tracking-wide text-sm font-medium">
              MAHATMA GANDHI
              <br />
              FATHER OF NATION
            </p>
          </div>

          {/* Top Right Boxes */}
          <div className="grid grid-cols-2 md:col-span-2 gap-4">
            <div className="bg-amber-100 aspect-square flex items-center justify-center p-4 text-center">
              <p className="text-amber-800 uppercase tracking-wide text-sm font-medium">
                NETAJÍ
                <br />
                SUBHASH
                <br />
                CHANDRA
              </p>
            </div>
            <div className="bg-amber-100 aspect-square flex items-center justify-center p-4 text-center">
              <p className="text-amber-800 uppercase tracking-wide text-sm font-medium">
                SARDAR
                <br />
                PATEL
              </p>
            </div>
            <div className="col-span-2 bg-amber-100 aspect-video md:aspect-square flex items-center justify-center p-4 text-center">
              <p className="text-amber-800 uppercase tracking-wide text-sm font-medium">
                JAWAHARLAL
                <br />
                NEHRU
              </p>
            </div>
          </div>
        </div>

        {/* Middle Text Section */}
        <div className="mb-8 md:mb-12">
          <p className="text-gray-700 text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
            gravida. Risus commodo viverra maecenas accumsan lacus vel
            facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Bottom Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-amber-100 aspect-square md:aspect-auto flex items-center justify-center p-6 text-center">
            <p className="text-amber-800 uppercase tracking-wide text-sm font-medium">
              LAL BAHADUR
              <br />
              SHASTRI
              <br />
              FREEDOM
              <br />
              FIGHTER
            </p>
          </div>
          <div className="bg-amber-100 aspect-square md:aspect-auto flex items-center justify-center p-6 text-center">
            <p className="text-amber-800 uppercase tracking-wide text-sm font-medium">
              LAL BAHADUR
              <br />
              SHASTRI PEACE
              <br />
              AWARD
              <br />
              2021
            </p>
          </div>
          <div className="bg-amber-100 aspect-square md:aspect-auto flex items-center justify-center p-6 text-center">
            <p className="text-amber-800 uppercase tracking-wide text-sm font-medium">
              JAIN SCHOOL
              <br />
              GURUKUL SCHOLARSHIP
            </p>
          </div>
        </div>

        {/* Bottom Text Section */}
        <div>
          <p className="text-gray-700 text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
            gravida. Risus commodo viverra maecenas accumsan lacus vel
            facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </>
  );
}

export default Ebooks;

import React from "react";

const TopSection = () => {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-around bg-[#e9e2d2] mx-auto p-4">
      <div className="text-center md:text-left ">
        <h2 className="text-primary-ui font-sans text-5xl md:text-8xl font-semibold">
          JAIN
        </h2>
        <h2 className="text-primary-ui font-sans text-5xl md:text-8xl font-semibold">
          AAGAM
        </h2>
        <h3 className="text-primary-ui font-mono text-2xl md:text-4xl font-medium leading-normal mt-6">
          The holy scriptures of Jainism
        </h3>
      </div>
      <div>
        {/* Additional content can be added here */}
      </div>
    </section>
  );
};

export default TopSection;

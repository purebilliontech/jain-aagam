import SectionTitle from "@/components/common/SectionTitle";
import React from "react";

const BhagwanMahavir = () => {
  return (
    <section className="flex flex-col w-full max-w-7xl mx-auto bg-white">
      {/* Main Content Section */}
      <div className="px-4 md:px-16 py-20">
        <SectionTitle title="Bhagwan Mahavir" subtitle="THE 24TH TIRTHANKAR" />
        <p className="mt-14 text-primary-foreground-ui text-lg font-sans font-normal">
          Bhagwan Mahavir is the 24th Tirthankar of Jainism. Born as Prince
          Vardhaman to a royal family in Kshatriyakund (present-day Bihar), his
          life is a supreme example of the power of the soul to experience its
          full potential. His principles of Ahimsa (nonviolence), satya (truth),
          achaurya (non-stealing), brahmacharya (celibacy) and aparigraha
          (non-possessiveness) are a guiding light for the world even today.
        </p>
      </div>
    </section>
  );
};

export default BhagwanMahavir;

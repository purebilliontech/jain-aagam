export const revalidate = 60;

import React from "react";
import AgamEbooks from "../(home)/(sections)/AgamEbooks";
import ToTopButton from "../(home)/(sections)/ToTopButton";
import InnerBanner from "@/components/common/InnerBanner";

const Page = async () => {
  return (
    <div>
      <InnerBanner
        image={"/static/banners/ebooksnew.png"}
        alt="Image for presentation"
      >
        <div className="text-center p-4 md:text-left absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h2 className="max-w-7xl mx-auto text-primary-ui text-center w-full p-4 md:p-20 text-4xl md:text-4xl font-semibold">
            Ebooks
          </h2>
        </div>
      </InnerBanner>
      <AgamEbooks isHomePage={false} />
      <ToTopButton/>

    </div>
  );
};

export default Page;

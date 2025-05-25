import InnerBanner from "@/components/common/InnerBanner";
import React from "react";

function EbooksPage() {
  return (
    <>
      <InnerBanner
        image={"/static/blog-banner.png"}
        alt="Image for presentation"
      >
        <div className="text-center p-4 md:text-left absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h2 className="max-w-7xl mx-auto text-primary-ui text-center w-full p-4 md:p-20 text-4xl md:text-4xl font-semibold">
            EBOOKS
          </h2>
        </div>
      </InnerBanner>
    </>
  );
}

export default EbooksPage;

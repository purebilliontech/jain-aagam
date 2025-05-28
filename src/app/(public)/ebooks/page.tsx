export const revalidate = 60;

import React from "react";
import AgamEbooks from "../(home)/(sections)/AgamEbooks";
import ToTopButton from "../(home)/(sections)/ToTopButton";
import Image from "next/image";

const Page = async () => {
  return (
    <div>
      <section className="relative w-screen h-[35vh] sm:h-[40vh] md:h-[44vh]">
        <Image
          src={"/static/banners/eBooks.png"}
          alt={'Ebooks Banner'}
          width={2000}
          height={2000}
          className="w-screen h-full  absolute -z-50 top-0 left-0 hidden md:block object-cover"
        />
        <Image
          src={"/static/banners/PaperBgMobile.png"}
          alt={'Ebooks Banner'}
          width={2000}
          height={2000}
          className="w-screen h-full block md:hidden  absolute -z-50 top-0 left-0 object-cover"
        />
        <div className="text-center p-4 md:text-left absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <h2 className="max-w-7xl mx-auto text-[#e68c3a] text-center w-full p-4 md:p-20 text-4xl md:text-4xl font-semibold tracking-wider ">
            AAGAM EBOOKS
          </h2>
        </div>
      </section>
      <AgamEbooks isHomePage={false} />
      <ToTopButton />
    </div>
  );
};

export default Page;

export const revalidate = 60;

import React from "react";
import AgamEbooks from "../(home)/(sections)/AgamEbooks";
import ToTopButton from "../(home)/(sections)/ToTopButton";

const Page = async () => {
  return (
    <div>
      <AgamEbooks />
      <ToTopButton/>

    </div>
  );
};

export default Page;

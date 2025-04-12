"use client";

import SectionTitle from "@/components/common/SectionTitle";
import WhatAreAgams from "./(sections)/WhatAreAgams";
import Agams from "./(sections)/Agams";
import AgamEbooks from "./(sections)/AgamEbooks";
import EnglishAgam from "./(sections)/EnglishAgam";


export default function Home() {
  return (
    <>
      <WhatAreAgams />
      <Agams />
      <AgamEbooks />
      <EnglishAgam />
    </>
  );
}

"use client";

import WhatAreAgams from "./(sections)/WhatAreAgams";
import Agams from "./(sections)/Agams";
import AgamEbooks from "./(sections)/AgamEbooks";
import EnglishAgam from "./(sections)/EnglishAgam";
import AgamWisdom from "./(sections)/AgamWisdom";
import JoinMission from "./(sections)/JoinMission";
import { Timeline } from "./(sections)/Timeline";

export default function Home() {
  return (
    <>
      <WhatAreAgams />
      <Agams />
      <AgamEbooks />
      <EnglishAgam />
      <AgamWisdom />
      <Timeline data={[
        {
          title: "150",
          subtitle: "Veer Samvat",
          content: <div className="h-[30vh]"></div>,
        },
        {
          title: "980",
          subtitle: "Veer Samvat",
          content: <div className="h-[30vh]"></div>,
        },
        {
          title: "1500",
          subtitle: "Veer Samvat",
          content: <div className="h-[30vh]"></div>,
        },
        {
          title: "2000",
          subtitle: "Veer Samvat",
          content: <div className="h-[30vh]"></div>,
        },

      ]} />
      <JoinMission />
    </>
  );
}

import WhatAreAgams from "./(sections)/WhatAreAgams";
import Agams from "./(sections)/Agams";
import AgamEbooks from "./(sections)/AgamEbooks";
import EnglishAgam from "./(sections)/EnglishAgam";
import AgamWisdom from "./(sections)/AgamWisdom";
import JoinMission from "./(sections)/JoinMission";
import { Timeline } from "./(sections)/Timeline";
import TopSection from "./(sections)/TopSection";
import { getHomepageContent } from "./actions";

export default async function Home() {

  const homepageContent = await getHomepageContent();


  return (
    <>
      <TopSection coverImage={homepageContent.data?.CoverImage || null} />
      <WhatAreAgams />
      <Agams />
      <AgamEbooks />
      <EnglishAgam />
      <AgamWisdom />
      <div className="overflow-x-hidden">

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
      </div>
      <JoinMission />
    </>
  );
}

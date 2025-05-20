export const revalidate = 60;

import WhatAreAgams from "./(sections)/WhatAreAgams";
import Agams from "./(sections)/Agams";
import AgamEbooks from "./(sections)/AgamEbooks";
import EnglishAgam from "./(sections)/EnglishAgam";
import AgamWisdom from "./(sections)/AgamWisdom";
import JoinMission from "./(sections)/JoinMission";
import { Timeline } from "./(sections)/Timeline";
import TopSection from "./(sections)/TopSection";
import { getHomepageContent } from "./actions";
import Typography from "@/components/common/typography";
import JainAgamMap from "./(sections)/JainAgamMap";
import AgamTree from "./(sections)/AgamTree";

export default async function Home() {

  const homepageContent = await getHomepageContent();

  return (
    <>
      <TopSection coverImage={homepageContent.data?.homepage.CoverImage || null} />
      <WhatAreAgams />
      <AgamTree />
      <Agams />
      <AgamEbooks />
      <JainAgamMap />
      <EnglishAgam />
      <AgamWisdom blogs={homepageContent.data?.latestBlogs || []} videos={homepageContent.data?.videos || null} />
      <div className="overflow-hidden">
        <Timeline data={[
          {
            title: "258",
            subtitle: "Veer Samvat",
            content: (
              <div className="h-[40vh] md:h-[30vh]">
                <Typography variant='h4' className="text-xl leading-tight font-bold">First Jain Council of Pataliputra</Typography>
                <Typography variant='p' className="text-xs md:text-base">Under the patronage of Emperor Chandragupt Maurya</Typography>
                <Typography variant='p' className="text-xs md:text-base">An effort to collectively read, conserve and preserve the sacred scriptures.</Typography>
              </div>
            ),
          },
          {
            title: "980",
            subtitle: "Veer Samvat",
            content: (
              <div className="h-[40vh] md:h-[30vh]">
                <Typography variant='h4' className="text-lg leading-tight font-bold">Second Jain Council of Vallabhipur</Typography>
                <Typography variant='p' className="text-xs md:text-base">500 Acharyas come together under the leadership of Acharya Devardhigani Kshamashraman</Typography>
                <Typography variant='p' className="text-xs md:text-base">To write down the sacred texts which had so far been preserved through oral transmission. The council lasted for 12 and a half years.</Typography>
              </div>
            ),
          },
          {
            title: "1998",
            subtitle: "Veer Samvat",
            content: (
              <div className="h-[40vh] md:h-[30vh]">
                <Typography variant='h4' className="text-lg font-bold">Historic Gujarati Aagam Translation – Guru Pran Aagam Batrisi Creation</Typography>
                <Typography variant='p' className="text-xs md:text-base">With the blessings of Tapsamrat Pujya Gurudev Shree Ratilalji Maharaj Saheb</Typography>
                <Typography variant='p' className="text-xs md:text-base">Apurva Shrut Aradhika Pujya Shree Lilambai Mahasatiji undertook the herculean efforts of translating the Aagams into Gujarati, a mission that took 11 long years.</Typography>
              </div>
            ),
          },
          {
            title: "2024",
            subtitle: "Veer Samvat",
            content: (
              <div className="h-[40vh] md:h-[30vh]">
                <Typography variant='h4' className="text-lg font-bold">Launch of the first English Jain Aagam</Typography>
                <Typography variant='p' className="text-xs md:text-base">With Param Gurudev Shree Namramuni Maharaj Saheb's guidance and inspiration</Typography>
                <Typography variant='p' className="text-xs md:text-base">The Global Jain Aagam Mission translated the very first Jain Aagam in English – Shree Upasakdashang Sutra.</Typography>
              </div>
            ),
          },

        ]} />
      </div>
      <JoinMission />
    </>
  );
}

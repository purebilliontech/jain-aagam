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
      <TopSection coverImage={homepageContent.data?.homepage.CoverImage || null} />
      <WhatAreAgams />
      <Agams />
      <AgamEbooks />
      <EnglishAgam />
      <AgamWisdom blogs={homepageContent.data?.latestBlogs || []} />
      <div className="overflow-x-hidden">

        <Timeline data={[
          {
            title: "258",
            subtitle: "Veer Samvat",
            content: (
              <div className="h-[30vh]">
                <h3 className="text-xl font-bold">First Jain Council of Pataliputra</h3>
                <p>Under the patronage of Emperor Chandragupt Maurya</p>
                <p>An effort to collectively read, conserve and preserve the sacred scriptures.</p>
              </div>
            ),
          },
          {
            title: "980",
            subtitle: "Veer Samvat",
            content: (
              <div className="h-[30vh]">
                <h3 className="text-xl font-bold">Second Jain Council of Vallabhipur</h3>
                <p>500 Acharyas come together under the leadership of Acharya Devardhigani Kshamashraman</p>
                <p>To write down the sacred texts which had so far been preserved through oral transmission. The council lasted for 12 and a half years.</p>
              </div>
            ),
          },
          {
            title: "1998",
            subtitle: "Veer Samvat",
            content: (
              <div className="h-[30vh]">
                <h3 className="text-xl font-bold">Historic Gujarati Aagam Translation – Guru Pran Aagam Batrisi Creation</h3>
                <p>With the blessings of Tapsamrat Pujya Gurudev Shree Ratilalji Maharaj Saheb</p>
                <p>Apurva Shrut Aradhika Pujya Shree Lilambai Mahasatiji undertook the herculean efforts of translating the Aagams into Gujarati, a mission that took 11 long years.</p>
              </div>
            ),
          },
          {
            title: "2024",
            subtitle: "Veer Samvat",
            content: (
              <div className="h-[30vh]">
                <h3 className="text-xl font-bold">Launch of the first English Jain Aagam</h3>
                <p>With Param Gurudev Shree Namramuni Maharaj Saheb’s guidance and inspiration</p>
                <p>The Global Jain Aagam Mission translated the very first Jain Aagam in English – Shree Upasakdashang Sutra.</p>
              </div>
            ),
          },

        ]} />
      </div>
      <JoinMission />
    </>
  );
}

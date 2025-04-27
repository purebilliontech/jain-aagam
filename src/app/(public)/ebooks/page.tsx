import React from "react";
import PanchMahavrats from "./(sections)/PanchMahavrats";
import { EbooksTimeline } from "./(sections)/EbooksTimeline";
import TopSection from "./(sections)/TopSection";
import BhagwanMahavir from "./(sections)/BhagwanMahavir";
import Upvasana from "./(sections)/Upvasana";
import ShortFilmsAndDramas from "./(sections)/ShortFilmsAndDramas";
import NavkarMahamantrs from "./(sections)/NavkarMahamantrs";
import IndianIndependence from "./(sections)/IndianIndependence";
import ViewsOnJainism from "./(sections)/ViewsOnJainism";
import { getBhagwanMahavirPageData } from "./actions";

export default async function Ebooks() {

  const bhagwanMahavirPage = await getBhagwanMahavirPageData();

  return (
    <>
      <TopSection coverImage={bhagwanMahavirPage.data?.CoverImage || null} />
      <BhagwanMahavir />
      <Upvasana />
      <EbooksTimeline
        data={[
          {
            title: "Knowing the self",
            subtitle: "THE DETACHED PRINCE",
            content: (
              <>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Itaque illo aliquid, molestias perferendis deserunt sequi,
                  quam et nesciunt laborum dicta vel nemo, asperiores dolore
                  accusantium eveniet. Corrupti omnis recusandae nulla?
                </p>
                <p className="mt-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
                  eum! Consectetur dignissimos ducimus, suscipit, unde odio sunt
                  iusto eius quas cumque maiores sequi voluptate distinctio eum.
                  Accusamus veritatis aut exercitationem.
                </p>
              </>
            ),
            alignment: "right",
          },
          {
            title: "Renunciation",
            subtitle: "THE MEDITATIVE EXPERIENCE",
            content: (
              <>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Itaque illo aliquid, molestias perferendis deserunt sequi,
                  quam et nesciunt laborum dicta vel nemo, asperiores dolore
                  accusantium eveniet. Corrupti omnis recusandae nulla?
                </p>
                <p className="mt-6">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Itaque illo aliquid, molestias perferendis deserunt sequi,
                  quam et nesciunt laborum dicta vel nemo, asperiores dolore
                  accusantium eveniet. Corrupti omnis recusandae nulla?
                </p>
              </>
            ),
            alignment: "left",
            image: "/static/meditation-image.jpg", // You might need a placeholder image
          },
          {
            title: "Omniscience",
            subtitle: "THE INFINITE WISDOM",
            content: (
              <>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  dui quam, semper facilisis et lacus in, lobortis sodales
                  dolor. Aenean in dignissime tellus, at vestibulum enim. Etiam
                  gravida eget nunc in faucibus.
                </p>
                <p>
                  Nulla facilisi. Vestibulum elementum, orci vel suscipit
                  tempor, eros diam scelerisque ex, vel bibendum tortor risus
                  vitae nisl. Nam eget faucibus orci.
                </p>
              </>
            ),
            alignment: "right",
          },
          {
            title: "Nirvan",
            subtitle: "THE EVERLASTING PEACE",
            content: (
              <>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  dui quam, semper facilisis et lacus in, lobortis sodales
                  dolor. Aenean in dignissime tellus, at vestibulum enim. Etiam
                  gravida eget nunc in faucibus.
                </p>
                <p className="mt-6">
                  Nulla facilisi. Vestibulum elementum, orci vel suscipit
                  tempor, eros diam scelerisque ex, vel bibendum tortor risus
                  vitae nisl. Nam eget faucibus orci.
                </p>
              </>
            ),
            alignment: "left",
          },
        ]}
      />

      {/* Trailer Video Section */}
      <div className="w-full bg-primary-ui h-[80vh] flex flex-col items-center justify-center mb-20">
        <h1 className="text-center px-4">
          TRAILER VIDEO BANNER OF AB DUNIYA JANEGI SUPER SCIENTIST KO
        </h1>
      </div>

      <ShortFilmsAndDramas />
      <PanchMahavrats />
      <Upvasana />
      <NavkarMahamantrs />
      <IndianIndependence />
      <Upvasana />
      <ViewsOnJainism />

    </>
  );
}


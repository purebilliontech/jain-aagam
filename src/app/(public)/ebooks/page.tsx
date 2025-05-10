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
                  As a young prince, Vardhaman was married to Princess Yashoda
                  and had a daughter named Priyadarshana. At the age of thirty,
                  Prince Vardhaman abandoned royal life and renounced his home
                  and family in the pursuit of spiritual awakening. Even after
                  enjoying princely luxuries, his conscience always pricked him
                  about the one permanent reality of existence — “Nothing is
                  permanent! Neither this body, nor this human birth. Neither
                  relations, nor emotions. The only permanent existence is my
                  SOUL.” He had a burning desire to shed the layers of ignorance
                  that shroud the soul in illusion, to break the shackles of
                  karma, and to attain the higher self.
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
                  With an ardent desire to discover the true purpose of life,
                  Bhagwan Mahavir renounced worldly life and accepted the vows
                  of Diksha in the young age of just 30 years. He immersed
                  himself in deep meditation for a period of 12 and a half long
                  years. It is said that during this crucial phase, He did not
                  sleep for more than 48 minutes, such was His unwavering focus
                  on self-attainment. He believed that winning a thousand
                  enemies in this world is easy, but conquering the self is the
                  true victory. To achieve this, He spent these long years in
                  standing meditation, remaining steadfast amidst dangers,
                  fears, hardships, and adversities, enduring severe penance of
                  both, the body and the mind.
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
                  Bhagwan Mahavir ultimately attained Kevalgnan (omniscience)
                  under a Sāla tree on the banks of the River Rujuvalika at the
                  age of 42, after years of rigorous sadhana and deep
                  meditation. He was not merely an enlightened soul—He was a
                  Tirthankar, a divine being who establishes a Tirth (a
                  spiritual ford) to guide others across the ocean of worldly
                  existence. This Tirth encompasses Sadhus and Sadhvijis (monks
                  and nuns), and Shravaks and Shravikas (lay men and women
                  devotees). His first disciples were eleven Brahmins, revered
                  as the Gandhars, with Gautam Swami as the chief among them.
                  For thirty years after attaining omniscience, He journeyed
                  across India, spreading the priceless wisdom of truth,
                  non-violence, and inner purity.
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
                  At the age of 72, thirty years after attaining omniscience,
                  Bhagwan Mahavir delivered his final discourse at Pawapuri, in
                  present-day Bihar, speaking continuously for 48 hours. This
                  profound discourse marked the culmination of a life dedicated
                  to the upliftment of all souls. On that sacred night, He
                  attained Nirvana (liberation from the cycle of birth and
                  death). His departure from the mortal world left behind a
                  radiant spiritual legacy. Jains commemorate this divine event
                  as Diwali, the festival of light, symbolising the eternal
                  brilliance of His soul, rooted in deep spiritual awakening.
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

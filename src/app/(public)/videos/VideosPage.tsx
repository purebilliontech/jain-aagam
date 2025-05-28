import InnerBanner from "@/components/common/InnerBanner";
import SectionTitle from "@/components/common/SectionTitle";
import YTVideoPlayer from "@/components/common/YTVideoPlayer";
import { FrontendPlaylistDTO } from "@/schema/frontendPlaylist";
import React from "react";
import ToTopButton from "../(home)/(sections)/ToTopButton";
import Image from "next/image";

interface VideosPageData {
  highlights: FrontendPlaylistDTO | null;
  shreeSuyagadangSutra: FrontendPlaylistDTO | null;
  shreeNandiSutra: FrontendPlaylistDTO | null;
  shreeDashvaikalikSutra: FrontendPlaylistDTO | null;
  shreeUttaradhyayanSutra: FrontendPlaylistDTO | null;
}

export default function VideosPage({ data }: { data: VideosPageData }) {
  return (
    <>
      <section className="relative w-screen h-[35vh] sm:h-[40vh] md:h-[44vh]">
        <Image
          src={"/static/banners/eBooks.png"}
          alt={'Videos Banner'}
          width={2000}
          height={2000}
          className="w-screen h-full  absolute -z-50 top-0 left-0 hidden md:block object-cover"
        />
        <Image
          src={"/static/banners/PaperBgMobile.png"}
          alt={'Videos Banner'}
          width={2000}
          height={2000}
          className="w-screen h-full block md:hidden  absolute -z-50 top-0 left-0 object-cover"
        />
        <div className="text-center p-4 md:text-left absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h2 className="max-w-7xl mx-auto text-[#e68c3a] text-center w-full p-4 md:p-20 text-4xl md:text-4xl font-semibold tracking-wider ">
            AAGAM VIDEOS
          </h2>
        </div>
      </section>

      <div className="max-w-7xl mx-auto my-10 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <YTVideoPlayer
            videoUrl={data.highlights?.videos[0] || ""}
            className="w-full rounded-lg overflow-hidden md:col-span-2  h-full"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 md:col-span-2 lg:grid-cols-1 lg:col-span-1 gap-4">
            <YTVideoPlayer
              videoUrl={data.highlights?.videos[1] || ""}
              className="w-full rounded-lg overflow-hidden"
            />
            <YTVideoPlayer
              videoUrl={data.highlights?.videos[2] || ""}
              className="w-full rounded-lg overflow-hidden"
            />
          </div>
        </div>
      </div>

      <div className="my-10 mt-20 max-w-7xl mx-auto p-5">
        <SectionTitle title="Shree Suyagadang Sutra" subtitle="EXPLORE" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-10">
          {data.shreeSuyagadangSutra &&
            data.shreeSuyagadangSutra.videos.map((video) => (
              <YTVideoPlayer
                key={video}
                videoUrl={video}
                className="w-full rounded-lg overflow-hidden"
              />
            ))}
        </div>
      </div>

      <div className="my-10 mt-20 max-w-7xl mx-auto p-5">
        <SectionTitle title="Shree Nandi Sutra" subtitle="EXPLORE" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-10">
          {data.shreeNandiSutra &&
            data.shreeNandiSutra.videos.map((video) => (
              <YTVideoPlayer
                key={video}
                videoUrl={video}
                className="w-full rounded-lg overflow-hidden"
              />
            ))}
        </div>
      </div>

      <div className="my-10 mt-20 max-w-7xl mx-auto p-5">
        <SectionTitle title="Shree Dashvaikalik Sutra" subtitle="EXPLORE" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-10">
          {data.shreeDashvaikalikSutra &&
            data.shreeDashvaikalikSutra.videos.map((video) => (
              <YTVideoPlayer
                key={video}
                videoUrl={video}
                className="w-full rounded-lg overflow-hidden"
              />
            ))}
        </div>
      </div>

      <div className="my-10 mt-20 max-w-7xl mx-auto p-5">
        <SectionTitle title="Shree Uttaradhyayan Sutra" subtitle="EXPLORE" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-10">
          {data.shreeUttaradhyayanSutra &&
            data.shreeUttaradhyayanSutra.videos.map((video) => (
              <YTVideoPlayer
                key={video}
                videoUrl={video}
                className="w-full rounded-lg overflow-hidden"
              />
            ))}
        </div>
      </div>
      <ToTopButton />
    </>
  );
}

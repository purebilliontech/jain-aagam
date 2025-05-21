import SectionTitle from "@/components/common/SectionTitle";
import YTVideoPlayer from "@/components/common/YTVideoPlayer";
import { FrontendPlaylistDTO } from "@/schema/frontendPlaylist";
import React from "react";


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
            <div className="bg-[#E9E2D2] w-full h-64 md:h-96 flex items-center">
                <h1 className="text-primary-ui p-4 md:p-20 text-4xl md:text-8xl font-semibold">VIDEOS</h1>
            </div>

            <div className="my-10 mt-20 max-w-7xl mx-auto">
                <SectionTitle title="Shree Suyagadang Sutra" subtitle="EXPLORE" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-10">
                    {data.shreeSuyagadangSutra && data.shreeSuyagadangSutra.videos.map((video) => (
                        <YTVideoPlayer key={video} videoUrl={video} className="w-full rounded-lg overflow-hidden" />
                    ))}
                </div>
            </div>

            <div className="my-10 mt-20 max-w-7xl mx-auto">
                <SectionTitle title="Shree Nandi Sutra" subtitle="EXPLORE" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-10">
                    {data.shreeNandiSutra && data.shreeNandiSutra.videos.map((video) => (
                        <YTVideoPlayer key={video} videoUrl={video} className="w-full rounded-lg overflow-hidden" />
                    ))}
                </div>
            </div>

            <div className="my-10 mt-20 max-w-7xl mx-auto">
                <SectionTitle title="Shree Dashvaikalik Sutra" subtitle="EXPLORE" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-10">
                    {data.shreeDashvaikalikSutra && data.shreeDashvaikalikSutra.videos.map((video) => (
                        <YTVideoPlayer key={video} videoUrl={video} className="w-full rounded-lg overflow-hidden" />
                    ))}
                </div>
            </div>

            <div className="my-10 mt-20 max-w-7xl mx-auto">
                <SectionTitle title="Shree Uttaradhyayan Sutra" subtitle="EXPLORE" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-10">
                    {data.shreeUttaradhyayanSutra && data.shreeUttaradhyayanSutra.videos.map((video) => (
                        <YTVideoPlayer key={video} videoUrl={video} className="w-full rounded-lg overflow-hidden" />
                    ))}
                </div>
            </div>
        </>
    );
}

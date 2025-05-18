"use client"
import FEButton from "@/components/common/FEButton";
import SectionTitle from "@/components/common/SectionTitle";
import { Search } from "lucide-react";
import React, { useState } from "react";
import YouTubePlayer from "@/components/YoutubePlayer";

const tags = ["Happiness", "Jain Agam", "Jainism", "Live Streams"];

// Just provide YouTube links in these arrays
const featuredVideos = [
  "https://www.youtube.com/live/Ummuh1HqxHA?si=M0BsQi-2O3ssyjDO",
  "https://www.youtube.com/live/UeQcJ1uTYH8?si=DfYH-elRa69BI64B",
  "https://www.youtube.com/live/GufviLtoSdk?si=Kf7uQRFpLYgQlkv2",
];

const mostLikedVideos = [
  "https://www.youtube.com/live/Ummuh1HqxHA?si=M0BsQi-2O3ssyjDO",
  "https://www.youtube.com/live/UeQcJ1uTYH8?si=DfYH-elRa69BI64B",
  "https://www.youtube.com/live/GufviLtoSdk?si=Kf7uQRFpLYgQlkv2",
  "https://www.youtube.com/live/C0DGw-bq8wo?si=4uZrU5BqMs7xYit0",
  "https://www.youtube.com/live/h205NesfPPI?si=w1kJ_YrpYk7DM-6E",
  "https://www.youtube.com/live/b6BYcyFh3vs?si=a1TwOA3OyScAEv0F",
  "https://www.youtube.com/live/nTx-cRa6uIk?si=mzrszGjnLh-6qA7p",
  "https://www.youtube.com/live/yol6_gy7QAQ?si=yroabdIZytPfPoG6"
];

const playlist2Videos = [
  "https://www.youtube.com/live/h205NesfPPI?si=w1kJ_YrpYk7DM-6E",
  "https://www.youtube.com/live/b6BYcyFh3vs?si=a1TwOA3OyScAEv0F",
  "https://www.youtube.com/live/nTx-cRa6uIk?si=mzrszGjnLh-6qA7p",
  "https://www.youtube.com/live/yol6_gy7QAQ?si=yroabdIZytPfPoG6",
  "https://www.youtube.com/live/Ummuh1HqxHA?si=M0BsQi-2O3ssyjDO",
  "https://www.youtube.com/live/UeQcJ1uTYH8?si=DfYH-elRa69BI64B",
  "https://www.youtube.com/live/GufviLtoSdk?si=Kf7uQRFpLYgQlkv2",
  "https://www.youtube.com/live/C0DGw-bq8wo?si=4uZrU5BqMs7xYit0"
];

// Function to extract video ID from YouTube URL
const extractVideoId = (url: string): string => {
  const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|live\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[1].length === 11) ? match[1] : "";
};

// Video thumbnail component
const VideoThumbnail = ({ videoUrl }: { videoUrl: string }) => {
  const videoId = extractVideoId(videoUrl);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02]">
      <div className="relative w-full h-48">
        <YouTubePlayer videoId={videoId} onVideoEnd={() => { }} />
      </div>
    </div>
  );
};

// Featured video component
const FeaturedVideoThumbnail = ({ videoUrl, isLarge = false }: { videoUrl: string, isLarge?: boolean }) => {
  const videoId = extractVideoId(videoUrl);

  return (
    <div className={`rounded-2xl overflow-hidden cursor-pointer relative group w-full ${isLarge ? 'h-48 md:h-96' : 'h-44'}`}>
      <YouTubePlayer videoId={videoId} onVideoEnd={() => { }} />
    </div>
  );
};

export default function Videos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  return (
    <>
      <div className="bg-[#E9E2D2] w-full h-64 md:h-96 flex items-center">
        <h1 className="text-primary-ui p-4 md:p-20 text-4xl md:text-8xl font-semibold">VIDEOS</h1>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row p-5 mt-10">
        <div className="md:w-2/3 flex flex-wrap gap-2 px-4 md:px-8 pb-8">
          <span
            onClick={() => setActiveTag("All")}
            className={`inline-block px-4 md:px-7 py-2 text-sm md:text-lg font-medium rounded-full cursor-pointer transition-colors duration-300 ${activeTag === "All"
              ? "bg-primary-ui text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            All
          </span>
          {tags.map((tag, index) => (
            <span
              key={index}
              onClick={() => setActiveTag(tag)}
              className={`inline-block px-4 md:px-7 py-2 text-sm md:text-lg font-medium rounded-full cursor-pointer transition-colors duration-300 ${activeTag === tag
                ? "bg-primary-ui text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="md:w-1/3 mt-4 md:mt-0">
          <div className="flex border-b border-primary-ui">
            <Search className="text-primary-ui" />
            <input
              className="w-full border-none outline-none px-2 pb-1 text-sm md:text-lg"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Featured Videos Section */}
      <div className="flex flex-col md:flex-row items-start justify-center max-w-7xl gap-6 mx-auto mb-20 p-4">
        <div className="w-full md:w-[70%]">
          <FeaturedVideoThumbnail videoUrl={featuredVideos[0]} isLarge={true} />
        </div>
        <div className="flex flex-col w-full md:w-[30%] gap-6 mt-4 md:mt-0">
          {featuredVideos.slice(1).map((videoUrl, index) => (
            <FeaturedVideoThumbnail key={index} videoUrl={videoUrl} />
          ))}
        </div>
      </div>

      {/* Most Liked Section */}
      <SectionTitle subtitle="EXPLORE" title="Most Liked" />
      <div className="max-w-7xl mx-auto my-10 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mostLikedVideos.map((videoUrl, index) => (
            <VideoThumbnail key={index} videoUrl={videoUrl} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center my-10">
        <FEButton>EXPLORE ALL</FEButton>
      </div>

      {/* Playlist 2 Section */}
      <SectionTitle subtitle="EXPLORE" title="Spiritual Practices" />
      <div className="max-w-7xl mx-auto my-10 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {playlist2Videos.map((videoUrl, index) => (
            <VideoThumbnail key={index} videoUrl={videoUrl} />
          ))}
        </div>
      </div>
    </>
  );
}

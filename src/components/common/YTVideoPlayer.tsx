"use client"

import React from 'react'
import YouTubePlayer from '../YoutubePlayer';

const extractVideoId = (url: string): string => {
    const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|live\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[1].length === 11) ? match[1] : "";
};


export default function YTVideoPlayer({ videoUrl, className }: { videoUrl: string, className?: string }) {
    const videoId = extractVideoId(videoUrl);

    return (
        <div className={`relative w-full h-48 ${className}`}>
            <YouTubePlayer videoId={videoId} onVideoEnd={() => { }} />
        </div>
    )
}

"use client"

import React, { useState } from 'react'
import YouTubePlayer from '../YoutubePlayer';
import Image from 'next/image';

const extractVideoId = (url: string): string => {
    const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|live\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[1].length === 11) ? match[1] : "";
};

export default function YTVideoPlayer({ videoUrl, className }: { videoUrl: string, className?: string }) {
    const videoId = extractVideoId(videoUrl);
    const [showPlayer, setShowPlayer] = useState(false);

    const [showFallback, setShowFallback] = useState(false);

    return (
        <div className={`relative w-full bg-primary-ui aspect-video ${className}`}>
            {!showPlayer ? (
                <div
                    className="absolute inset-0 cursor-pointer"
                    onClick={() => setShowPlayer(true)}
                >
                    {showFallback ? <Image
                        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                        alt="Video thumbnail"
                        fill
                        className="object-cover"
                        onError={(e) => {
                            // Fallback to default thumbnail if maxresdefault is not available
                            const target = e.target as HTMLImageElement;
                            target.src = `https://img.youtube.com/vi/${videoId}/0.jpg`;
                        }}
                    /> : <Image
                        src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                        alt="Video thumbnail fallback"
                        fill
                        className="object-cover"
                    />}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-primary-ui bg-opacity-50 rounded-full flex items-center justify-center">
                            <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1" />
                        </div>
                    </div>
                </div>
            ) : (
                <YouTubePlayer
                    videoId={videoId}
                    onVideoEnd={() => { }}
                    onPause={() => {
                        setShowPlayer(false);
                    }}
                    onPlay={() => {
                        setShowPlayer(true);
                    }}
                />
            )}
        </div>
    )
}

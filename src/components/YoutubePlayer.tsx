"use client";

import React, { useState, useEffect, useRef } from "react";

interface YouTubePlayerProps {
  videoId: string;
  onVideoEnd: () => void;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, onVideoEnd }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);
  const [isPlayerLoaded, setIsPlayerLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const iframe = document.createElement("iframe");
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&showinfo=0&modestbranding=1&enablejsapi=1`;
    iframe.title = "YouTube video player";
    iframe.frameBorder = "0";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.id = `youtube-player-${videoId}`;

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(iframe);

    const loadYouTubeAPI = () => {
      if (!document.getElementById("youtube-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }
    };

    const setupPlayer = () => {
      if (!window.YT || !window.YT.Player) {
        window.onYouTubeIframeAPIReady = initPlayer;
        return;
      }
      initPlayer();
    };

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      try {
        playerInstanceRef.current = new window.YT.Player(`youtube-player-${videoId}`, {
          events: {
            onStateChange: (event: { data: number }) => {
              if (event.data === 0) {
                onVideoEnd();
              }
            },
            onReady: () => {
              setIsPlayerLoaded(true);
            },
          },
        });
      } catch (error) {
        console.error("Error initializing YouTube player:", error);
      }
    };

    loadYouTubeAPI();
    iframe.onload = setupPlayer;

    return () => {
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.destroy();
        } catch (e) {
          console.error("Error destroying player:", e);
        }
        playerInstanceRef.current = null;
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [videoId, onVideoEnd]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-20 ${isPlayerLoaded ? "opacity-100" : "opacity-80"}`}
    />
  );
};

export default YouTubePlayer;

// Add YT type to window
declare global {
  interface Window {
    YT: {
      Player: any;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

"use client";

import React, { useState, useEffect, useRef } from "react";

interface YouTubePlayerProps {
  videoId: string;
  onVideoEnd: () => void;
  onPause: () => void;
  onPlay: () => void;
}

// Keep track of API loading state across components
let isApiLoading = false;
let isApiLoaded = false;

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, onVideoEnd, onPause, onPlay }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isPlayerLoaded, setIsPlayerLoaded] = useState(false);

  // Load YouTube API once
  useEffect(() => {
    if (!containerRef.current) return;

    const iframe = document.createElement("iframe");
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&modestbranding=1&enablejsapi=1`;
    iframe.title = "YouTube video player";
    iframe.frameBorder = "0";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.id = `youtube-player-${videoId}`;

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(iframe);

    const loadYouTubeAPI = () => {
      if (isApiLoaded) return Promise.resolve();
      if (isApiLoading) {
        // Wait for API to load if it's already being loaded
        return new Promise<void>((resolve) => {
          const checkInterval = setInterval(() => {
            if (isApiLoaded) {
              clearInterval(checkInterval);
              resolve();
            }
          }, 100);
        });
      }

      isApiLoading = true;
      return new Promise<void>((resolve) => {
        // Set global callback
        window.onYouTubeIframeAPIReady = () => {
          isApiLoaded = true;
          isApiLoading = false;
          resolve();
        };

        // Add script if not already present
        if (!document.getElementById("youtube-iframe-api")) {
          const tag = document.createElement("script");
          tag.id = "youtube-iframe-api";
          tag.src = "https://www.youtube.com/iframe_api";
          const firstScriptTag = document.getElementsByTagName("script")[0];
          firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
        } else if (window.YT && window.YT.Player) {
          // API already loaded
          isApiLoaded = true;
          isApiLoading = false;
          resolve();
        }
      });
    };

    // Initialize player
    const initializePlayer = async () => {
      if (!containerRef.current) return;

      // Clear any existing content
      containerRef.current.innerHTML = "";

      // Create iframe placeholder
      const iframeId = `youtube-iframe-${videoId}-${Date.now()}`;
      const iframeContainer = document.createElement("div");
      iframeContainer.id = iframeId;
      iframeContainer.style.width = "100%";
      iframeContainer.style.height = "100%";
      containerRef.current.appendChild(iframeContainer);

      // Make sure API is loaded
      await loadYouTubeAPI();

      // Clean up any existing player
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.error("Error destroying player:", e);
        }
      }

      // Create new player
      try {
        playerRef.current = new window.YT.Player(iframeId, {
          videoId: videoId,
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 0,
            rel: 0,
            showinfo: 0,
            modestbranding: 1,
            enablejsapi: 1
          },
          events: {
            onReady: () => {
              setIsPlayerLoaded(true);
              playerRef.current?.playVideo();
            },
            onStateChange: (event: { data: number }) => {
              // YouTube player states:
              // -1 (unstarted)
              // 0 (ended)
              // 1 (playing)
              // 2 (paused)
              // 3 (buffering)
              // 5 (video cued)
              switch (event.data) {
                case 0:
                  onVideoEnd();
                  break;
                case 1:
                  onPlay();
                  break;
                case 2:
                  onPause();
                  break;
              }
            }
          }
        });
      } catch (error) {
        console.error("Error initializing YouTube player:", error);
      }
    };

    initializePlayer();

    // Cleanup
    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.error("Error destroying player:", e);
        }
        playerRef.current = null;
      }
    };
  }, [videoId, onVideoEnd, onPlay, onPause]);

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
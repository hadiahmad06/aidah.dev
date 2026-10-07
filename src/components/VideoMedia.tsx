"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoMedia({ src, poster }: { src: string; poster: string }) {
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const handleTimeUpdate = () => {
      if (el.duration) setProgress(el.currentTime / el.duration);
    };
    el.addEventListener("timeupdate", handleTimeUpdate);
    return () => el.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.7) {
          el.pause();
        } else {
          el.play().catch(() => {});
        }
      },
      { threshold: [0, 0.7, 1] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const seekToClientX = (clientX: number) => {
    const bar = barRef.current;
    const el = videoRef.current;
    if (!bar || !el || !isFinite(el.duration)) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    el.currentTime = ratio * el.duration;
    setProgress(ratio);
  };

  return (
    <div className="group relative w-full overflow-hidden border border-rule-strong bg-raised">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="none"
        loop
        muted={muted}
        playsInline
        className="block h-auto w-full"
      />
      <button
        onClick={() => setMuted((m) => !m)}
        className="absolute bottom-8 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white opacity-100 backdrop-blur-sm transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
        aria-label={muted ? "Unmute video" : "Mute video"}
      >
        {muted ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>
      <div
        ref={barRef}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          seekToClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            seekToClientX(e.clientX);
          }
        }}
        className="absolute inset-x-3 bottom-2 z-10 flex h-4 cursor-pointer items-center"
      >
        <div className="h-1.5 w-full rounded-full bg-gray-500/60">
          <div className="h-full rounded-full bg-white" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </div>
  );
}

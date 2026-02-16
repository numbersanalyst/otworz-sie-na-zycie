"use client";

import { useRef, useLayoutEffect } from "react";
import { X } from "lucide-react";
import gsap from "gsap";

interface VideoModalProps {
  videoId: string;
  startSeconds?: number;
  title?: string;
  onClose: () => void;
}

export const VideoModal = ({
  videoId,
  startSeconds = 0,
  title = "Wideo",
  onClose,
}: VideoModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      timeline.current = gsap.timeline({
        onReverseComplete: onClose,
      });

      timeline.current
        .fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out" },
        )
        .fromTo(
          containerRef.current,
          { opacity: 0, scale: 0.9, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.2)" },
          "-=0.2",
        );
    }, overlayRef);

    return () => ctx.revert();
  }, [onClose]);

  const handleClose = () => {
    timeline.current?.reverse();
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-9999 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-6 opacity-0"
      onClick={handleClose}
    >
      <div
        ref={containerRef}
        className="relative w-full aspect-video max-w-5xl bg-zinc-900 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden opacity-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 md:top-6 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 bg-zinc-900/95 hover:bg-zinc-800 text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-all touch-manipulation"
          aria-label="Zamknij wideo"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&start=${startSeconds}&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

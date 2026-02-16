"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image, { StaticImageData } from "next/image";
import { Play, X, Heart } from "lucide-react";

import bocelliThumb from "@/assets/thumbnail4.jpg";
import dominikThumb from "@/assets/thumbnail5.png";
import oknoThumb from "@/assets/thumbnail6.png";

gsap.registerPlugin(ScrollTrigger);

type HopeStory = {
  tag: string;
  title: string;
  name: string;
  desc: string;
  quote: string;
  quotePl?: string;
  videoUrl: string;
  timestamp?: string;
  thumbnail: StaticImageData;
};

const hopeStories: HopeStory[] = [
  {
    tag: "Miłość",
    title: "Każdy chromosom się liczy",
    name: "Dominik i jego rodzice",
    desc: "Gdy Dorota i Michał usłyszeli o zespole Downa, był to dla nich szok. Dziś Dominik jest „słoneczkiem”, które dopełnia ich rodzinę i uczy, że każde życie ma taką samą wartość.",
    quote:
      "Nigdy byśmy nie zmienili naszej decyzji. Tak naprawdę Dominik nie różni się tak bardzo od pozostałych naszych dzieci.",
    videoUrl: "https://www.youtube.com/watch?v=aQRIQsW_UwU",
    timestamp: "4:50",
    thumbnail: dominikThumb,
  },
  {
    tag: "Nadzieja",
    title: "Mama wybrała życie",
    name: "Andrea Bocelli",
    desc: "Lekarze sugerowali matce aborcję po ataku wyrostka, ostrzegając przed niepełnosprawnością dziecka. Ta młoda kobieta odmówiła. Dziś jej syn swym głosem porusza miliony.",
    quote:
      "Ale młoda i odważna żona odmówiła aborcji i dziecko się urodziło. Tą kobietą była moja matka, a dzieckiem byłem ja.",
    videoUrl: "https://www.youtube.com/watch?v=vOrxnOeKaqA",
    timestamp: "00:50",
    thumbnail: bocelliThumb,
  },
  {
    tag: "Szansa",
    title: "Bezpieczne miejsce",
    name: "Okna Życia",
    desc: "Okno Życia to szansa na ratunek dla niechcianych lub porzuconych dzieci z różnych powodów. W tym konkretnym miejscu uratowano czworo dzieci, dając im nadzieję na nową przyszłość.",
    quote:
      "Uratowane były cztery życia. Ta trójka dzieci poszły do adopcji – były to zdrowe dzieci kilkudniowe. Znalazły się już w szczęśliwych rodzinach.",
    videoUrl: "https://www.youtube.com/watch?v=fPLd7CMTHk4",
    timestamp: "03:13",
    thumbnail: oknoThumb,
  },
];

const parseYouTubeUrl = (url: string, timestamp?: string) => {
  const videoId =
    url.match(/(?:v=|\/embed\/|youtu\.be\/)([^&\?\/]+)/)?.[1] || "";
  let startSeconds = 0;

  if (timestamp) {
    const parts = timestamp.split(":").map(Number);
    if (parts.length === 2) {
      startSeconds = parts[0] * 60 + parts[1];
    } else if (parts.length === 1) {
      startSeconds = parts[0];
    }
  }

  return { videoId, startSeconds };
};

export const Hope = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const [activeVideo, setActiveVideo] = useState<{
    videoId: string;
    startSeconds: number;
  } | null>(null);

  const closeVideo = () => setActiveVideo(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Nagłówek
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        },
      );

      gsap.utils.toArray(".hope-card").forEach((card: any, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 60%",
              scrub: 1,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-zinc-950 text-white py-32 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Nagłówek */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-20">
          <Heart className="w-12 h-12 text-amber-500 mx-auto mb-6 animate-pulse" />
          <h2 className="text-zinc-500 text-xs md:text-sm uppercase tracking-[0.4em] mb-8 font-medium">
            Nadzieja
          </h2>
          <h3 className="text-4xl md:text-6xl font-serif font-light italic mb-6">
            Ci którzy dali szansę
          </h3>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Życie nie zawsze zaczyna się od idealnych warunków. Czasem zaczyna
            się od strachu, trudnej diagnozy lub samotności. Ale to właśnie tam,
            gdzie pojawia się odwaga, by dać szansę, rodzą się najpiękniejsze
            historie.
          </p>
        </div>

        {/* Historie nadziei */}
        <h3 className="text-center text-3xl md:text-4xl font-serif mb-4 text-zinc-50">
          Zobacz historie tych, którzy wybrali życie
        </h3>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
        >
          {hopeStories.map((story, i) => (
            <div
              key={i}
              className="hope-card group border border-amber-900/40 bg-linear-to-br from-zinc-900/70 to-zinc-950/80 backdrop-blur-md overflow-hidden rounded-xl hover:border-amber-500/50 hover:shadow-amber-500/10 hover:shadow-xl transition-all duration-500 h-fit"
            >
              {story.thumbnail && (
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={story.thumbnail}
                    alt={story.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    className="object-cover brightness-90 group-hover:brightness-75 group-hover:scale-105 transition-all duration-700"
                    quality={70}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-transparent opacity-60" />

                  <button
                    onClick={() => {
                      const parsed = parseYouTubeUrl(
                        story.videoUrl,
                        story.timestamp,
                      );
                      setActiveVideo(parsed);
                    }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center group/play cursor-pointer"
                    aria-label={`Odtwórz wideo: ${story.title}`}
                  >
                    <div className="w-16 h-16 bg-amber-500/95 hover:bg-amber-500 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl shadow-black/50 group-hover/play:shadow-amber-500/30 group-hover/play:scale-110 transition-all duration-300 border-4 border-white/30">
                      <Play className="w-7 h-7 text-black ml-1" />
                    </div>
                  </button>
                </div>
              )}

              <div className="p-7 md:p-8">
                <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-amber-400 mb-3">
                  {story.tag}
                </span>

                <h4 className="text-lg md:text-xl font-serif mb-2 text-zinc-50 leading-tight">
                  {story.title}
                </h4>

                <p className="text-sm text-amber-500/80 mb-4 font-medium">
                  {story.name}
                </p>

                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  {story.desc}
                </p>

                <blockquote className="text-sm text-zinc-200 leading-relaxed italic font-serif border-l-2 border-amber-500/50 pl-3">
                  "{story.quote}"
                </blockquote>
              </div>
            </div>
          ))}
        </div>

        {/* Modal YouTube */}
        {activeVideo && (
          <div
            className="fixed inset-0 z-9999 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={closeVideo}
          >
            <div
              className="relative w-full aspect-video max-w-5xl bg-zinc-900 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeVideo}
                className="absolute top-3 right-3 md:top-6 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 bg-zinc-900/95 hover:bg-zinc-800 text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-all touch-manipulation"
                aria-label="Zamknij wideo"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&start=${activeVideo.startSeconds}&rel=0&modestbranding=1&playsinline=1`}
                title="Historia nadziei"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        )}

        <p className="text-center text-xs mt-8 text-zinc-400">
          Filmy w języku polskim. Możesz włączyć napisy jeśli potrzebujesz.
        </p>

        <div className="mt-20 text-center max-w-3xl mx-auto">
          <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
            Każde z tych dzieci mogło nie istnieć. Ale ktoś dał im szansę – i
            dziś każde z nich jest cudem, który zmienia świat wokół siebie.
            Życie zawsze znajdzie drogę, jeśli tylko otworzymy przed nim drzwi.
          </p>
        </div>
      </div>
    </section>
  );
};

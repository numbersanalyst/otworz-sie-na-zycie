"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image, { StaticImageData } from "next/image";
import thumbnail1 from "@/assets/thumbnail1.jpg";
import thumbnail2 from "@/assets/thumbnail2.png";
import thumbnail3 from "@/assets/thumbnail3.png";
import { Play } from "lucide-react";
import { VideoModal } from "./VideoModal";

gsap.registerPlugin(ScrollTrigger);

const consequences = [
  {
    label: "Fakt",
    title: "Depresja po aborcji",
    desc: "Przegląd badań pokazuje, że u około 1 na 3 kobiety po aborcji pojawiają się objawy depresji – smutek, poczucie pustki, problemy ze snem i koncentracją.",
  },
  {
    label: "Emocje",
    title: "Poczucie winy i wstyd",
    desc: "W badaniach kobiety częściej mówią o poczuciu winy, wstydzie i żalu niż o samej uldze. Wracają pytania: „co by było, gdyby…?”, „czy mogłam inaczej?”",
  },
  {
    label: "Presja",
    title: "Decyzja pod przymusem",
    desc: "Gdy decyzja była pod presją partnera, rodziny czy pieniedzy, cierpienie jest zwykle większe – pojawia się doświadczenie zdrady samej siebie i swojego sumienia.",
  },
  {
    label: "Trauma",
    title: "Objawy jak PTSD / Syndrom poaborcyjny",
    desc: "U części kobiet występują natrętne wspomnienia, koszmary, unikanie ciąży i dzieci, silny lęk – obraz przypominający zespół stresu pourazowego.",
  },
];

const studyHeadlines = [
  {
    title: "Global prevalence of post-abortion depression",
    source: "BMC Psychiatry 2023",
    highlight: "ok. 34,5% kobiet po aborcji ma objawy depresji.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10605843/",
  },
  {
    title: "Abortion and mental health: quantitative synthesis",
    source: "Br. J. Psychiatry 2011",
    highlight: "zwiększone ryzyko zaburzeń nastroju po aborcji.",
    url: "https://pubmed.ncbi.nlm.nih.gov/21881096/",
  },
  {
    title: "Women Who Suffered Emotionally from Abortion",
    source: "JAP&S 2017",
    highlight: "regret, wstyd, poczucie winy, presja otoczenia.",
    url: "https://www.jpands.org/vol22no4/coleman.pdf",
  },
  {
    title: "Decision Rightness and Emotional Responses to Abortion",
    source: "PLOS ONE 2015",
    highlight: "emocje po aborcji zależą od zgodności z sumieniem.",
    url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0128832",
  },
  {
    title: "Abortion and mental health outcomes",
    source: "Systematic review protocol 2024",
    highlight: "pytanie: czy aborcja zwiększa ryzyko problemów psychicznych?",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11109527/",
  },
];

type Testimony = {
  tag: string;
  title: string;
  quote: string;
  quotePl?: string;
  name?: string;
  videoUrl: string;
  timestamp?: string;
  thumbnail?: StaticImageData;
};

const testimonies: Testimony[] = [
  {
    tag: "Sposób na uzdrowienie",
    title: "Nazwałam mojego syna",
    quote:
      "Part of my healing was actually recognizing that it was a child, it was a baby... I named my child Joshua and so that was very healing for me.",
    quotePl:
      "Częścią mojego uzdrowienia było uznanie, że to było dziecko... Nazwałam moje dziecko Joshua i to było dla mnie bardzo uzdrawiające.",
    name: "Linda",
    videoUrl: "https://www.youtube.com/watch?v=cPWvQamsMQg",
    timestamp: "02:46",
    thumbnail: thumbnail1,
  },
  {
    tag: "Syndrom postaborcyjny",
    title: "Emocjonalna huśtawka",
    quote:
      "I would have emotional roller coasters... severe depression, I was pretty much suicidal by the time I had the third abortion. My partner was experiencing the same symptoms.",
    quotePl:
      "Miałam emocjonalną huśtawkę... ciężką depresję, byłam praktycznie na skraju samobójstwa przy trzeciej aborcji. Mój partner doświadczał tych samych objawów.",
    name: "Patricia, była pracownica kliniki",
    videoUrl: "https://www.youtube.com/watch?v=X2Z37kuZwpE",
    timestamp: "14:18",
    thumbnail: thumbnail2,
  },
  {
    tag: "Świadectwo",
    title: "Płakał nade mną",
    quote:
      "I told him: 'Father, I had an abortion.' And he asked me to look up at him, and he was crying... for the loss of my little one, but he was crying for me, as well.",
    quotePl:
      "Powiedziałam: 'Ojcze, miałam aborcję'. Poprosił, bym na niego spojrzała, a on płakał... płakał nad stratą mojego maleństwa, ale płakał też nade mną.",
    name: "Kobieta z Project Rachel",
    videoUrl: "https://www.youtube.com/watch?v=0WB1wYqSPb0",
    timestamp: "05:20",
    thumbnail: thumbnail3,
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

export const Consequences = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const testimoniesRef = useRef<HTMLDivElement | null>(null);
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

      // Karty konsekwencji
      gsap.fromTo(
        ".consequence-card",
        { opacity: 0, y: 60, rotateX: -10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: true,
          },
        },
      );

      // Świadectwa - WCZEŚNIEJ, każda karta osobno
      gsap.utils.toArray(".testimony-card").forEach((card: any, i) => {
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
          <h2 className="text-zinc-500 text-xs md:text-sm uppercase tracking-[0.4em] mb-8 font-medium">
            Konsekwencje
          </h2>
          <h3 className="text-4xl md:text-6xl font-serif font-light italic mb-6">
            Co zostaje po „wyborze"?
          </h3>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Statystyki mówią o depresji, lęku i bólu. Badania i świadectwa
            pokazują, że decyzja o przerwaniu życia nie kończy historii – często
            dopiero ją zaczyna w sercu kobiety.
          </p>
        </div>
        {/* Pasek nagłówków badań */}
        <div className="relative overflow-hidden border border-zinc-800/70 bg-zinc-900/60 rounded-md mb-16">
          <div className="absolute inset-y-0 left-0 w-16 bg-linear-to-r from-zinc-950 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-zinc-950 to-transparent pointer-events-none z-10" />

          <div className="flex gap-8 py-3 animate-[marquee_40s_linear_infinite]">
            {[...studyHeadlines, ...studyHeadlines].map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 whitespace-nowrap text-xs md:text-[13px] text-zinc-300 hover:text-white transition-colors"
              >
                <span className="px-2 py-0.5 border border-zinc-700/70 rounded-full uppercase tracking-[0.2em] text-[9px] text-zinc-400">
                  Badania
                </span>
                <span className="font-semibold text-zinc-100 underline decoration-zinc-700/70 underline-offset-2">
                  {item.title}
                </span>
                <span className="text-zinc-400 italic">{item.highlight}</span>
              </a>
            ))}
          </div>
        </div>
        {/* Karty: fakty / psychika */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-24"
        >
          {consequences.map((item, i) => (
            <div
              key={i}
              className="consequence-card border border-zinc-800 bg-zinc-900/50 backdrop-blur-md p-7 md:p-8 relative overflow-hidden"
            >
              <div className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-3">
                {item.label}
              </div>
              <h4 className="text-2xl font-serif mb-4 text-zinc-50">
                {item.title}
              </h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {item.desc}
              </p>
              <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-zinc-700/60 to-transparent" />
            </div>
          ))}
        </div>
        {/* Świadectwa / nadzieja */}
        <h3 className="text-center text-4xl font-serif mb-4 text-zinc-50">
          Posłuchaj tego co prawdziwe, tych którzy doświadczyli
        </h3>
        <div
          ref={testimoniesRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
        >
          {testimonies.map((item, i) => (
            <div
              key={i}
              className="testimony-card group border border-zinc-800/60 bg-zinc-900/70 backdrop-blur-md overflow-hidden rounded-xl hover:border-emerald-500/40 hover:shadow-emerald-500/10 hover:shadow-xl transition-all duration-500 h-fit"
            >
              {item.thumbnail && (
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={item.thumbnail}
                    alt={`${item.name || "świadectwo"}`}
                    width={500}
                    height={500}
                    quality={60}
                    className="w-full h-full object-cover brightness-90 group-hover:brightness-75 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-transparent opacity-60" />

                  <button
                    onClick={() => {
                      const parsed = parseYouTubeUrl(
                        item.videoUrl,
                        item.timestamp,
                      );
                      setActiveVideo(parsed);
                    }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center group/play cursor-pointer"
                    aria-label={`Odtwórz wideo: ${item.title}`}
                  >
                    {" "}
                    <div className="w-16 h-16 bg-emerald-500/95 hover:bg-emerald-500 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl shadow-black/50 group-hover/play:shadow-emerald-500/30 group-hover/play:scale-110 transition-all duration-300 border-4 border-white/30">
                      <Play className="w-7 h-7 text-black ml-1" />
                    </div>
                  </button>
                </div>
              )}

              {/* Treść karty */}
              <div className="p-7 md:p-8">
                <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-emerald-400 mb-3">
                  {item.tag}
                </span>

                <h4 className="text-lg md:text-xl font-serif mb-4 text-zinc-50 leading-tight">
                  {item.title}
                </h4>

                <blockquote className="text-sm text-zinc-200 leading-relaxed mb-4 italic font-serif">
                  {item.quotePl}
                </blockquote>

                {item.quotePl && (
                  <p className="text-xs text-zinc-400 leading-relaxed font-serif italic border-l-2 border-zinc-700/50 pl-3">
                    "{item.quote}"
                  </p>
                )}

                {item.name && (
                  <p className="mt-4 text-[11px] text-zinc-500 italic font-serif">
                    – {item.name}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Modal YouTube */}
        {activeVideo && (
          <VideoModal
            videoId={activeVideo.videoId}
            startSeconds={activeVideo.startSeconds}
            title="Świadectwo"
            onClose={closeVideo}
          />
        )}
        <p className="text-center text-xs mt-8 text-zinc-400 mb-8">
          Świadectwa w języku angielskim. Można włączyć napisy po Polsku.
        </p>

        <div className="mt-20 text-center max-w-3xl mx-auto">
          <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
            Cierpienie po aborcji jest prawdziwe, ale nie jest ostatnim słowem.
            Wiele kobiet podkreśla, że dopiero spotkanie z kimś, kto ich nie
            potępił – spowiednik, psycholog, wspólnota – otworzyło drogę do
            przebaczenia sobie i odkrycia, że są nadal kochane.
          </p>
        </div>
      </div>
    </section>
  );
};

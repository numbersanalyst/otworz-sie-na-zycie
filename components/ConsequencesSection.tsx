"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const testimonies = [
  {
    tag: "Świadectwo",
    title: "„Nie mogłam sobie wybaczyć”",
    desc: "Po aborcji zamknęłam się w sobie. Najtrudniejsze było przebaczyć samej sobie. Dopiero rozmowa ze spowiednikiem i powrót do sakramentów otworzyły drogę do uzdrowienia.",
  },
  {
    tag: "Świadectwo",
    title: "„Mówili, że nie mam wyboru”",
    desc: "Chciałam urodzić, ale wszyscy powtarzali, że muszę być „rozsądna”. Zgodziłam się pod presją. Zostałam sama z lękiem i poczuciem, że zdradziłam swoje serce.",
  },
  {
    tag: "Nadzieja",
    title: "„Moje dziecko żyje u Boga”",
    desc: "Latami uciekałam od tematu, dopóki nie usłyszałam, że mogę nazwać moje dziecko i oddać je Bogu. Dziś wierzę, że ono żyje u Boga, a ja mogę bronić życia innych.",
  },
];

export const ConsequencesSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom bottom",
          scrub: true,
        },
      });

      tl.fromTo(
        ".consequences-heading",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1 },
      )
        .fromTo(
          ".consequence-card",
          { opacity: 0, y: 60, rotateX: -10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15,
          },
          "-=0.3",
        )
        .fromTo(
          ".testimony-card",
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
          },
          "+=0.3",
        );
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
        <div className="consequences-heading text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-zinc-500 text-sm uppercase tracking-[0.3em] mb-4">
            Konsekwencje
          </h2>
          <h3 className="text-4xl md:text-6xl font-serif font-light italic mb-6">
            Co zostaje po „wyborze”?
          </h3>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Statystyki mówią o depresji, lęku i bólu. Badania i świadectwa
            pokazują, że decyzja o przerwaniu życia nie kończy historii – często
            dopiero ją zaczyna w sercu kobiety.
          </p>
        </div>

        {/* Pasek nagłówków badań */}
        <div className="relative overflow-hidden border border-zinc-800/70 bg-zinc-900/60 rounded-md mb-16">
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-zinc-950 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-zinc-950 to-transparent pointer-events-none" />

          <div className="flex gap-8 py-3 animate-[marquee_40s_linear_infinite]">
            {studyHeadlines.map((item, i) => (
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
                <span className="text-zinc-500">· {item.source}</span>
                <span className="text-zinc-400 italic">{item.highlight}</span>
              </a>
            ))}

            {studyHeadlines.map((item, i) => (
              <a
                key={`clone-${i}`}
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
                <span className="text-zinc-500">· {item.source}</span>
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
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent" />
            </div>
          ))}
        </div>

        {/* Świadectwa / nadzieja */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {testimonies.map((item, i) => (
            <div
              key={i}
              className="testimony-card border border-zinc-800 bg-zinc-900/60 p-7 md:p-8 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-emerald-400 mb-3">
                  {item.tag}
                </span>
                <h4 className="text-lg md:text-xl font-serif mb-3 text-zinc-50">
                  {item.title}
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <p className="mt-6 text-xs text-zinc-500 italic">
                Imiona i szczegóły zmienione. Ważne jest doświadczenie serca.
              </p>
            </div>
          ))}
        </div>

        {/* Stopka nadziei */}
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

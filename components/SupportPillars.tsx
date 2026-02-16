"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

import hospicjumPerinatalne from "@/assets/hospicjum-perinatalne.jpg";
import broniszewice from "@/assets/dom-broniszewice.jpg";
import candle from "@/assets/candle.jpg";

gsap.registerPlugin(ScrollTrigger);

const supportData = [
  {
    title: "Dom Chłopaków w Broniszewicach",
    description:
      "Miejsce prowadzone przez Siostry Dominikanki, które udowadnia, że niepełnosprawność to nie wyrok. To dom pełen radości, który uczy, że każde życie jest bezcennym darem zdolnym do dawania niesamowitego szczęścia.",
    image: broniszewice,
    alt: "Dom Chłopaków",
    reversed: false,
    href: "https://www.facebook.com/dpsbroniszewice/",
  },
  {
    title: "Hospicja Perinatalne",
    description:
      "Gdy diagnoza prenatalna jest najtrudniejszą z możliwych, rodzice nie zostają sami. Hospicja oferują wsparcie medyczne i psychologiczne, pozwalając na godne powitanie i pożegnanie dziecka w atmosferze miłości.",
    image: hospicjumPerinatalne,
    alt: "Wsparcie perinatalne",
    reversed: true,
    href: "https://pro-life.pl/hospicja/",
  },
  {
    title: "Pamięć i Ukojenie (15.10)",
    description:
      "Dzień Dziecka Utraconego przywraca godność najmłodszym. Możliwość nadania imienia, modlitwa czy zapalenia światła pamięci to dla wielu rodziców kluczowy krok do odzyskania wewnętrznego pokoju po stracie.",
    image: candle,
    alt: "Świeca pamięci",
    reversed: false,
    href: "https://fiat.fm/kosciol/mali-wstawiennicy-w-niebie-dzien-dziecka-utraconego-w-archidiecezji-czestochowskiej/",
  },
];

export const SupportPillars = () => {
  const sectionRef = useRef(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    blocksRef.current.forEach((block, index) => {
      gsap.fromTo(
        block,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1,
        },
      );
    });
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !blocksRef.current.includes(el)) {
      blocksRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="bg-zinc-50 py-24 md:py-36 px-6 overflow-hidden"
    >
      <div className="max-w-3xl mx-auto text-center mb-24">
        <h2 className="text-zinc-600 text-xs md:text-sm uppercase tracking-[0.4em] mb-8 font-medium">
          Realne Wsparcie
        </h2>
        <h3 className="text-4xl md:text-6xl font-serif text-zinc-900">
          Tu rodzi się nadzieja
        </h3>
        <p className="mt-6 text-zinc-600 text-lg font-light leading-relaxed">
          Godność życia to nie tylko hasło – to konkretne działania, miejsca i
          ludzie, którzy czekają, by podać Ci rękę. Poznaj niektóre z nich.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-24 md:space-y-32">
        {supportData.map((item, index) => (
          <div
            key={index}
            ref={addToRefs}
            className={`flex flex-col ${
              item.reversed ? "md:flex-row-reverse" : "md:flex-row"
            } items-center gap-12 md:gap-24`}
          >
            <div className="w-full md:w-1/2">
              <div className="relative aspect-4/3 w-full rounded-none overflow-hidden shadow-xl bg-zinc-200 border border-zinc-200 group">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
            </div>

            <div className="w-full md:w-1/2 space-y-6">
              <div className="w-12 h-px bg-zinc-400 mb-6"></div>

              <h4 className="text-3xl font-serif text-zinc-800 leading-tight">
                {item.title}
              </h4>
              <p className="text-zinc-600 text-lg leading-relaxed font-light">
                {item.description}
              </p>

              {item.href && (
                <div className="pt-4">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 border border-zinc-300 text-zinc-600 text-xs uppercase tracking-widest font-medium hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all duration-300 group"
                    aria-label={`Zobacz więcej o: ${item.title}`}
                  >
                    Zobacz więcej
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

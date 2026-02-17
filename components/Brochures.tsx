"use client";

import { useRef, useLayoutEffect } from "react";
import { Download } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Brochure {
  title: string;
  subtitle: string;
  url: string;
}

const brochures: Brochure[] = [
  {
    title: "Od kiedy?",
    subtitle: "Od poczęcia",
    url: "https://pro-life.pl/wp-content/uploads/2023/08/biblioteczka-pro-life-01-od-kiedy-od-poczecia-wydanie-2023.pdf",
  },
  {
    title: "ABORCJA",
    subtitle: "Bolesna nieobecność",
    url: "https://pro-life.pl/wp-content/uploads/2023/09/biblioteczka-pro-life-03-aborcja-bolesna-nieobecnosc-wydanie-2023.pdf",
  },
  {
    title: "IN VITRO",
    subtitle: "Za jaką cenę?",
    url: "https://pro-life.pl/wp-content/uploads/2023/08/biblioteczka-pro-life-04-in-vitro-za-jaka-cene-wydanie-2023.pdf",
  },
  {
    title: "ADOPCJA",
    subtitle: "Narodziny z serca",
    url: "https://pro-life.pl/wp-content/uploads/2022/09/biblioteczka-pro-life-05-adopcja-narodziny-z-serca.pdf",
  },
  {
    title: "Jesteś",
    subtitle: "Doświadczenie poronienia",
    url: "https://pro-life.pl/wp-content/uploads/2023/08/biblioteczka-pro-life-07-jestes-doswiadczenie-poronienia.pdf",
  },
  {
    title: "Hospicjum perinatalne",
    subtitle: "Dla nienarodzonego pacjenta",
    url: "https://pro-life.pl/wp-content/uploads/2025/06/biblioteczka-pro-life-09-hospicja-perinatalne-06-06-2025-e-wydanie.pdf",
  },
  {
    title: 'Tabletka "dzień po"',
    subtitle: "Co warto wiedzieć",
    url: "https://pro-life.pl/wp-content/uploads/2025/01/ulotka-pro-life-tabletka-dzien-po-e-wydanie.pdf",
  },
];

export const Brochures = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
            },
          },
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full py-24 px-6 md:px-12 bg-white text-zinc-900 border-t border-zinc-100"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-zinc-600 text-sm uppercase tracking-[0.3em] mb-4 font-medium">
            Edukacja
          </h2>
          <h3 className="font-serif text-3xl md:text-5xl font-light text-zinc-900 leading-tight">
            Chcesz wiedzieć więcej? <br />
            <span className="italic text-zinc-800 font-serif">
              Pobierz opracowania i broszury
            </span>
          </h3>
        </div>

        {/* Grid of brochures */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          {brochures.map((brochure, index) => (
            <a
              key={index}
              href={brochure.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-row md:flex-col items-center md:items-start justify-between p-5 md:p-8 border border-zinc-200 bg-zinc-50/50 hover:bg-white hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300 rounded-sm"
            >
              <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
                <div className="w-8 h-8 md:mb-6 text-zinc-400 group-hover:text-emerald-600 transition-colors duration-300 shrink-0">
                  <Download className="w-full h-full stroke-[1.5px]" />
                </div>
                <div className="text-left">
                  <h3 className="text-base md:text-lg font-serif font-medium text-zinc-900 mb-1 md:mb-2 group-hover:text-emerald-800 transition-colors">
                    {brochure.title}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed line-clamp-1 md:line-clamp-none">
                    {brochure.subtitle}
                  </p>
                </div>
              </div>

              <div className="md:mt-8 hidden md:flex items-center text-xs uppercase tracking-widest text-zinc-400 group-hover:text-emerald-600 font-medium transition-colors">
                Pobierz PDF
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

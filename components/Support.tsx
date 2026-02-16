"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Heart,
  Home,
  Baby,
  Phone,
  Cross,
  Flame,
  ExternalLink,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const supportItems = [
  {
    title: "Adopcja",
    description:
      "Narodziny z serca. Droga miłości dla tych, którzy chcą stworzyć dom dla dziecka potrzebującego rodziny.",
    icon: <Heart className="w-8 h-8 stroke-[1px]" />,
    href: "https://www.gov.pl/web/rodzina/adopcja",
  },
  {
    title: "Okno Życia",
    description:
      "Bezpieczny, anonimowy punkt, w którym matka może pozostawić noworodka, gwarantując mu bezpieczną przyszłość.",
    icon: <Baby className="w-8 h-8 stroke-[1px]" />,
    href: "https://pro-life.pl/okna-zycia/",
  },
  {
    title: "Dom Samotnej Matki",
    description:
      "Azyl dla kobiet w ciąży i matek z dziećmi, które znalazły się w trudnej sytuacji życiowej lub materialnej.",
    icon: <Home className="w-8 h-8 stroke-[1px]" />,
    href: "https://pro-life.pl/domy-samotnej-matki/",
  },
  {
    title: "Telefony Zaufania",
    description:
      "Bezpłatna, anonimowa pomoc 24/7. Rozmowa ze specjalistą, która może stać się pierwszym krokiem do rozwiązania problemów.",
    icon: <Phone className="w-8 h-8 stroke-[1px]" />,
    href: "https://pro-life.pl/telefon/",
  },
  {
    title: "Moc modlitwy",
    description:
      "Zakony kontemplacyjne, które otaczają modlitwą pamięć o dzieciach utraconych.",
    icon: <Cross className="w-8 h-8 stroke-[1px]" />,
  },
  {
    title: "Pomniki nienarodzonych dzieci",
    description:
      "Pomniki oraz Groby Dzieci Utraconych w całej Polsce – przestrzenie wspólnotowej żałoby, przywracające godność każdemu życiu.",
    icon: <Flame className="w-8 h-8 stroke-[1px]" />,
  },
];

export const Support = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        },
      );

      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
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
      className="bg-[#0A0A0A] py-24 px-6 md:px-12 lg:px-24 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-zinc-500 text-xs md:text-sm uppercase tracking-[0.4em] mb-8 font-medium">
            Wiecej wsparcia
          </h2>
          <h3 className="text-4xl md:text-6xl font-serif font-light text-white italic mb-6">
            Nie jesteś sama. <br /> Nie jesteś sam.
          </h3>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Gdy sytuacja wydaje się bez wyjścia, rozejrzyj się. Wokół są ludzie
            i instytucje gotowe pomóc bez oceniania. Otwórz się na pomoc lub sam
            ją podaruj.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {supportItems.map((item, index) => {
            const Wrapper = item.href ? "a" : "div";
            const props = item.href
              ? {
                  href: item.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : {};
            const isLink = !!item.href;

            return (
              <Wrapper
                key={index}
                {...props}
                aria-label={
                  isLink ? `Dowiedz się więcej o: ${item.title}` : undefined
                }
                className={`group p-8 border border-white/5 bg-white/2 backdrop-blur-sm 
                    ${isLink ? "hover:bg-white/5 hover:border-white/20 cursor-pointer" : ""} 
                    transition-all duration-500 rounded-sm relative overflow-hidden flex flex-col`}
              >
                {isLink && (
                  <div className="md:block hidden absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <ExternalLink className="w-5 h-5 text-zinc-500 group-hover:text-white" />
                  </div>
                )}

                <div className="text-zinc-500 group-hover:text-white transition-colors duration-500 mb-6">
                  {item.icon}
                </div>

                <h3
                  className={`text-2xl font-serif font-light text-white mb-4 transition-transform duration-300 ${isLink ? "group-hover:translate-x-1" : ""}`}
                >
                  {item.title}
                </h3>

                <p className="text-zinc-400 font-light leading-relaxed text-sm grow">
                  {item.description}
                </p>

                {isLink && (
                  <div className="mt-4 pt-4 border-t border-white/5 md:hidden">
                    <span className="text-xs uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                      Dowiedz się więcej <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                )}
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

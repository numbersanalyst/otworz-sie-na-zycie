"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Heart,
  Home,
  Baby,
  ShieldCheck,
  Phone,
  Sparkles,
  Cross,
  Flame,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const supportItems = [
  {
    title: "Adopcja",
    description: "Narodziny z serca. Inna droga do tego samego cudu życia.",
    icon: <Heart className="w-8 h-8 stroke-[1px]" />,
  },
  {
    title: "Dom Samotnej Matki",
    description:
      "Miejsce, gdzie żadna kobieta nie zostaje sama ze swoimi lękami.",
    icon: <Home className="w-8 h-8 stroke-[1px]" />,
  },
  {
    title: "Okno Życia",
    description:
      "Ostateczny gest miłości, który gwarantuje bezpieczną przyszłość.",
    icon: <Baby className="w-8 h-8 stroke-[1px]" />,
  },
  {
    title: "Hospicjum Perinatalne",
    description:
      "Towarzyszenie w najtrudniejszych chwilach z godnością i czułością.",
    icon: <ShieldCheck className="w-8 h-8 stroke-[1px]" />,
  },
  {
    title: "Telefony Zaufania",
    description:
      "Bezpłatna, anonimowa pomoc 24/7. Zadzwoń – nie jesteś sama w trudnej chwili.",
    icon: <Phone className="w-8 h-8 stroke-[1px]" />,
  },
  {
    title: "Zakony, które się modlą",
    description:
      "Siostry zakonne i bracia mnisi codziennie modlą się za dzieci utracone i ich rodziców. Możesz nadać dziecku imię – zakonnice będą je wymawiać w modlitwie.",
    icon: <Cross className="w-8 h-8 stroke-[1px]" />,
  },
  {
    title: "Pomniki Dzieci Nienarodzonych",
    description:
      "W całej Polsce stoją pomniki pamięci. Możesz przyjść, zapalić znicz i pożegnać swoje dziecko. Ono było, miało znaczenie i nie zostało zapomniane.",
    icon: <Heart className="w-8 h-8 stroke-[1px]" />,
  },
];

export const Support = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const cards = cardsRef.current?.children;
    if (!cards) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      },
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-[#0A0A0A] py-24 px-6 md:px-12 lg:px-24 min-h-screen flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-16">
          <p className="text-xl font-light text-zinc-400 max-w-2xl italic">
            Pamiętaj:
          </p>
          <h2 className="text-4xl md:text-6xl font-serif font-light text-white mb-6">
            Nie jesteś sama. <br /> Nie jesteś sam.
          </h2>
          <p className="text-xl font-light text-zinc-400 max-w-2xl">
            Godność życia to nie tylko hasło – to konkretne działania, miejsca i
            ludzie, którzy czekają, by podać Ci rękę. Poznaj filary wsparcia.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {supportItems.map((item, index) => (
            <div
              key={index}
              className="group p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 rounded-sm"
            >
              <div className="text-zinc-500 group-hover:text-white transition-colors duration-500 mb-6">
                {item.icon}
              </div>
              <h3 className="text-2xl font-serif font-light text-white mb-4">
                {item.title}
              </h3>
              <p className="text-zinc-400 font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

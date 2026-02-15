"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import genKidPhoto from "@/assets/genkid.webp";
import abortionPhoto from "@/assets/abortion1.jpg";
import pillPhoto from "@/assets/pill.webp";
import euthanasiaPhoto from "@/assets/euthanasia.jpeg";
import Image from "next/image";

const issues = [
  {
    title: "In Vitro",
    desc: "Selekcja genetyczna i nadliczbowe życie.",
    pos: "md:translate-y-12",
    photo: genKidPhoto,
  },
  {
    title: "Aborcja",
    desc: "Bolesna nieobecność w imię wyboru.",
    pos: "md:-translate-y-8",
    photo: abortionPhoto,
  },
  {
    title: "Tabletka po",
    desc: "Decyzja podjęta w pośpiechu i lęku.",
    pos: "md:translate-y-4",
    photo: pillPhoto,
  },
  {
    title: "Eutanazja",
    desc: "Gdy życie przestaje spełniać normy wydajności.",
    pos: "md:-translate-y-12",
    photo: euthanasiaPhoto,
  },
];

export const Contrast = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "center center",
          scrub: true,
        },
      },
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white py-32 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={textRef} className="text-center mb-24">
          <h2 className="text-zinc-500 text-sm uppercase tracking-[0.3em] mb-4">
            Pytanie o jutro
          </h2>
          <h3 className="text-5xl md:text-7xl font-serif font-light mb-8 italic">
            Czy to prawda? <br /> Dokąd zmierza świat?
          </h3>
        </div>

        {/* Chaos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {issues.map((issue, i) => (
            <div
              key={i}
              className={`p-8 border border-zinc-800 bg-zinc-950/50 backdrop-blur-md ${issue.pos}`}
            >
              <div className="h-40 mb-6 flex items-center justify-center font-serif italic">
                <Image
                  src={issue.photo}
                  alt={issue.title}
                  quality={75}
                  className="w-full h-full object-cover object-[50%_20%]"
                />
              </div>
              <h4 className="text-xl font-serif mb-3 text-zinc-200">
                {issue.title}
              </h4>
              <p className="text-sm text-zinc-500 font-light leading-relaxed">
                {issue.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center">
          <p className="text-2xl md:text-4xl font-serif font-light text-zinc-400">
            To często <span className="text-white italic">wygoda</span>, <br />
            ale czy na pewno...{" "}
            <span className="text-white font-normal underline decoration-zinc-700 underline-offset-8">
              słuszna?
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

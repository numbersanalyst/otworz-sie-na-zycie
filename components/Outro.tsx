"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import background from "@/assets/background.jpg";

gsap.registerPlugin(ScrollTrigger);

export const Outro = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      gsap.fromTo(
        subtextRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-zinc-950 text-white py-40 px-6 overflow-hidden relative"
    >
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={background}
          alt="Background"
          fill
          className="object-cover opacity-10 grayscale"
          placeholder="blur"
          quality={60}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/50 to-zinc-950/90" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div ref={textRef}>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light mb-8 italic leading-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent drop-shadow-2xl">
            Nie pozostań <br /> obojętny.
          </h2>
        </div>

        <p
          ref={subtextRef}
          className="text-xl md:text-2xl mt-8 font-light text-zinc-300 max-w-2xl mx-auto leading-relaxed drop-shadow-lg"
        >
          Czy potrafimy jeszcze odróżnić cud od produktu?
        </p>
      </div>
    </section>
  );
};

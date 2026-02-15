"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import logo from "@/assets/logo-psozc.svg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
          },
        },
      );

      gsap.fromTo(
        logoRef.current,
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={containerRef}
      className="relative bg-zinc-950 text-white py-24 px-6 overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent opacity-50" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div
          ref={contentRef}
          className="mb-12 flex flex-col items-center gap-6"
        >
          <p className="text-xl md:text-3xl font-serif italic text-zinc-500 leading-relaxed max-w-2xl">
            Praca na konkurs
            <br />
            <span className="text-zinc-200 block">
              Stowarzyszenia Obrońców Życia Człowieka
            </span>
          </p>
        </div>

        <a href="https://pro-life.pl" target="_blank" rel="noopener noreferrer">
          <div ref={logoRef} className="flex justify-center mb-10">
            <Image
              src={logo}
              alt="Logo Stowarzyszenia Obrońców Życia Człowieka"
              width={300}
              height={100}
              className="opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </a>

        <div className="flex justify-center mb-8">
          <a
            href="https://github.com/numbersanalyst/otworz-sie-na-zycie"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all duration-300 group"
          >
            <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-xs uppercase tracking-wider font-medium">
              Zobacz kod strony na GitHub
            </span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />
    </footer>
  );
};

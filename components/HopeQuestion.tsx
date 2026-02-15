"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const HopeQuestion = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      },
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#f9f8f4] text-[#2d2d2d] py-40 px-6 overflow-hidden border-y border-zinc-200"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={textRef} className="text-center">
          <h2 className="text-zinc-600 text-xs md:text-sm uppercase tracking-[0.4em] mb-8 font-medium">
            Co gdyby istniała inna droga?
          </h2>
          <h3 className="text-4xl md:text-6xl font-serif font-light leading-tight text-zinc-900">
            Nigdy nie jest za późno na <br className="hidden md:block" />
            <span className="italic text-zinc-700 font-serif">
              pokój w sercu.
            </span>
          </h3>
          <p className="mt-12 text-zinc-800 max-w-2xl mx-auto font-light leading-relaxed text-lg italic">
            Nie przyszedłem bowiem po to, aby świat sądzić, ale aby świat
            zbawić. – Jan 12,47
          </p>
        </div>
      </div>
    </section>
  );
};

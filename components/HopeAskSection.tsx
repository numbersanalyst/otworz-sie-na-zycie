"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const HopeAskSection = () => {
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
        <div ref={textRef} className="text-center">
          <h2 className="text-zinc-500 text-sm uppercase tracking-[0.3em] mb-4">
            Co gdyby istniała inna droga?
          </h2>
          <h3 className="text-5xl md:text-7xl font-serif font-light italic">
            Nie musisz wybierać między życiem a wolnością.
          </h3>
        </div>
      </div>
    </section>
  );
};

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LoaderProps {
  onComplete?: () => void;
}

export const Loader = ({ onComplete }: LoaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  const text = "Otwórz się, na to co piękne";

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    gsap.set(textRef.current, { visibility: "visible" });

    const chars = textRef.current.querySelectorAll(".char");
    const container = containerRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(container, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            setIsVisible(false);
            onComplete?.();
          },
        });
      },
    });

    tl.from(chars, {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
      stagger: 0.04,
      duration: 0.6,
      ease: "power3.out",
    });

    tl.to(chars, {
      opacity: 0,
      y: -20,
      filter: "blur(5px)",
      stagger: 0.02,
      duration: 0.4,
      ease: "power2.in",
      delay: 0.5,
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 flex items-center justify-center"
      style={{ backgroundColor: "#181614" }}
    >
      <div
        ref={textRef}
        className="text-2xl sm:text-4xl md:text-6xl font-serif font-light text-white invisible whitespace-nowrap px-4"
      >
        {text.split("").map((char, i) => (
          <span key={i} className="char inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
};

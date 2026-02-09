"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import heroImage from "@/public/sky-full.webp";
import windowFrameImage from "@/public/window_frame.webp";
import windowLeftImage from "@/public/window_left.webp";
import windowRightImage from "@/public/window_right.webp";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

export const WindowOpeningHero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const skyContainerRef = useRef<HTMLDivElement>(null);
  const windowContainerRef = useRef<HTMLDivElement>(null);
  const windowLeftRef = useRef<HTMLDivElement>(null);
  const windowRightRef = useRef<HTMLDivElement>(null);
  const heroHeaderRef = useRef<HTMLDivElement>(null);
  const heroCopyRef = useRef<HTMLDivElement>(null);

  useLenis(() => ScrollTrigger.update());

  useLayoutEffect(() => {
    if (
      !heroRef.current ||
      !skyContainerRef.current ||
      !windowContainerRef.current ||
      !windowLeftRef.current ||
      !windowRightRef.current ||
      !heroHeaderRef.current ||
      !heroCopyRef.current
    ) {
      return;
    }

    const skyContainer = skyContainerRef.current;
    const windowContainer = windowContainerRef.current;
    const windowLeft = windowLeftRef.current;
    const windowRight = windowRightRef.current;
    const heroHeader = heroHeaderRef.current;
    const heroCopy = heroCopyRef.current;

    const skyMoveDistance = skyContainer.offsetHeight - window.innerHeight;

    gsap.set(heroCopy, { yPercent: 100 });

    const scrollTrigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 3}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const windowScale = progress <= 0.5 ? 1 + (progress / 0.5) * 4 : 5;

        gsap.set(windowContainer, { scale: windowScale });
        gsap.set(heroHeader, {
          scale: windowScale + progress * 1.5,
          z: progress * 500,
          visibility: progress <= 0.66 ? "visible" : "hidden",
        });

        const wingProgress = Math.min(progress / 0.5, 1);
        const wingScaleX = 1 + wingProgress;
        const wingOpacity = Math.max(0, 1 - wingProgress * 2.5);

        gsap.set(windowLeft, {
          scaleX: windowScale - progress * 3 * wingScaleX,
          scaleY: windowScale - progress * 0.5,
          x: -progress * 900,
          y: progress * 25,
          rotation: -progress * 5,
          rotateX: -progress * 10,
          opacity: wingOpacity,
          transformOrigin: "center center",
        });

        gsap.set(windowRight, {
          scaleX: windowScale - progress * 3 * wingScaleX,
          scaleY: windowScale - progress * 0.5,
          x: progress * 900,
          y: progress * 25,
          rotation: progress * 5,
          rotateX: -progress * 10,
          opacity: wingOpacity,
          transformOrigin: "center center",
        });

        gsap.set(skyContainer, { y: -progress * skyMoveDistance });

        const heroCopyY =
          progress <= 0.66
            ? 100
            : progress >= 1
              ? 0
              : 100 * (1 - (progress - 0.66) / 0.34);

        gsap.set(heroCopy, { yPercent: heroCopyY });
      },
    });

    return () => scrollTrigger.kill();
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        className="relative w-full h-svh overflow-hidden perspective-[1000px]"
      >
        <div
          ref={skyContainerRef}
          className="absolute top-0 left-0 w-full will-change-transform h-[350svh]"
        >
          <Image
            className="w-full h-full object-cover"
            src={heroImage}
            width={1920}
            height={3500}
            alt="niebo"
            priority
          />
        </div>

        <div
          ref={heroCopyRef}
          className="absolute top-0 left-0 w-full will-change-transform h-svh flex items-center justify-center z-30"
        >
          <h1 className="text-6xl font-serif font-light w-5/6">
            To, co się rozwija tutaj, nie jest sceną, ale trwałością.
            Sustentowany moment, gdzie skalę znikają, krawędzie się zwracają, a
            perwersja trwa dłużej niż oczekiwano. Ramka jest stała, gdy świat za
            nią się zmienia.
          </h1>
        </div>

        <div
          ref={windowContainerRef}
          className="absolute top-0 left-0 w-full will-change-transform h-svh z-20"
        >
          <Image
            className="w-full h-full object-cover pointer-events-none"
            src={windowFrameImage}
            width={1920}
            height={1080}
            alt="okno otwierające się do nieba"
            priority
          />
        </div>

        <div
          ref={windowLeftRef}
          className="absolute top-0 left-0 w-full will-change-transform h-svh z-10"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Image
            className="w-full h-full object-cover pointer-events-none"
            src={windowLeftImage}
            width={1920}
            height={1080}
            alt="lewe skrzydło okna"
            priority
          />
        </div>

        <div
          ref={windowRightRef}
          className="absolute top-0 left-0 w-full will-change-transform h-svh z-10"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Image
            className="w-full h-full object-cover pointer-events-none"
            src={windowRightImage}
            width={1920}
            height={1080}
            alt="prawe skrzydło okna"
            priority
          />
        </div>

        <div
          ref={heroHeaderRef}
          className="absolute top-0 left-0 w-full will-change-transform h-svh flex items-center justify-center p-8 transform-3d z-30"
        >
          <div className="flex-1 flex flex-col h-full justify-between">
            <h1 className="text-6xl font-serif font-light">
              Otwórz <br /> się miłość
            </h1>
            <p className="text-2xl font-serif font-light">
              Prawdziwa wielkość nie zaczyna się od krzyku, ale od cichego
              przyzwolenia na miłość. To tutaj bije źródło wszystkiego, co w nas
              nieśmiertelne.
            </p>
          </div>

          <div className="flex-1 flex flex-col h-full justify-between items-end text-right">
            <p className="text-2xl font-serif font-light">Wybór jest prosty</p>
            <h1 className="text-6xl font-serif font-light">
              Nie ma nic cenniejszego niż życie
            </h1>
          </div>
        </div>
      </section>
      <section className="p-8 flex items-center justify-center h-svh">
        <h1 className="text-6xl font-serif font-light">Koniec.</h1>
      </section>
    </>
  );
};

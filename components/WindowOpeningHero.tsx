"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import heroImage from "@/public/sky-full.webp";
import windowFrameImage from "@/public/window_frame.webp";
import windowLeftImage from "@/public/window_left.webp";
import windowRightImage from "@/public/window_right.webp";
import cloudsImage from "@/public/clouds.webp";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const WindowOpeningHero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const skyContainerRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
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
      !cloudsRef.current ||
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
    const clouds = cloudsRef.current;
    const heroHeader = heroHeaderRef.current;
    const heroCopy = heroCopyRef.current;

    const skyMoveDistance = skyContainer.offsetHeight - window.innerHeight;

    gsap.set(heroCopy, { yPercent: 100 });

    const cloudMarqueeTween = gsap.to(clouds, {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    });

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

        let cloudYPercent = 0;
        let cloudOpacity = 1;

        // Start moving clouds UP as window opens (exit animation)
        // Adjust start point (0.1) and speed (150) as needed
        if (progress > 0.1) {
          cloudYPercent = -(progress - 0.1) * 150;
          cloudOpacity = Math.max(0, 1 - (progress - 0.1) * 2);
        }

        gsap.set(clouds, {
          yPercent: cloudYPercent,
          opacity: cloudOpacity,
          // No scale or pixel-y manipulation here, just pure percent-based move
        });

        const heroCopyY =
          progress <= 0.66
            ? 100
            : progress >= 1
              ? 0
              : 100 * (1 - (progress - 0.66) / 0.34);

        gsap.set(heroCopy, { yPercent: heroCopyY });
      },
    });

    return () => {
      scrollTrigger.kill();
      cloudMarqueeTween.kill();
    };
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden perspective-[1000px]"
      >
        <div
          ref={skyContainerRef}
          className="absolute top-0 left-0 w-full will-change-transform h-[350vh]"
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
          className="absolute top-0 left-0 w-full will-change-transform h-screen flex items-center justify-center z-30"
        >
          <h1 className="text-6xl font-serif font-light w-5/6">
            Każde życie jest historią, która zasługuje na opowiedzenie.
          </h1>
        </div>

        <div
          ref={cloudsRef}
          className="absolute top-1/4 left-0 w-[800%] md:w-[300%] h-[60vh] z-10 flex flex-row pointer-events-none"
        >
          {/* First Cloud Image */}
          <div className="w-full h-full relative flex justify-center items-start">
            <Image
              className="w-full h-full object-contain object-top drop-shadow-xl scale-200"
              src={cloudsImage}
              width={1920}
              height={600}
              alt="chmury"
              priority
            />
          </div>
          {/* Duplicate Cloud Image for Seamless Loop */}
          <div className="w-full h-full relative flex justify-center items-start">
            <Image
              className="w-full h-full object-contain object-top drop-shadow-xl scale-200"
              src={cloudsImage}
              width={1920}
              height={600}
              alt="chmury"
              priority
            />
          </div>
        </div>

        <div
          ref={windowContainerRef}
          className="absolute top-0 left-0 w-full will-change-transform h-screen z-20"
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
          className="absolute top-0 left-0 w-full will-change-transform h-screen z-10"
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
          className="absolute top-0 left-0 w-full will-change-transform h-screen z-10"
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
          className="absolute top-0 left-0 w-full will-change-transform h-screen flex md:flex-row flex-col items-center md:justify-center justify-between p-6 md:p-14 transform-3d z-30"
        >
          <div className="md:flex-1 flex flex-col md:h-full justify-between">
            <h1 className="text-5xl md:text-6xl font-serif font-light">
              Życie to
              <br /> najpiękniejszy dar
            </h1>
            <p className="text-xl lg:text-2xl font-serif font-light md:block hidden">
              Każdy dzień jest zaproszeniem, by ten dar rozwijać, chronić i
              dzielić się nim z innymi. Choć bywa trudne i pełne prób, niesie w
              sobie sens i nadzieję. W życiu uczymy się miłości,
              odpowiedzialności i wiary. Dlatego warto przeżywać je świadomie, z
              wdzięcznością i szacunkiem dla każdego człowieka.
            </p>
          </div>

          <div className="md:flex-1 flex flex-col md:h-full justify-between items-end text-right">
            <p className="text-2xl font-serif font-light md:block hidden">
              Jest bezcenne,
              <br /> prosto od Boga
            </p>
            <div className="flex flex-col gap-y-5 md:gap-y-10">
              <h1 className="text-4xl md:text-6xl font-serif font-light">
                To co najpiękniejsze <br /> jest w nas
              </h1>

              <hr />

              <p className="font-serif font-light text-xl flex justify-end items-center gap-x-2">
                Zjedź niżej, aby dowiedzieć się więcej
                <ArrowDown width={20} height={20} />
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="p-8 flex items-center justify-center h-svh">
        <h1 className="text-6xl font-serif font-light">Koniec.</h1>
      </section>
    </>
  );
};

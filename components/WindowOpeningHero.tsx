"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import heroImage from "@/public/sky_full.webp";
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
  const introWord1Ref = useRef<HTMLDivElement>(null);
  const introWord2Ref = useRef<HTMLDivElement>(null);
  const introWord3Ref = useRef<HTMLDivElement>(null);

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
      !heroCopyRef.current ||
      !introWord1Ref.current ||
      !introWord2Ref.current ||
      !introWord3Ref.current
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
    const introWord1 = introWord1Ref.current;
    const introWord2 = introWord2Ref.current;
    const introWord3 = introWord3Ref.current;

    const skyMoveDistance = skyContainer.offsetHeight - window.innerHeight;

    gsap.set(heroCopy, { yPercent: 100 });

    gsap.set([introWord1, introWord2, introWord3], {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
    });

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

        if (progress <= 0.2) {
          const introProgress = progress / 0.2;

          if (introProgress <= 0.33) {
            const word1Progress = introProgress / 0.33;
            gsap.set(introWord1, {
              opacity:
                word1Progress < 0.7
                  ? word1Progress / 0.7
                  : 1 - (word1Progress - 0.7) / 0.3,
              y: 30 - word1Progress * 30,
              filter: `blur(${10 - word1Progress * 10}px)`,
            });
          } else {
            gsap.set(introWord1, { opacity: 0 });
          }

          if (introProgress > 0.23 && introProgress <= 0.66) {
            const word2Progress = (introProgress - 0.23) / 0.43;
            gsap.set(introWord2, {
              opacity:
                word2Progress < 0.7
                  ? word2Progress / 0.7
                  : 1 - (word2Progress - 0.7) / 0.3,
              y: 30 - word2Progress * 30,
              filter: `blur(${10 - word2Progress * 10}px)`,
            });
          } else {
            gsap.set(introWord2, { opacity: 0 });
          }

          if (introProgress > 0.56) {
            const word3Progress = (introProgress - 0.56) / 0.44;
            gsap.set(introWord3, {
              opacity:
                word3Progress < 0.7
                  ? word3Progress / 0.7
                  : 1 - (word3Progress - 0.7) / 0.3,
              y: 30 - word3Progress * 30,
              filter: `blur(${10 - word3Progress * 10}px)`,
            });
          } else {
            gsap.set(introWord3, { opacity: 0 });
          }
        } else {
          gsap.set([introWord1, introWord2, introWord3], { opacity: 0 });
        }

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

        if (progress > 0.1) {
          cloudYPercent = -(progress - 0.1) * 150;
          cloudOpacity = Math.max(0, 1 - (progress - 0.1) * 2);
        }

        gsap.set(clouds, {
          yPercent: cloudYPercent,
          opacity: cloudOpacity,
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
          ref={introWord1Ref}
          className="absolute top-0 left-0 w-full h-screen flex items-center justify-center z-10 pointer-events-none"
        >
          <h2
            className="text-5xl md:text-7xl font-serif font-light text-white drop-shadow-2xl"
            style={{ marginLeft: "-5%" }}
          >
            Miłość
          </h2>
        </div>

        <div
          ref={introWord2Ref}
          className="absolute top-0 left-0 w-full h-screen flex items-center justify-center z-10 pointer-events-none"
        >
          <h2
            className="text-5xl md:text-7xl font-serif font-light text-white drop-shadow-2xl"
            style={{ marginRight: "-8%" }}
          >
            Przyszłość
          </h2>
        </div>

        <div
          ref={introWord3Ref}
          className="absolute top-0 left-0 w-full h-screen flex items-center justify-center z-10 pointer-events-none"
        >
          <h2
            className="text-5xl md:text-7xl font-serif font-light text-white drop-shadow-2xl"
            style={{ marginLeft: "6%" }}
          >
            Nadzieja
          </h2>
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
          className="absolute top-0 left-0 w-full will-change-transform h-screen flex md:flex-row flex-col lg:gap-5 items-center md:justify-center justify-between p-6 md:p-12 lg:p-24 transform-3d z-30"
        >
          <div className="md:flex-1 flex flex-col md:h-full justify-between">
            <h1 className="text-5xl lg:text-6xl font-serif font-light">
              Życie to
              <br /> najpiękniejszy dar
            </h1>
            <p className="text-2xl font-serif font-light max-w-xl md:block hidden">
              Każdy dzień jest zaproszeniem, by ten dar rozwijać, chronić i
              dzielić się nim z innymi. Choć bywa trudne i pełne prób, niesie w
              sobie sens i nadzieję.
            </p>
          </div>

          <div className="md:flex-1 flex flex-col md:h-full justify-between items-end text-right">
            <p className="text-2xl font-serif font-light md:block hidden">
              Jest bezcenne,
              <br /> prosto od Boga
            </p>
            <div className="flex flex-col gap-y-5 md:gap-y-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light">
                To co piękne <br /> jest w nas
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

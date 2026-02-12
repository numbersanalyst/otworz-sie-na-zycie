"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

import heroImage from "@/public/sky_full.webp";
import windowFrameImage from "@/public/window_frame.webp";
import windowLeftImage from "@/public/window_left.webp";
import windowRightImage from "@/public/window_right.webp";
import cloudsImage from "@/public/clouds.webp";
import jp2 from "@/public/jp2.png";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const WindowOpeningHero = () => {
  const heroRef = useRef<HTMLElement>(null);

  // Tło i okna
  const skyContainerRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const windowContainerRef = useRef<HTMLDivElement>(null);
  const windowLeftRef = useRef<HTMLDivElement>(null);
  const windowRightRef = useRef<HTMLDivElement>(null);
  const heroHeaderRef = useRef<HTMLDivElement>(null);

  // Treść i Intro
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const heroCopyInnerRef = useRef<HTMLDivElement>(null);
  const introWord1Ref = useRef<HTMLDivElement>(null);
  const introWord2Ref = useRef<HTMLDivElement>(null);
  const introWord3Ref = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);

  const quoteWordsRef = useRef<HTMLSpanElement[]>([]);

  const QUOTE_TEXT =
    "Działać na rzecz życia znaczy przyczyniać się do odnowy społeczeństwa przez budowanie wspólnego dobra. Nie można bowiem budować wspólnego dobra, jeśli się nie uznaje i nie chroni prawa do życia, na którym się opierają i z którego wynikają wszystkie inne niezbywalne prawa człowieka. Nie może też mieć solidnych podstaw społeczeństwo, które — choć opowiada się za wartościami takimi jak godność osoby, sprawiedliwość i pokój — zaprzecza radykalnie samemu sobie, przyjmując i tolerując najrozmaitsze formy poniżania i naruszania życia ludzkiego, zwłaszcza życia ludzi słabych i zepchniętych na margines";

  const SUB_QUOTES = [
    {
      text: "Naród, który zabija własne dzieci, staje się narodem bez przyszłości",
      source: "Jan Paweł II, Kalisz 4 czerwca 1997 r.",
    },
    {
      text: "Życie ma w przypadku każdego tę samą godność i tę samą wartość. Szacunek dla życia drugiego jest taki sam jak ten, który jest się winnym wobec własnej egzystencj",
      source: "Por. tamże, V, 1: AAS 112 (2020)",
    },
    {
      text: "Godność każdej istoty ludzkiej ma charakter istotowy i obowiązuje od chwili poczęcia do naturalnej śmierci.",
      source: "Franciszek, 21 stycznia 2022 r.",
    },
  ];

  const setQuoteWordRef = useCallback(
    (el: HTMLSpanElement | null, index: number) => {
      if (el) quoteWordsRef.current[index] = el;
    },
    [],
  );

  const [windowWidth, setWindowWidth] = useState(0);

  useLayoutEffect(() => {
    setWindowWidth(window.innerWidth);

    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useLenis(() => ScrollTrigger.update());

  useLayoutEffect(() => {
    if (
      windowWidth === 0 ||
      !heroRef.current ||
      !skyContainerRef.current ||
      !cloudsRef.current ||
      !windowContainerRef.current ||
      !windowLeftRef.current ||
      !windowRightRef.current ||
      !heroHeaderRef.current ||
      !heroCopyRef.current ||
      !heroCopyInnerRef.current ||
      !introWord1Ref.current ||
      !introWord2Ref.current ||
      !introWord3Ref.current ||
      !introTextRef.current
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
    const heroCopyInner = heroCopyInnerRef.current;

    const introWord1 = introWord1Ref.current;
    const introWord2 = introWord2Ref.current;
    const introWord3 = introWord3Ref.current;
    const introText = introTextRef.current;
    const quoteWords = quoteWordsRef.current;

    const isMobile = windowWidth < 768;

    const pinDistance = isMobile
      ? window.innerHeight * 8.5
      : window.innerHeight * 2.5;

    const quoteStart = isMobile ? 0.45 : 0.5;
    const quoteRange = isMobile ? 0.55 : 0.45;

    const skyMoveDistance = skyContainer.offsetHeight - window.innerHeight;

    // Reset ustawień początkowych
    gsap.set(heroCopy, {
      opacity: isMobile ? 1 : 0,
      visibility: isMobile ? "visible" : "hidden",
      y: isMobile ? window.innerHeight : 0,
    });

    gsap.set([introWord1, introWord2, introWord3], {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
    });

    gsap.set(introText, {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
    });

    quoteWords.forEach((word) => {
      gsap.set(word, {
        color: isMobile ? "rgba(30, 41, 59, 0.95)" : "#ffffff",
        opacity: 1,
      });
    });

    const cloudMarqueeTween = gsap.to(clouds, {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    });

    const contentHeight = heroCopyInner.offsetHeight;
    const endPositionMobile = -contentHeight + window.innerHeight - 100;

    const scrollTrigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: `+=${pinDistance}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self: any) => {
        const progress = self.progress;
        const isMobileUpdate = window.innerWidth < 768;

        if (progress <= 0.2) {
          const introProgress = progress / 0.2;
          // Word 1
          const word1Progress = Math.min(1, Math.max(0, introProgress / 0.33));
          const w1Opacity =
            word1Progress < 0.7
              ? word1Progress / 0.7
              : 1 - (word1Progress - 0.7) / 0.3;
          gsap.set(introWord1, {
            opacity: w1Opacity,
            y: 30 - word1Progress * 30,
            filter: isMobileUpdate
              ? "none"
              : `blur(${10 - word1Progress * 10}px)`,
          });
          // Word 2
          if (introProgress > 0.23) {
            const word2Progress = Math.min(1, (introProgress - 0.23) / 0.43);
            const w2Opacity =
              word2Progress < 0.7
                ? word2Progress / 0.7
                : 1 - (word2Progress - 0.7) / 0.3;
            gsap.set(introWord2, {
              opacity: w2Opacity,
              y: 30 - word2Progress * 30,
              filter: isMobileUpdate
                ? "none"
                : `blur(${10 - word2Progress * 10}px)`,
            });
          } else {
            gsap.set(introWord2, { opacity: 0 });
          }
          // Word 3
          if (introProgress > 0.56) {
            const word3Progress = (introProgress - 0.56) / 0.44;
            const w3Opacity =
              word3Progress < 0.7
                ? word3Progress / 0.7
                : 1 - (word3Progress - 0.7) / 0.3;
            gsap.set(introWord3, {
              opacity: w3Opacity,
              y: 30 - word3Progress * 30,
              filter: isMobileUpdate
                ? "none"
                : `blur(${10 - word3Progress * 10}px)`,
            });
          } else {
            gsap.set(introWord3, { opacity: 0 });
          }
        } else {
          gsap.set([introWord1, introWord2, introWord3], { opacity: 0 });
        }

        // --- 2. INTRO TEXT ---
        if (progress > 0.2 && progress <= 0.45) {
          const introTextProgress = (progress - 0.2) / 0.25;
          const introTextOpacity =
            introTextProgress < 0.7
              ? introTextProgress / 0.7
              : 1 - (introTextProgress - 0.7) / 0.3;
          gsap.set(introText, {
            opacity: introTextOpacity,
            y: 30 - introTextProgress * 30,
            filter: isMobileUpdate
              ? "none"
              : `blur(${Math.max(0, 10 - introTextProgress * 15)}px)`,
          });
        } else {
          gsap.set(introText, { opacity: 0 });
        }

        // --- 3. WINDOW OPENING ---
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

        // --- 4. HERO COPY ---
        if (progress > quoteStart) {
          if (isMobileUpdate) {
            // Mobile logic
            const scrollRange = 1.0 - quoteStart;
            const scrollProgress = (progress - quoteStart) / scrollRange;
            const currentY =
              window.innerHeight +
              scrollProgress * (endPositionMobile - window.innerHeight);

            gsap.set(heroCopy, {
              visibility: "visible",
              opacity: 1,
              y: currentY,
            });
            quoteWords.forEach((word) => {
              gsap.set(word, { color: "rgba(30, 41, 59, 0.95)", opacity: 1 });
            });
          } else {
            // Desktop logic
            const qProgress = Math.min(
              1,
              Math.max(0, (progress - quoteStart) / quoteRange),
            );
            const translateY = (0.5 - qProgress) * window.innerHeight * 1.2;

            gsap.set(heroCopy, {
              y: translateY,
              opacity: qProgress < 0.1 ? qProgress / 0.1 : 1,
              visibility: "visible",
            });

            quoteWords.forEach((word, index) => {
              const wordStart = index / quoteWords.length;
              const wordEnd = (index + 1) / quoteWords.length;
              const slate800 = { r: 30, g: 41, b: 59 };
              const white = { r: 255, g: 255, b: 255 };

              if (qProgress >= wordEnd) {
                gsap.set(word, { color: "rgba(30, 41, 59, 0.9)", opacity: 1 });
              } else if (qProgress >= wordStart) {
                const wordProgress =
                  (qProgress - wordStart) / (wordEnd - wordStart);
                const r = Math.round(
                  white.r + (slate800.r - white.r) * wordProgress,
                );
                const g = Math.round(
                  white.g + (slate800.g - white.g) * wordProgress,
                );
                const b = Math.round(
                  white.b + (slate800.b - white.b) * wordProgress,
                );
                const a = 1 - (1 - 0.9) * wordProgress;
                gsap.set(word, {
                  color: `rgba(${r}, ${g}, ${b}, ${a})`,
                  opacity: 1,
                });
              } else {
                gsap.set(word, { color: "#ffffff", opacity: 1 });
              }
            });
          }
        } else {
          gsap.set(heroCopy, {
            visibility: isMobileUpdate ? "visible" : "hidden",
            y: isMobileUpdate ? window.innerHeight : 0,
            opacity: isMobileUpdate ? 1 : 0,
          });
        }
      },
    });

    return () => {
      scrollTrigger.kill();
      cloudMarqueeTween.kill();
    };
  }, [windowWidth]);

  return (
    <>
      <section
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden perspective-[1000px] bg-black"
      >
        <div
          ref={skyContainerRef}
          className="absolute top-0 left-0 w-full will-change-transform h-[500vh] md:h-[350vh]"
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

        {/* INTRO WORDS */}
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
          ref={introTextRef}
          className="absolute top-0 left-0 w-full h-screen flex items-center justify-center z-25 pointer-events-none"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl text-center font-serif font-light text-white drop-shadow-2xl px-4">
            Zobacz <br /> Życie w świetle Kościoła
          </h2>
        </div>

        <div
          ref={heroCopyRef}
          className="absolute top-0 left-0 w-full flex flex-col z-20 min-h-0 h-screen items-center justify-start md:justify-center p-0 md:p-12"
        >
          <div
            ref={heroCopyInnerRef}
            className="w-full flex flex-col items-center pt-8 md:pt-0 pb-32 md:pb-0 px-4 md:px-0"
          >
            <div className="relative flex flex-col md:flex-row md:items-start items-center gap-3 sm:gap-4 md:gap-16 mx-auto max-w-6xl">
              {/* Tło tylko dla mobile */}
              <div className="md:hidden absolute inset-0 -m-4 bg-white/40 blur-xl rounded-full scale-110 -z-10" />
              {/* Tło dla desktopu */}
              <div className="hidden md:block absolute top-0 left-0 w-full h-full backdrop-blur-sm radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%) rounded-4xl" />

              <Image
                src={jp2}
                alt="Jan Paweł II"
                width={280}
                height={460}
                className="object-contain opacity-90 md:opacity-75 w-[140px] sm:w-[180px] md:w-[240px] lg:w-[280px] shrink-0"
              />

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light text-center md:text-left leading-relaxed drop-shadow-2xl p-2 sm:p-3 md:p-0 text-slate-900 md:text-slate-800/95 flex-1 pointer-events-none z-10">
                &#x201E;
                {QUOTE_TEXT.split(" ").map((word, index) => (
                  <span
                    key={index}
                    ref={(el) => setQuoteWordRef(el, index)}
                    className="inline-block mr-[0.2em] transition-none"
                  >
                    {word}
                  </span>
                ))}
                &#x201D;
                <br />
                <span className="font-light text-xs sm:text-base md:text-lg text-slate-900 md:text-slate-800/90 mt-2 sm:mt-6 inline-block">
                  — Jan Paweł II, &#x201E;Evangelium vitae&#x201D;
                </span>
              </h2>
            </div>

            <div className="relative w-full max-w-5xl mx-auto mt-6 sm:mt-8 md:mt-16 lg:mt-20 px-2 sm:px-4 md:px-0 shrink-0 z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-3 md:gap-6 items-start">
                {SUB_QUOTES.map(({ text, source }, i) => (
                  <blockquote
                    key={i}
                    className="relative rounded-lg sm:rounded-xl bg-white/60 backdrop-blur-md border border-white/40 p-4 sm:p-4 md:p-6 text-left shadow-sm"
                  >
                    <p className="font-serif font-light text-slate-900 text-sm sm:text-lg md:text-2xl leading-relaxed">
                      &#x201E;{text}&#x201D;
                    </p>
                    <footer className="mt-2 sm:mt-3 text-slate-800 text-xs md:text-sm font-light">
                      — {source}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CLOUDS */}
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
            alt="okno"
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
            alt="lewe skrzydło"
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
            alt="prawe skrzydło"
            priority
          />
        </div>
        <div
          ref={heroHeaderRef}
          className="absolute top-0 left-0 w-full will-change-transform h-svh flex md:flex-row flex-col lg:gap-5 items-center md:justify-center justify-between p-6 md:p-12 lg:p-24 transform-3d z-30"
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
              Wartość, <br /> która nie podlega negocjacjom
            </p>
            <div className="flex flex-col gap-y-5 md:gap-y-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light">
                To co piękne <br /> jest w nas
              </h1>
              <hr />
              <div className="flex justify-between items-center gap-x-5">
                <p className="font-serif font-light text-xl flex justify-end items-center gap-x-2">
                  <ArrowDown
                    className="animate-bounce"
                    width={20}
                    height={20}
                  />
                  Przewiń
                </p>
                <p className="font-serif font-light text-xl">Poznaj prawdę</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="p-8 flex items-center justify-center h-svh">
        <h1 className="text-6xl font-serif font-light">
          Czy to prawda? Dokąd zmierza świat?
        </h1>
      </section>
    </>
  );
};

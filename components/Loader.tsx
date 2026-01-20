"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(CustomEase);
gsap.registerPlugin(SplitText);

export const LoaderHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLHeadingElement>(null);

  const images: string[] = [
    "/flowers/1.jpg",
    "/flowers/2.jpg",
    "/flowers/3.jpg",
    "/flowers/4.jpg",
    "/flowers/5.jpg",
  ];

  useGSAP(
    () => {
      CustomEase.create("hop", "0.85, 0, 0.15, 1");

      const tl = gsap.timeline();

      const splitText = new SplitText(".hero-header h1", {
        type: "words, chars",
        charsClass: "char",
        wordsClass: "word",
      });

      tl.add("start");

      const counterObj = { value: 0 };
      tl.to(
        counterObj,
        {
          value: 100,
          duration: 5,
          ease: "power2.out",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent =
                Math.floor(counterObj.value).toString() + "%";
            }
          },
        },
        "start",
      );

      tl.to(
        ".overlay-text",
        {
          y: 0,
          duration: 0.75,
          ease: "hop",
        },
        "start",
      );

      tl.to(
        ".overlay-text",
        {
          y: "-2rem",
          duration: 0.75,
          ease: "hop",
          delay: 0.75,
        },
        "start+=0.5",
      );

      tl.to(
        ".overlay-text",
        {
          y: "-4rem",
          duration: 0.75,
          ease: "hop",
          delay: 0.75,
        },
        "start+=2",
      );

      tl.to(
        ".overlay-text",
        {
          y: "-6rem",
          duration: 0.75,
          ease: "hop",
          delay: 1,
        },
        "start+=3.5",
      );

      tl.to(
        ".hero-images img",
        {
          y: 0,
          opacity: 1,
          duration: 2,
          stagger: 0.1,
          ease: "power3.out",
        },
        "start",
      );

      tl.to(
        ".hero-images",
        {
          gap: "0.75vw",
          duration: 1,
          ease: "hop",
        },
        "start+=2.5",
      );

      tl.to(
        ".hero-images img",
        {
          y: -5,
          duration: 0.5,
          stagger: 0.2,
          ease: "sine",
        },
        "start+=1",
      );

      tl.to(
        ".hero-images img",
        {
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "bounce.out",
        },
        "start+=1.5",
      );

      tl.to(
        ".hero-images img",
        {
          scale: 1,
          duration: 1,
          ease: "hop",
        },
        "start+=2.5",
      );

      tl.to(
        ".hero-images img:not(.hero-image)",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          stagger: 0.1,
          ease: "hop",
        },
        "start+=3.5",
      );

      tl.to(
        ".hero-images .hero-image",
        {
          scale: 2,
          duration: 1,
          ease: "hop",
        },
        "start+=4.5",
      );

      tl.to(
        ".hero-overlay",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          ease: "hop",
        },
        "start+=4.5",
      );

      tl.to(
        ".hero-header h1 .char",
        {
          y: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power3.out",
        },
        "start+=4.5",
      );
    },
    { scope: containerRef },
  );

  return (
    <>
      <nav className="nav">
        <div className="nav-logo">
          <a href="#">ZaŻyciem</a>
        </div>
        <div className="nav-items">
          <a href="#">O życiu</a>
          <a href="#">Historie</a>
          <a href="#">Pieniądze</a>
          <a href="#">Fakty</a>
        </div>
      </nav>

      <section ref={containerRef} className="hero">
        <div className="hero-overlay">
          <div className="counter">
            <h1 ref={counterRef}>0</h1>
          </div>
        </div>

        <div className="overlay-text-container">
          <div className="overlay-text">
            <p>Miłość</p>
            <p>Troska</p>
            <p>Nadzieja</p>
          </div>
        </div>

        <div className="hero-images">
          {images.map((url, i) => (
            <img
              className={url == "/flowers/3.jpg" ? "hero-image" : ""}
              key={i}
              src={url}
              alt="hero image"
            />
          ))}
        </div>

        <div className="hero-header">
          <h1>Dar Życia</h1>
        </div>
      </section>
    </>
  );
};

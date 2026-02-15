import { Loader } from "@/components/Loader";
import { Hero } from "@/components/Hero";
import { Brochures } from "@/components/Brochures";
import { Support } from "@/components/Support";
import { Contrast } from "@/components/Contrast";
import { Consequences } from "@/components/Consequences";
import { Hope } from "@/components/Hope";
import { HopeQuestion } from "@/components/HopeQuestion";
import { Outro } from "@/components/Outro";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <Hero />
      <Contrast />
      <Consequences />
      <HopeQuestion />
      <Hope />
      <Support />
      <Brochures />
      <Outro />
      <Footer />
    </>
  );
}

import { Loader } from "@/components/Loader";
import { WindowOpeningHero } from "@/components/WindowOpeningHero";
import { ReadMore } from "@/components/ReadMore";
import { SupportSection } from "@/components/SupportSection";
import { ContrastSection } from "@/components/ContrastSection";
import { ConsequencesSection } from "@/components/ConsequencesSection";
import { HopeSection } from "@/components/HopeSection";
import { HopeAskSection } from "@/components/HopeAskSection";
import { Ending } from "@/components/Ending";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* <Loader /> */}
      <WindowOpeningHero />
      <ContrastSection />
      <ConsequencesSection />
      <HopeAskSection />
      <HopeSection />
      <SupportSection />
      <ReadMore />
      <Ending />
      <Footer />
    </>
  );
}

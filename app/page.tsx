import { Loader } from "@/components/Loader";
import { WindowOpeningHero } from "@/components/WindowOpeningHero";
import { ReadMore } from "@/components/ReadMore";
import { SupportSection } from "@/components/SupportSection";
import { ContrastSection } from "@/components/ContrastSection";
import { ConsequencesSection } from "@/components/ConsequencesSection";

export default function Home() {
  return (
    <>
      <Loader />
      <WindowOpeningHero />
      <ContrastSection />
      <ConsequencesSection />
      <SupportSection />
      <ReadMore />
    </>
  );
}

import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import ReactLenis from "lenis/react";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const canonicalURL = "https://otworzsienazycie.pl";

export const metadata: Metadata = {
  metadataBase: new URL(canonicalURL),
  title: {
    default: "Otwórz się na życie | Godność i Wartość Każdego Istnienia",
    template: "%s | Otwórz się na życie",
  },
  description:
    "Odkryj prawdę o wartości życia od poczęcia. Poznaj fakty o bioetyce, adopcji i realnym wsparciu dla kobiet. Każde życie to historia warta opowiedzenia.",
  keywords: [
    "ochrona życia",
    "bioetyka",
    "godność człowieka",
    "pomoc kobietom",
    "adopcja",
    "okno życia",
    "wartość życia",
    "pro-life Polska",
  ],
  authors: [{ name: "Otwórz się na życie" }],
  creator: "Otwórz się na życie",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: canonicalURL,
    siteName: "Otwórz się na życie",
    title: "Otwórz się na życie | Godność i Wartość Każdego Istnienia",
    description:
      "Portal poświęcony ochronie życia, bioetyce i wsparciu dla rodzin. Dowiedz się, jak realnie pomagać.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Otwórz się na życie - grafika promująca wartość życia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Otwórz się na życie | Godność i Wartość Każdego Istnienia",
    description:
      "Poznaj wartość każdego istnienia. Edukacja i wsparcie w duchu poszanowania życia.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <meta name="apple-mobile-web-app-title" content="Życie" />
      <body
        className={`${instrumentSans.variable} ${instrumentSerif.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              nonprofitStatus: "NonprofitOrganization",
              "@id": `${canonicalURL}#organization`,
              name: "Otwórz się na życie",
              url: canonicalURL,
              description:
                "Portal edukacyjny o ochronie życia ludzkiego, bioetyce, adopcji i wsparciu dla rodzin w ciąży.",
              logo: {
                "@type": "ImageObject",
                url: `${canonicalURL}/web-app-manifest-512x512.png`,
                width: 512,
                height: 512,
              },
              image: `${canonicalURL}/og-image.png`,
              publisher: {
                "@id": `${canonicalURL}#organization`,
              },
              founder: {
                "@type": "Person",
                name: "Inicjatywa pro-life",
              },
              areaServed: "Polska",
              keywords: ["ochrona życia", "bioetyka", "adopcja"],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Zasoby edukacyjne",
                numberOfItems: 4,
                itemListElement: [
                  {
                    "@type": "Offer",
                    position: 1,
                    itemOffered: {
                      "@type": "Service",
                      name: "Edukacja bioetyczna",
                      description: "Fakty o wartości życia od poczęcia.",
                    },
                  },
                  {
                    "@type": "Offer",
                    position: 2,
                    itemOffered: {
                      "@type": "Service",
                      name: "Informacje o adopcji",
                      description: "Okna życia i wsparcie adopcyjne.",
                    },
                  },
                  {
                    "@type": "Offer",
                    position: 3,
                    itemOffered: {
                      "@type": "Service",
                      name: "Pomoc kobietom w ciąży",
                      description: "Realne wsparcie i alternatywy.",
                    },
                  },
                  {
                    "@type": "Offer",
                    position: 4,
                    itemOffered: {
                      "@type": "Service",
                      name: "Artykuły pro-life",
                      description: "Tematy godności człowieka.",
                    },
                  },
                ],
              },
            }),
          }}
        />
        <ReactLenis root />
        {children}
      </body>
    </html>
  );
}

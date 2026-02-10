import { ExternalLink } from "lucide-react";

interface Brochure {
  title: string;
  subtitle: string;
  url: string;
}

const brochures: Brochure[] = [
  {
    title: "Od kiedy?",
    subtitle: "Od poczęcia",
    url: "https://pro-life.pl/wp-content/uploads/2023/08/biblioteczka-pro-life-01-od-kiedy-od-poczecia-wydanie-2023.pdf",
  },
  {
    title: "ABORCJA",
    subtitle: "bolesna nieobecność",
    url: "https://pro-life.pl/wp-content/uploads/2023/09/biblioteczka-pro-life-03-aborcja-bolesna-nieobecnosc-wydanie-2023.pdf",
  },
  {
    title: "IN VITRO",
    subtitle: "Za jaką cenę?",
    url: "https://pro-life.pl/wp-content/uploads/2023/08/biblioteczka-pro-life-04-in-vitro-za-jaka-cene-wydanie-2023.pdf",
  },
  {
    title: "ADOPCJA",
    subtitle: "Narodziny z serca",
    url: "https://pro-life.pl/wp-content/uploads/2022/09/biblioteczka-pro-life-05-adopcja-narodziny-z-serca.pdf",
  },
  {
    title: "Jesteś",
    subtitle: "Doświadczenie poronienia",
    url: "https://pro-life.pl/wp-content/uploads/2023/08/biblioteczka-pro-life-07-jestes-doswiadczenie-poronienia.pdf",
  },
  {
    title: "Hospicjum perinatalne",
    subtitle: "Dla nienarodzonego pacjenta",
    url: "https://pro-life.pl/wp-content/uploads/2025/06/biblioteczka-pro-life-09-hospicja-perinatalne-06-06-2025-e-wydanie.pdf",
  },
  {
    title: 'Tabletka "dzień po"',
    subtitle: "co warto wiedzieć",
    url: "https://pro-life.pl/wp-content/uploads/2025/01/ulotka-pro-life-tabletka-dzien-po-e-wydanie.pdf",
  },
];

export const ReadMore = () => {
  return (
    <section className="w-full py-16 px-4 bg-linear-to-b from-sky-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-black mb-12">
          Zobacz więcej
        </h2>

        {/* Grid of brochures */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brochures.map((brochure, index) => (
            <a
              key={index}
              href={brochure.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-between p-6 border border-gray-900 bg-white hover:bg-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="flex-1 pr-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-gray-950 transition-colors">
                  {brochure.title}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-800">
                  {brochure.subtitle}
                </p>
              </div>

              {/* Icon */}
              <div className="shrink-0">
                <ExternalLink className="w-6 h-6 text-gray-700 group-hover:text-gray-950 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

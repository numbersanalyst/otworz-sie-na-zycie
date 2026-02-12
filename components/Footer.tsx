import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-white text-black py-16 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center flex flex-col items-center gap-4">
          <p className="text-xl mt-8 italic">
            Praca konkursowa Stowarzyszenia Obrońców Życia Człowieka
          </p>
          <Image src="/logo-psozc.svg" alt="Logo" width={400} height={400} />
        </div>
      </div>
    </footer>
  );
};

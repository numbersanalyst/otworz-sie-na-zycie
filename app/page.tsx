import { LoaderHero } from "@/components/Loader";

export default function Home() {
  return (
    <>
      <LoaderHero />

      <section className="h-screen flex flex-col justify-center items-center text-center px-10">
        <h1 className="text-6xl font-serif font-light mb-6">
          Początek wszystkiego.
        </h1>
        <p className="max-w-xl text-gray-500 uppercase tracking-widest text-sm">
          Poznaj historię godności, która zaczyna się zanim świat ją usłyszy.
        </p>
      </section>
    </>
  );
}

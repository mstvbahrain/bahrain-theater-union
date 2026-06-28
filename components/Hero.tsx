import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero-stage min-h-screen px-5 pt-32 text-white">
      <div className="mx-auto flex max-w-7xl items-center py-24 md:min-h-[720px]">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm uppercase tracking-[0.38em] text-gold">Kingdom of Bahrain</p>
          <h1 className="font-heading text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            UNITING TALENT.<br />INSPIRING CULTURE.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/75">Advancing the art of theatre in Bahrain and beyond.</p>
          <Link href="/about" className="mt-9 inline-flex rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-white">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}

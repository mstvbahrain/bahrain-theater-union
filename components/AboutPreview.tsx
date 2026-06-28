import Link from 'next/link';

export default function AboutPreview() {
  return (
    <section className="grid min-h-[580px] lg:grid-cols-2">
      <div className="bg-oliveDark px-5 py-20 text-white lg:px-16">
        <div className="mx-auto max-w-xl lg:ml-auto">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">About</p>
          <h2 className="mt-4 font-heading text-4xl md:text-5xl">ABOUT BAHRAIN THEATER UNION</h2>
          <div className="gold-line" />
          <p className="mt-8 text-lg leading-9 text-white/75">
            Bahrain Theater Union is the official body that brings together theatre practitioners in the Kingdom of Bahrain under one umbrella. The Union works to develop the theatrical movement, support creative talents, and promote theatre as a vital cultural and social force.
          </p>
          <Link href="/about" className="mt-9 inline-flex rounded-full border border-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-gold transition hover:bg-gold hover:text-black">
            Learn More About Us
          </Link>
        </div>
      </div>
      <div className="about-image min-h-[420px]" />
    </section>
  );
}

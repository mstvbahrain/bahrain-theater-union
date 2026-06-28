import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <main className="bg-cream">
      <Navbar />
      <section className="px-5 pb-20 pt-36">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">About</p>
          <h1 className="mt-4 font-heading text-5xl text-black md:text-7xl">Bahrain Theater Union</h1>
          <div className="gold-line" />
          <p className="mt-8 text-lg leading-9 text-neutral-700">
            Bahrain Theater Union brings together theatre practitioners in the Kingdom of Bahrain under one professional umbrella. The Union supports creativity, develops theatrical practice, and strengthens the cultural role of theatre across society.
          </p>
          <p className="mt-5 text-lg leading-9 text-neutral-700">
            The website is designed to introduce the Union, display current members, connect visitors to its YouTube and Instagram channels, and provide clear contact information for artists, institutions, and the public.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}

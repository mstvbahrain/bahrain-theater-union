import { Instagram, Youtube } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

export default function FeaturedSocialVideo() {
  return (
    <section className="bg-cream px-5 py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-gold">Follow Us</p>
          <h2 className="mt-3 font-heading text-4xl text-black md:text-5xl">Stay Connected</h2>
          <div className="gold-line" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <a href={siteConfig.youtubeUrl} className="group rounded-3xl bg-gradient-to-br from-red-700 to-black p-7 text-white shadow-luxury transition hover:-translate-y-1">
              <Youtube className="mb-8" size={38} />
              <h3 className="font-heading text-2xl">YouTube</h3>
              <p className="mt-2 text-white/75">Watch our latest videos</p>
            </a>
            <a href={siteConfig.instagramUrl} className="group rounded-3xl bg-gradient-to-br from-pink-700 via-purple-800 to-amber-600 p-7 text-white shadow-luxury transition hover:-translate-y-1">
              <Instagram className="mb-8" size={38} />
              <h3 className="font-heading text-2xl">Instagram</h3>
              <p className="mt-2 text-white/75">See our latest updates</p>
            </a>
          </div>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-gold">Featured YouTube Video</p>
          <h2 className="mt-3 font-heading text-4xl text-black md:text-5xl">Latest Feature</h2>
          <div className="gold-line" />
          <div className="video-frame mt-10 aspect-video overflow-hidden rounded-[2rem] bg-black p-3 shadow-luxury">
            <iframe src={siteConfig.featuredVideoEmbed} title="Featured YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';
import { Instagram, Youtube } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

export default function Footer() {
  return (
    <footer className="bg-dark px-5 py-8 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 md:flex-row">
        <div className="flex items-center gap-3">
          <Image src={siteConfig.logo} alt="Bahrain Theater Union Logo" width={44} height={44} className="rounded-full" />
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">© 2024 Bahrain Theater Union. All Rights Reserved.</p>
        </div>
        <div className="flex gap-3">
          <a href={siteConfig.youtubeUrl} className="rounded-full border border-white/15 p-2 text-white/80 hover:text-gold"><Youtube size={18} /></a>
          <a href={siteConfig.instagramUrl} className="rounded-full border border-white/15 p-2 text-white/80 hover:text-gold"><Instagram size={18} /></a>
        </div>
      </div>
    </footer>
  );
}

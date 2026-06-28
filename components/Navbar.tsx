'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Instagram, Youtube } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '@/lib/siteConfig';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/members', label: 'Members' },
  { href: '/contact', label: 'Contact' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src={siteConfig.logo} alt="Bahrain Theater Union Logo" width={54} height={54} className="rounded-full" priority />
          <span className="hidden text-xs font-semibold tracking-[0.22em] text-white sm:block">BAHRAIN THEATER UNION</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm uppercase tracking-[0.18em] text-white/80 transition hover:text-gold">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href={siteConfig.youtubeUrl} className="rounded-full border border-white/15 p-2 text-white transition hover:border-gold hover:text-gold" aria-label="YouTube"><Youtube size={18} /></a>
          <a href={siteConfig.instagramUrl} className="rounded-full border border-white/15 p-2 text-white transition hover:border-gold hover:text-gold" aria-label="Instagram"><Instagram size={18} /></a>
        </div>
        <button onClick={() => setOpen(!open)} className="rounded-full border border-white/15 p-2 text-white md:hidden" aria-label="Open menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-black px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => <Link onClick={() => setOpen(false)} key={link.href} href={link.href} className="text-white/80">{link.label}</Link>)}
          </div>
        </div>
      )}
    </header>
  );
}

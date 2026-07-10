'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Instagram, Youtube } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '@/lib/siteConfig';

const links = [
  { href: '/', label: 'الرئيسية' },
  { href: '/plays', label: 'المسرحيات' },
  { href: '/news', label: 'الأخبار' },
  { href: '/books', label: 'الكتب' },
  { href: '/events', label: 'الفعاليات' },
  { href: '/about', label: 'عن الاتحاد' },
  { href: '/members', label: 'الأعضاء' },
  { href: '/contact', label: 'تواصل معنا' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src={siteConfig.logo} alt="شعار الاتحاد البحريني للمسرح" width={54} height={54} className="rounded-full" priority />
          <span className="hidden text-sm font-semibold text-white sm:block">{siteConfig.name}</span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-semibold text-white/80 transition hover:text-gold">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 xl:flex">
          <Link href="/admin" className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-black transition hover:bg-white">
            دخول الإدارة
          </Link>
          <a href={siteConfig.youtubeUrl} className="rounded-full border border-white/15 p-2 text-white transition hover:border-gold hover:text-gold" aria-label="YouTube"><Youtube size={18} /></a>
          <a href={siteConfig.instagramUrl} className="rounded-full border border-white/15 p-2 text-white transition hover:border-gold hover:text-gold" aria-label="Instagram"><Instagram size={18} /></a>
        </div>
        <button onClick={() => setOpen(!open)} className="rounded-full border border-white/15 p-2 text-white lg:hidden" aria-label="فتح القائمة">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-black px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => <Link onClick={() => setOpen(false)} key={link.href} href={link.href} className="text-white/80">{link.label}</Link>)}
            <Link onClick={() => setOpen(false)} href="/admin" className="mt-2 rounded-full bg-gold px-5 py-3 text-center font-semibold text-black">
              دخول الإدارة
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

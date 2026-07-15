'use client';

import { Drama, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PlayItem, storageKeys } from '@/lib/contentStorage';
import { fetchContent } from '@/lib/supabaseContent';

export default function PlaysContent() {
  const [plays, setPlays] = useState<PlayItem[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKeys.plays);
    fetchContent<PlayItem>('plays', saved ? JSON.parse(saved) : []).then(setPlays);
  }, []);

  return (
    <div className="mt-12">
      {plays.length === 0 ? (
        <div className="rounded-2xl border border-black/5 bg-white p-8 text-center shadow-md">
          <Drama className="mx-auto text-gold" size={38} />
          <p className="mt-4 text-neutral-700">لم تتم إضافة مسرحيات بعد.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {plays.map((play) => (
            <article key={play.id} className="overflow-hidden rounded-2xl bg-white shadow-md">
              <div className="aspect-video bg-neutral-200">
                {play.image ? <img src={play.image} alt={play.title} className="h-full w-full object-cover" /> : null}
              </div>
              <div className="p-6">
                <h2 className="font-heading text-3xl text-black">{play.title}</h2>
                <p className="mt-4 whitespace-pre-line leading-8 text-neutral-700">{play.body}</p>
                {play.link ? (
                  <a
                    href={play.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
                    dir="rtl"
                  >
                    فتح الرابط
                    <ExternalLink size={16} />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { Newspaper } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NewsItem, storageKeys } from '@/lib/contentStorage';
import { fetchContent } from '@/lib/supabaseContent';

export default function NewsContent() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKeys.news);
    fetchContent<NewsItem>('news', saved ? JSON.parse(saved) : []).then(setNews);
  }, []);

  return (
    <div className="mt-12">
      {news.length === 0 ? (
        <div className="rounded-2xl border border-black/5 bg-white p-8 text-center shadow-md">
          <Newspaper className="mx-auto text-gold" size={38} />
          <p className="mt-4 text-neutral-700">لم تتم إضافة أخبار بعد.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {news.map((item) => (
            <article key={item.id} className="grid overflow-hidden rounded-2xl bg-white shadow-md lg:grid-cols-[0.85fr_1.15fr]">
              <div className="min-h-64 bg-neutral-200">
                {item.image ? <img src={item.image} alt={item.title} className="h-full w-full object-cover" /> : null}
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-gold">{new Date(item.createdAt).toLocaleDateString('ar-BH')}</p>
                <h2 className="mt-2 font-heading text-3xl text-black">{item.title}</h2>
                <p className="mt-4 whitespace-pre-line leading-8 text-neutral-700">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

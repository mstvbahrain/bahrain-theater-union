'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, Newspaper } from 'lucide-react';
import { useEffect, useState } from 'react';
import { HomeUpdateItem, storageKeys } from '@/lib/contentStorage';

export default function HomeUpdatesSlider() {
  const [updates, setUpdates] = useState<HomeUpdateItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKeys.homeUpdates);
    setUpdates(saved ? JSON.parse(saved) : []);
  }, []);

  useEffect(() => {
    if (updates.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % updates.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [updates.length]);

  if (updates.length === 0) {
    return (
      <section className="bg-cream px-5 py-16">
        <div className="mx-auto max-w-7xl rounded-2xl bg-white p-8 text-center shadow-md">
          <Newspaper className="mx-auto text-gold" size={38} />
          <p className="mt-3 text-sm font-semibold text-gold">آخر التحديثات</p>
          <h2 className="mt-2 font-heading text-3xl text-black">لا توجد تحديثات حالياً</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-neutral-600">
            عند نشر تحديث من لوحة الإدارة سيظهر هنا في الصفحة الرئيسية.
          </p>
        </div>
      </section>
    );
  }

  const activeUpdate = updates[activeIndex];

  function goToPrevious() {
    setActiveIndex((index) => (index - 1 + updates.length) % updates.length);
  }

  function goToNext() {
    setActiveIndex((index) => (index + 1) % updates.length);
  }

  return (
    <section className="bg-cream px-5 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold text-gold">آخر التحديثات</p>
            <h2 className="mt-2 font-heading text-4xl text-black md:text-5xl">نشرة الاتحاد</h2>
            <div className="gold-line" />
          </div>
          <Link href="/admin" className="inline-flex w-fit rounded-full border border-gold px-5 py-3 text-sm font-semibold text-gold transition hover:bg-gold hover:text-black">
            إدارة التحديثات
          </Link>
        </div>

        <article className="grid overflow-hidden rounded-2xl bg-white shadow-luxury lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[320px] bg-neutral-200">
            {activeUpdate.image ? (
              <img src={activeUpdate.image} alt={activeUpdate.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full min-h-[320px] items-center justify-center bg-oliveDark text-gold">
                <Newspaper size={52} />
              </div>
            )}
          </div>
          <div className="flex min-h-[320px] flex-col justify-center p-7 md:p-10">
            <p className="text-sm font-semibold text-gold">{new Date(activeUpdate.createdAt).toLocaleDateString('ar-BH')}</p>
            <h3 className="mt-3 font-heading text-3xl leading-tight text-black md:text-5xl">{activeUpdate.title}</h3>
            <p className="mt-5 line-clamp-4 whitespace-pre-line leading-8 text-neutral-700">{activeUpdate.body}</p>
            {activeUpdate.link ? (
              <a href={activeUpdate.link} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-fit rounded-full bg-gold px-5 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white">
                قراءة المزيد
              </a>
            ) : null}

            <div className="mt-8 flex items-center justify-between gap-4">
              <div className="flex gap-2">
                {updates.map((update, index) => (
                  <button
                    key={update.id}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition ${index === activeIndex ? 'w-8 bg-gold' : 'w-2.5 bg-black/20'}`}
                    aria-label={`عرض التحديث ${index + 1}`}
                  />
                ))}
              </div>

              {updates.length > 1 ? (
                <div className="flex gap-2">
                  <button onClick={goToPrevious} className="rounded-full border border-black/10 p-3 text-black transition hover:border-gold hover:text-gold" aria-label="التحديث السابق">
                    <ChevronRight size={20} />
                  </button>
                  <button onClick={goToNext} className="rounded-full border border-black/10 p-3 text-black transition hover:border-gold hover:text-gold" aria-label="التحديث التالي">
                    <ChevronLeft size={20} />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

'use client';

import { CalendarDays } from 'lucide-react';
import { useEffect, useState } from 'react';
import { EventItem, storageKeys } from '@/lib/contentStorage';

export default function EventsContent() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKeys.events);
    setEvents(saved ? JSON.parse(saved) : []);
  }, []);

  return (
    <div className="mt-12">
      {events.length === 0 ? (
        <div className="rounded-2xl border border-black/5 bg-white p-8 text-center shadow-md">
          <CalendarDays className="mx-auto text-gold" size={38} />
          <p className="mt-4 text-neutral-700">لم تتم إضافة فعاليات بعد.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {events.map((event) => (
            <article key={event.id} className="grid overflow-hidden rounded-2xl bg-white shadow-md lg:grid-cols-[0.85fr_1.15fr]">
              <div className="min-h-64 bg-neutral-200">
                {event.image ? <img src={event.image} alt={event.title} className="h-full w-full object-cover" /> : null}
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-gold">{event.date || new Date(event.createdAt).toLocaleDateString('ar-BH')}</p>
                <h2 className="mt-2 font-heading text-3xl text-black">{event.title}</h2>
                {event.location ? <p className="mt-2 text-sm font-semibold text-neutral-500">{event.location}</p> : null}
                <p className="mt-4 whitespace-pre-line leading-8 text-neutral-700">{event.body}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}


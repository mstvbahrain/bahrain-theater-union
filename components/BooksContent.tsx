'use client';

import { BookOpen, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BookItem, storageKeys } from '@/lib/contentStorage';
import { fetchContent } from '@/lib/supabaseContent';

export default function BooksContent() {
  const [books, setBooks] = useState<BookItem[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKeys.books);
    fetchContent<BookItem>('books', saved ? JSON.parse(saved) : []).then(setBooks);
  }, []);

  return (
    <div className="mt-12">
      {books.length === 0 ? (
        <div className="rounded-2xl border border-black/5 bg-white p-8 text-center shadow-md">
          <BookOpen className="mx-auto text-gold" size={38} />
          <p className="mt-4 text-neutral-700">لم تتم إضافة كتب بعد.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <article key={book.id} className="overflow-hidden rounded-2xl bg-white shadow-md">
              <div className="aspect-[4/3] bg-neutral-200">
                {book.thumbnail ? <img src={book.thumbnail} alt={book.title} className="h-full w-full object-cover" /> : null}
              </div>
              <div className="p-5">
                <h2 className="font-heading text-2xl text-black">{book.title}</h2>
                <a
                  href={book.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
                  dir="rtl"
                >
                  تحميل الكتاب
                  <ExternalLink size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { BookOpen, LogIn, LogOut, Newspaper, Plus, Trash2, Upload } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { BookItem, NewsItem, storageKeys } from '@/lib/contentStorage';

function readImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [books, setBooks] = useState<BookItem[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [bookThumbnail, setBookThumbnail] = useState('');
  const [newsImage, setNewsImage] = useState('');

  useEffect(() => {
    setLoggedIn(window.sessionStorage.getItem(storageKeys.adminSession) === 'true');
    setBooks(JSON.parse(window.localStorage.getItem(storageKeys.books) || '[]'));
    setNews(JSON.parse(window.localStorage.getItem(storageKeys.news) || '[]'));
  }, []);

  function saveBooks(nextBooks: BookItem[]) {
    setBooks(nextBooks);
    window.localStorage.setItem(storageKeys.books, JSON.stringify(nextBooks));
  }

  function saveNews(nextNews: NewsItem[]) {
    setNews(nextNews);
    window.localStorage.setItem(storageKeys.news, JSON.stringify(nextNews));
  }

  function enterAdmin() {
    window.sessionStorage.setItem(storageKeys.adminSession, 'true');
    setLoggedIn(true);
  }

  function handleLogout() {
    window.sessionStorage.removeItem(storageKeys.adminSession);
    setLoggedIn(false);
  }

  function addBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextBook: BookItem = {
      id: crypto.randomUUID(),
      title: String(form.get('title') || ''),
      link: String(form.get('link') || ''),
      thumbnail: bookThumbnail,
      createdAt: new Date().toISOString()
    };

    saveBooks([nextBook, ...books]);
    event.currentTarget.reset();
    setBookThumbnail('');
  }

  function addNews(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextNews: NewsItem = {
      id: crypto.randomUUID(),
      title: String(form.get('title') || ''),
      body: String(form.get('body') || ''),
      image: newsImage,
      createdAt: new Date().toISOString()
    };

    saveNews([nextNews, ...news]);
    event.currentTarget.reset();
    setNewsImage('');
  }

  if (!loggedIn) {
    return (
      <section className="px-5 pb-20 pt-36">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-7 shadow-luxury">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-black">
              <LogIn size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gold">دخول الإدارة</p>
              <h1 className="font-heading text-3xl text-black">لوحة النشر</h1>
            </div>
          </div>

          <div className="mt-8">
            <button onClick={enterAdmin} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-black transition hover:bg-black hover:text-white">
              دخول لوحة النشر
              <LogIn size={18} />
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-5 pb-20 pt-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-gold">لوحة الإدارة</p>
            <h1 className="mt-2 font-heading text-5xl text-black">إضافة الكتب والأخبار</h1>
          </div>
          <button onClick={handleLogout} className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-5 py-3 font-semibold text-black transition hover:border-gold hover:text-gold">
            خروج
            <LogOut size={18} />
          </button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <form onSubmit={addBook} className="rounded-2xl bg-white p-6 shadow-md">
            <div className="flex items-center gap-3">
              <BookOpen className="text-gold" size={30} />
              <h2 className="font-heading text-3xl text-black">إضافة كتاب</h2>
            </div>
            <div className="mt-6 space-y-4">
              <input name="title" required placeholder="عنوان الكتاب" className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-gold" />
              <input name="link" required type="url" placeholder="رابط تحميل الكتاب" className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-gold" dir="ltr" />
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-black/20 px-4 py-5 text-neutral-700 transition hover:border-gold">
                <Upload size={18} />
                تحميل صورة الغلاف
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (file) setBookThumbnail(await readImage(file));
                  }}
                />
              </label>
              {bookThumbnail ? <img src={bookThumbnail} alt="معاينة غلاف الكتاب" className="h-40 w-full rounded-xl object-cover" /> : null}
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-black transition hover:bg-black hover:text-white">
                نشر الكتاب
                <Plus size={18} />
              </button>
            </div>
          </form>

          <form onSubmit={addNews} className="rounded-2xl bg-white p-6 shadow-md">
            <div className="flex items-center gap-3">
              <Newspaper className="text-gold" size={30} />
              <h2 className="font-heading text-3xl text-black">إضافة خبر</h2>
            </div>
            <div className="mt-6 space-y-4">
              <input name="title" required placeholder="عنوان الخبر" className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-gold" />
              <textarea name="body" required placeholder="نص الخبر" rows={7} className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-gold" />
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-black/20 px-4 py-5 text-neutral-700 transition hover:border-gold">
                <Upload size={18} />
                تحميل صورة الخبر
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (file) setNewsImage(await readImage(file));
                  }}
                />
              </label>
              {newsImage ? <img src={newsImage} alt="معاينة صورة الخبر" className="h-40 w-full rounded-xl object-cover" /> : null}
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-black transition hover:bg-black hover:text-white">
                نشر الخبر
                <Plus size={18} />
              </button>
            </div>
          </form>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="font-heading text-2xl text-black">الكتب المنشورة</h2>
            <div className="mt-5 space-y-3">
              {books.length === 0 ? <p className="text-neutral-600">لا توجد كتب منشورة حالياً.</p> : null}
              {books.map((book) => (
                <div key={book.id} className="flex items-center justify-between gap-3 rounded-xl bg-softCream p-3">
                  <span className="font-semibold text-black">{book.title}</span>
                  <button onClick={() => saveBooks(books.filter((item) => item.id !== book.id))} className="rounded-full p-2 text-red-700 transition hover:bg-white" aria-label="حذف الكتاب">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="font-heading text-2xl text-black">الأخبار المنشورة</h2>
            <div className="mt-5 space-y-3">
              {news.length === 0 ? <p className="text-neutral-600">لا توجد أخبار منشورة حالياً.</p> : null}
              {news.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl bg-softCream p-3">
                  <span className="font-semibold text-black">{item.title}</span>
                  <button onClick={() => saveNews(news.filter((record) => record.id !== item.id))} className="rounded-full p-2 text-red-700 transition hover:bg-white" aria-label="حذف الخبر">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

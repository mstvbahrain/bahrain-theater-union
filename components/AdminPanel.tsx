'use client';

import { BookOpen, CalendarDays, Drama, LogIn, LogOut, Newspaper, Plus, Trash2, Upload, UsersRound } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { BookItem, EventItem, HomeUpdateItem, MemberItem, NewsItem, PlayItem, memberGroupOptions, storageKeys } from '@/lib/contentStorage';
import { siteConfig } from '@/lib/siteConfig';
import { deleteContent, fetchContent, hasAdminSession, insertContent, isSupabaseConfigured, signInAdmin, signOutAdmin, updateContent, uploadContentImage } from '@/lib/supabaseContent';

function readImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const defaultMembers: MemberItem[] = siteConfig.members.map((member) => ({
  id: member.image,
  ...member
}));

function getLoginErrorMessage(message: string) {
  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes('email not confirmed')) {
    return 'الحساب غير مؤكد في Supabase. افتح Authentication ثم Users وتأكد من تأكيد البريد.';
  }

  if (normalizedMessage.includes('invalid login credentials')) {
    return 'البريد الإلكتروني أو كلمة المرور غير صحيحة في Supabase.';
  }

  if (normalizedMessage.includes('supabase is not configured')) {
    return 'لم يتم ربط Supabase بعد. تأكد من إضافة متغيرات البيئة ثم إعادة النشر.';
  }

  return `تعذر تسجيل الدخول: ${message}`;
}

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [books, setBooks] = useState<BookItem[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [homeUpdates, setHomeUpdates] = useState<HomeUpdateItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [plays, setPlays] = useState<PlayItem[]>([]);
  const [members, setMembers] = useState<MemberItem[]>(defaultMembers);
  const [bookThumbnail, setBookThumbnail] = useState('');
  const [newsImage, setNewsImage] = useState('');
  const [homeUpdateImage, setHomeUpdateImage] = useState('');
  const [eventImage, setEventImage] = useState('');
  const [playImage, setPlayImage] = useState('');

  useEffect(() => {
    async function loadAdminData() {
      const localBooks = JSON.parse(window.localStorage.getItem(storageKeys.books) || '[]');
      const localNews = JSON.parse(window.localStorage.getItem(storageKeys.news) || '[]');
      const localHomeUpdates = JSON.parse(window.localStorage.getItem(storageKeys.homeUpdates) || '[]');
      const localEvents = JSON.parse(window.localStorage.getItem(storageKeys.events) || '[]');
      const localPlays = JSON.parse(window.localStorage.getItem(storageKeys.plays) || '[]');
      const localMembers = JSON.parse(window.localStorage.getItem(storageKeys.members) || JSON.stringify(defaultMembers));

      setLoggedIn(isSupabaseConfigured ? await hasAdminSession() : window.sessionStorage.getItem(storageKeys.adminSession) === 'true');
      setBooks(await fetchContent<BookItem>('books', localBooks));
      setNews(await fetchContent<NewsItem>('news', localNews));
      setHomeUpdates(await fetchContent<HomeUpdateItem>('homeUpdates', localHomeUpdates));
      setEvents(await fetchContent<EventItem>('events', localEvents));
      setPlays(await fetchContent<PlayItem>('plays', localPlays));
      setMembers(await fetchContent<MemberItem>('members', localMembers));
    }

    loadAdminData();
  }, []);

  function saveBooks(nextBooks: BookItem[]) {
    setBooks(nextBooks);
    window.localStorage.setItem(storageKeys.books, JSON.stringify(nextBooks));
  }

  function saveNews(nextNews: NewsItem[]) {
    setNews(nextNews);
    window.localStorage.setItem(storageKeys.news, JSON.stringify(nextNews));
  }

  function saveHomeUpdates(nextHomeUpdates: HomeUpdateItem[]) {
    setHomeUpdates(nextHomeUpdates);
    window.localStorage.setItem(storageKeys.homeUpdates, JSON.stringify(nextHomeUpdates));
  }

  function saveEvents(nextEvents: EventItem[]) {
    setEvents(nextEvents);
    window.localStorage.setItem(storageKeys.events, JSON.stringify(nextEvents));
  }

  function savePlays(nextPlays: PlayItem[]) {
    setPlays(nextPlays);
    window.localStorage.setItem(storageKeys.plays, JSON.stringify(nextPlays));
  }

  function saveMembers(nextMembers: MemberItem[]) {
    setMembers(nextMembers);
    window.localStorage.setItem(storageKeys.members, JSON.stringify(nextMembers));
  }

  async function updateMember(memberId: string, changes: Partial<MemberItem>) {
    const nextMembers = members.map((member) => (member.id === memberId ? { ...member, ...changes } : member));
    saveMembers(nextMembers);
    if (isSupabaseConfigured) await updateContent<MemberItem>('members', memberId, changes);
  }

  async function updateMemberImage(memberId: string, file?: File) {
    if (!file) return;
    await updateMember(memberId, { image: await uploadContentImage('members', file) });
  }

  async function hashText(value: string) {
    const data = new TextEncoder().encode(value);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const username = String(form.get('username') || '');
    const password = String(form.get('password') || '');

    if (isSupabaseConfigured) {
      const { error } = await signInAdmin(username, password);
      if (error) {
        setLoginError(getLoginErrorMessage(error.message));
        return;
      }

      setLoggedIn(true);
      setLoginError('');
      return;
    }

    const usernameHash = await hashText(username);
    const passwordHash = await hashText(password);

    if (
      usernameHash === '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918' &&
      passwordHash === '939621fb21bce3c758534ef2b8ca1bd260ff62b348b8874276bf17881b682150'
    ) {
      window.sessionStorage.setItem(storageKeys.adminSession, 'true');
      setLoggedIn(true);
      setLoginError('');
      return;
    }

    setLoginError('بيانات الدخول غير صحيحة.');
  }

  async function handleLogout() {
    await signOutAdmin();
    window.sessionStorage.removeItem(storageKeys.adminSession);
    setLoggedIn(false);
  }

  async function addBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextBook: BookItem = {
      id: crypto.randomUUID(),
      title: String(form.get('title') || ''),
      link: String(form.get('link') || ''),
      thumbnail: bookThumbnail,
      createdAt: new Date().toISOString()
    };

    const savedBook = await insertContent<BookItem>('books', nextBook);
    saveBooks([savedBook, ...books]);
    event.currentTarget.reset();
    setBookThumbnail('');
  }

  async function addNews(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextNews: NewsItem = {
      id: crypto.randomUUID(),
      title: String(form.get('title') || ''),
      body: String(form.get('body') || ''),
      image: newsImage,
      createdAt: new Date().toISOString()
    };

    const savedNews = await insertContent<NewsItem>('news', nextNews);
    saveNews([savedNews, ...news]);
    event.currentTarget.reset();
    setNewsImage('');
  }

  async function addHomeUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextHomeUpdate: HomeUpdateItem = {
      id: crypto.randomUUID(),
      title: String(form.get('title') || ''),
      body: String(form.get('body') || ''),
      image: homeUpdateImage,
      link: String(form.get('link') || ''),
      createdAt: new Date().toISOString()
    };

    const savedHomeUpdate = await insertContent<HomeUpdateItem>('homeUpdates', nextHomeUpdate);
    saveHomeUpdates([savedHomeUpdate, ...homeUpdates]);
    event.currentTarget.reset();
    setHomeUpdateImage('');
  }

  async function addEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextEvent: EventItem = {
      id: crypto.randomUUID(),
      title: String(form.get('title') || ''),
      date: String(form.get('date') || ''),
      location: String(form.get('location') || ''),
      body: String(form.get('body') || ''),
      image: eventImage,
      createdAt: new Date().toISOString()
    };

    const savedEvent = await insertContent<EventItem>('events', nextEvent);
    saveEvents([savedEvent, ...events]);
    event.currentTarget.reset();
    setEventImage('');
  }

  async function addPlay(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextPlay: PlayItem = {
      id: crypto.randomUUID(),
      title: String(form.get('title') || ''),
      link: String(form.get('link') || ''),
      body: String(form.get('body') || ''),
      image: playImage,
      createdAt: new Date().toISOString()
    };

    const savedPlay = await insertContent<PlayItem>('plays', nextPlay);
    savePlays([savedPlay, ...plays]);
    event.currentTarget.reset();
    setPlayImage('');
  }

  async function removeRecord(table: 'books' | 'news' | 'homeUpdates' | 'events' | 'plays', id: string) {
    await deleteContent(table, id);

    if (table === 'books') saveBooks(books.filter((item) => item.id !== id));
    if (table === 'news') saveNews(news.filter((item) => item.id !== id));
    if (table === 'homeUpdates') saveHomeUpdates(homeUpdates.filter((item) => item.id !== id));
    if (table === 'events') saveEvents(events.filter((item) => item.id !== id));
    if (table === 'plays') savePlays(plays.filter((item) => item.id !== id));
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

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-neutral-700">{isSupabaseConfigured ? 'البريد الإلكتروني' : 'اسم المستخدم'}</span>
              <input name="username" required type={isSupabaseConfigured ? 'email' : 'text'} className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-gold" dir="ltr" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-neutral-700">كلمة المرور</span>
              <input name="password" type="password" required className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-gold" />
            </label>
            {loginError ? <p className="text-sm font-semibold text-red-700">{loginError}</p> : null}
            <p className="rounded-xl bg-softCream px-4 py-3 text-sm leading-6 text-neutral-600">
              {isSupabaseConfigured ? 'Supabase متصل. استخدم بريد وكلمة مرور المستخدم الموجود في Supabase Authentication.' : 'Supabase غير متصل على هذا النشر. سيتم استخدام الدخول التجريبي المحلي.'}
            </p>
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-black transition hover:bg-black hover:text-white">
              دخول
              <LogIn size={18} />
            </button>
          </form>
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
            <h1 className="mt-2 font-heading text-5xl text-black">إضافة محتوى الموقع</h1>
          </div>
          <button onClick={handleLogout} className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-5 py-3 font-semibold text-black transition hover:border-gold hover:text-gold">
            خروج
            <LogOut size={18} />
          </button>
        </div>

        <form onSubmit={addHomeUpdate} className="mt-10 rounded-2xl bg-white p-6 shadow-md">
          <div className="flex items-center gap-3">
            <Newspaper className="text-gold" size={30} />
            <div>
              <p className="text-sm font-semibold text-gold">الصفحة الرئيسية</p>
              <h2 className="font-heading text-3xl text-black">إضافة تحديث للعرض المتحرك</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <input name="title" required placeholder="عنوان التحديث" className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-gold" />
            <input name="link" type="url" placeholder="رابط اختياري" className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-gold" dir="ltr" />
            <textarea name="body" required placeholder="نص التحديث" rows={6} className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-gold lg:col-span-2" />
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-black/20 px-4 py-5 text-neutral-700 transition hover:border-gold">
              <Upload size={18} />
              تحميل صورة التحديث
              <input
                type="file"
                accept="image/*"
                className="hidden"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (file) setHomeUpdateImage(await uploadContentImage('home-updates', file));
                  }}
                />
            </label>
            {homeUpdateImage ? <img src={homeUpdateImage} alt="معاينة صورة تحديث الصفحة الرئيسية" className="h-40 w-full rounded-xl object-cover" /> : null}
          </div>
          <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-black transition hover:bg-black hover:text-white md:w-auto">
            نشر في الصفحة الرئيسية
            <Plus size={18} />
          </button>
        </form>

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
                    if (file) setBookThumbnail(await uploadContentImage('books', file));
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
                    if (file) setNewsImage(await uploadContentImage('news', file));
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

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <form onSubmit={addEvent} className="rounded-2xl bg-white p-6 shadow-md">
            <div className="flex items-center gap-3">
              <CalendarDays className="text-gold" size={30} />
              <h2 className="font-heading text-3xl text-black">إضافة فعالية</h2>
            </div>
            <div className="mt-6 space-y-4">
              <input name="title" required placeholder="عنوان الفعالية" className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-gold" />
              <input name="date" placeholder="تاريخ الفعالية" className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-gold" />
              <input name="location" placeholder="المكان" className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-gold" />
              <textarea name="body" required placeholder="تفاصيل الفعالية" rows={6} className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-gold" />
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-black/20 px-4 py-5 text-neutral-700 transition hover:border-gold">
                <Upload size={18} />
                تحميل صورة الفعالية
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (file) setEventImage(await uploadContentImage('events', file));
                  }}
                />
              </label>
              {eventImage ? <img src={eventImage} alt="معاينة صورة الفعالية" className="h-40 w-full rounded-xl object-cover" /> : null}
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-black transition hover:bg-black hover:text-white">
                نشر الفعالية
                <Plus size={18} />
              </button>
            </div>
          </form>

          <form onSubmit={addPlay} className="rounded-2xl bg-white p-6 shadow-md">
            <div className="flex items-center gap-3">
              <Drama className="text-gold" size={30} />
              <h2 className="font-heading text-3xl text-black">إضافة مسرحية</h2>
            </div>
            <div className="mt-6 space-y-4">
              <input name="title" required placeholder="عنوان المسرحية" className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-gold" />
              <input name="link" type="url" placeholder="رابط المسرحية" className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-gold" dir="ltr" />
              <textarea name="body" required placeholder="وصف المسرحية" rows={6} className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-gold" />
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-black/20 px-4 py-5 text-neutral-700 transition hover:border-gold">
                <Upload size={18} />
                تحميل صورة المسرحية
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (file) setPlayImage(await uploadContentImage('plays', file));
                  }}
                />
              </label>
              {playImage ? <img src={playImage} alt="معاينة صورة المسرحية" className="h-40 w-full rounded-xl object-cover" /> : null}
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-black transition hover:bg-black hover:text-white">
                نشر المسرحية
                <Plus size={18} />
              </button>
            </div>
          </form>
        </div>

        <section className="mt-10 rounded-2xl bg-white p-6 shadow-md">
          <div className="flex items-center gap-3">
            <UsersRound className="text-gold" size={30} />
            <div>
              <p className="text-sm font-semibold text-gold">الأعضاء الحاليون</p>
              <h2 className="font-heading text-3xl text-black">تعديل الصور والأسماء والمناصب</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {members.map((member) => (
              <article key={member.id} className="rounded-2xl bg-softCream p-4">
                <img src={member.image} alt={`صورة ${member.name}`} className="h-48 w-full rounded-xl bg-white object-cover object-center" />
                <div className="mt-4 space-y-3">
                  <input
                    value={member.name}
                    onChange={(event) => updateMember(member.id, { name: event.target.value })}
                    placeholder="اسم العضو"
                    className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-gold"
                  />
                  <input
                    value={member.role}
                    onChange={(event) => updateMember(member.id, { role: event.target.value })}
                    placeholder="المنصب"
                    className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-gold"
                  />
                  <select
                    value={member.group}
                    onChange={(event) => updateMember(member.id, { group: event.target.value })}
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-gold"
                  >
                    {memberGroupOptions.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-black/20 bg-white px-4 py-4 text-neutral-700 transition hover:border-gold">
                    <Upload size={18} />
                    تغيير الصورة
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (event) => {
                        await updateMemberImage(member.id, event.target.files?.[0]);
                        event.currentTarget.value = '';
                      }}
                    />
                  </label>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="font-heading text-2xl text-black">تحديثات الصفحة الرئيسية</h2>
            <div className="mt-5 space-y-3">
              {homeUpdates.length === 0 ? <p className="text-neutral-600">لا توجد تحديثات منشورة في الصفحة الرئيسية حالياً.</p> : null}
              {homeUpdates.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl bg-softCream p-3">
                  <span className="font-semibold text-black">{item.title}</span>
                  <button onClick={() => removeRecord('homeUpdates', item.id)} className="rounded-full p-2 text-red-700 transition hover:bg-white" aria-label="حذف تحديث الصفحة الرئيسية">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="font-heading text-2xl text-black">الكتب المنشورة</h2>
            <div className="mt-5 space-y-3">
              {books.length === 0 ? <p className="text-neutral-600">لا توجد كتب منشورة حالياً.</p> : null}
              {books.map((book) => (
                <div key={book.id} className="flex items-center justify-between gap-3 rounded-xl bg-softCream p-3">
                  <span className="font-semibold text-black">{book.title}</span>
                  <button onClick={() => removeRecord('books', book.id)} className="rounded-full p-2 text-red-700 transition hover:bg-white" aria-label="حذف الكتاب">
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
                  <button onClick={() => removeRecord('news', item.id)} className="rounded-full p-2 text-red-700 transition hover:bg-white" aria-label="حذف الخبر">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="font-heading text-2xl text-black">الفعاليات المنشورة</h2>
            <div className="mt-5 space-y-3">
              {events.length === 0 ? <p className="text-neutral-600">لا توجد فعاليات منشورة حالياً.</p> : null}
              {events.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl bg-softCream p-3">
                  <span className="font-semibold text-black">{item.title}</span>
                  <button onClick={() => removeRecord('events', item.id)} className="rounded-full p-2 text-red-700 transition hover:bg-white" aria-label="حذف الفعالية">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="font-heading text-2xl text-black">المسرحيات المنشورة</h2>
            <div className="mt-5 space-y-3">
              {plays.length === 0 ? <p className="text-neutral-600">لا توجد مسرحيات منشورة حالياً.</p> : null}
              {plays.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl bg-softCream p-3">
                  <span className="font-semibold text-black">{item.title}</span>
                  <button onClick={() => removeRecord('plays', item.id)} className="rounded-full p-2 text-red-700 transition hover:bg-white" aria-label="حذف المسرحية">
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

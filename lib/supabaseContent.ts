import { createClient } from '@supabase/supabase-js';
import { BookItem, EventItem, HomeUpdateItem, MemberItem, NewsItem, PlayItem } from '@/lib/contentStorage';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;

export const tableNames = {
  books: 'books',
  news: 'news',
  homeUpdates: 'home_updates',
  events: 'events',
  plays: 'plays',
  members: 'members'
} as const;

type ContentRecord = BookItem | NewsItem | HomeUpdateItem | EventItem | PlayItem | MemberItem;

function toCamelRecord(record: any): any {
  return {
    id: record.id,
    title: record.title,
    body: record.body,
    image: record.image,
    link: record.link,
    thumbnail: record.thumbnail,
    date: record.date,
    location: record.location,
    name: record.name,
    role: record.role,
    group: record.group_name || record.group,
    createdAt: record.created_at || record.createdAt
  };
}

function toSupabaseRecord(record: any): any {
  const next: any = {};

  for (const [key, value] of Object.entries(record)) {
    if (value === undefined) continue;
    if (key === 'createdAt') {
      next.created_at = value;
    } else if (key === 'group') {
      next.group_name = value;
    } else {
      next[key] = value;
    }
  }

  return next;
}

export async function fetchContent<T extends ContentRecord>(table: keyof typeof tableNames, fallback: T[] = []): Promise<T[]> {
  if (!supabase) return fallback;

  const { data, error } = await supabase.from(tableNames[table]).select('*').order('created_at', { ascending: false });

  if (error) {
    console.error(error.message);
    return fallback;
  }

  return (data || []).map(toCamelRecord) as T[];
}

export async function insertContent<T extends ContentRecord>(table: keyof typeof tableNames, record: T): Promise<T> {
  if (!supabase) return record;

  const { data, error } = await supabase.from(tableNames[table]).insert(toSupabaseRecord(record)).select('*').single();

  if (error) throw error;

  return toCamelRecord(data) as T;
}

export async function updateContent<T extends ContentRecord>(table: keyof typeof tableNames, id: string, changes: Partial<T>): Promise<T> {
  if (!supabase) return { id, ...changes } as T;

  const { data, error } = await supabase.from(tableNames[table]).update(toSupabaseRecord(changes)).eq('id', id).select('*').single();

  if (error) throw error;

  return toCamelRecord(data) as T;
}

export async function deleteContent(table: keyof typeof tableNames, id: string): Promise<void> {
  if (!supabase) return;

  const { error } = await supabase.from(tableNames[table]).delete().eq('id', id);

  if (error) throw error;
}

export async function uploadContentImage(folder: string, file: File): Promise<string> {
  if (!supabase) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const extension = file.name.split('.').pop() || 'jpg';
  const path = `${folder}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from('site-images').upload(path, file, {
    cacheControl: '3600',
    upsert: false
  });

  if (error) throw error;

  const { data } = supabase.storage.from('site-images').getPublicUrl(path);
  return data.publicUrl;
}

export async function signInAdmin(email: string, password: string) {
  if (!supabase) return { error: new Error('Supabase is not configured yet.') };
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOutAdmin() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function hasAdminSession() {
  if (!supabase) return false;
  const { data } = await supabase.auth.getSession();
  return Boolean(data.session);
}

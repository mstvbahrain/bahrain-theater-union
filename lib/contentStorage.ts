export type BookItem = {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
  createdAt: string;
};

export type NewsItem = {
  id: string;
  title: string;
  body: string;
  image: string;
  createdAt: string;
};

export type EventItem = {
  id: string;
  title: string;
  date: string;
  location: string;
  body: string;
  image: string;
  createdAt: string;
};

export type PlayItem = {
  id: string;
  title: string;
  link: string;
  body: string;
  image: string;
  createdAt: string;
};

export const storageKeys = {
  books: 'btu-books',
  news: 'btu-news',
  events: 'btu-events',
  plays: 'btu-plays',
  adminSession: 'btu-admin-session'
};

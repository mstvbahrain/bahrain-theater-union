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

export const storageKeys = {
  books: 'btu-books',
  news: 'btu-news',
  adminSession: 'btu-admin-session'
};


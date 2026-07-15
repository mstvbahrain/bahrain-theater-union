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

export type HomeUpdateItem = {
  id: string;
  title: string;
  body: string;
  image: string;
  link: string;
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

export type MemberItem = {
  id: string;
  name: string;
  role: string;
  group: string;
  image: string;
};

export const memberGroupOptions = ['رئاسة الاتحاد', 'الأمانة والإدارة المالية', 'اللجان والبرامج'];

export const storageKeys = {
  books: 'btu-books',
  news: 'btu-news',
  homeUpdates: 'btu-home-updates',
  events: 'btu-events',
  plays: 'btu-plays',
  members: 'btu-members',
  adminSession: 'btu-admin-session'
};

create extension if not exists "pgcrypto";

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  link text not null,
  thumbnail text default '',
  created_at timestamptz not null default now()
);

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  image text default '',
  created_at timestamptz not null default now()
);

create table if not exists public.home_updates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  image text default '',
  link text default '',
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date text default '',
  location text default '',
  body text not null,
  image text default '',
  created_at timestamptz not null default now()
);

create table if not exists public.plays (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  link text default '',
  body text not null,
  image text default '',
  created_at timestamptz not null default now()
);

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  group_name text not null,
  image text not null,
  created_at timestamptz not null default now()
);

alter table public.books enable row level security;
alter table public.news enable row level security;
alter table public.home_updates enable row level security;
alter table public.events enable row level security;
alter table public.plays enable row level security;
alter table public.members enable row level security;

create policy "Public can read books" on public.books for select using (true);
create policy "Public can read news" on public.news for select using (true);
create policy "Public can read home updates" on public.home_updates for select using (true);
create policy "Public can read events" on public.events for select using (true);
create policy "Public can read plays" on public.plays for select using (true);
create policy "Public can read members" on public.members for select using (true);

create policy "Admins can write books" on public.books for all to authenticated using (true) with check (true);
create policy "Admins can write news" on public.news for all to authenticated using (true) with check (true);
create policy "Admins can write home updates" on public.home_updates for all to authenticated using (true) with check (true);
create policy "Admins can write events" on public.events for all to authenticated using (true) with check (true);
create policy "Admins can write plays" on public.plays for all to authenticated using (true) with check (true);
create policy "Admins can write members" on public.members for all to authenticated using (true) with check (true);

insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do update set public = true;

create policy "Public can view site images"
on storage.objects for select
using (bucket_id = 'site-images');

create policy "Admins can upload site images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'site-images');

create policy "Admins can update site images"
on storage.objects for update
to authenticated
using (bucket_id = 'site-images')
with check (bucket_id = 'site-images');

create policy "Admins can delete site images"
on storage.objects for delete
to authenticated
using (bucket_id = 'site-images');

insert into public.members (name, role, group_name, image)
select *
from (
  values
    ('محمد الصفار', 'رئيس مجلس الإدارة', 'رئاسة الاتحاد', '/members/member-01.jpg'),
    ('جاسم العالي', 'نائب الرئيس للشؤون الإدارية', 'رئاسة الاتحاد', '/members/member-03.jpg'),
    ('عادل شمس', 'نائب الرئيس لشؤون العلاقاتwhich files  والموارد', 'رئاسة الاتحاد', '/members/member-08.jpg'),
    ('إسماعيل حمدي', 'أمين السر', 'الأمانة والإدارة المالية', '/members/member-02.jpg'),
    ('جلال عبيد', 'الأمين المالي', 'الأمانة والإدارة المالية', '/members/member-07.jpg'),
    ('علي عبدالكريم', 'مساعد الأمين المالي والتميز المسرحي', 'الأمانة والإدارة المالية', '/members/member-05.jpg'),
    ('جمال الغيلان', 'رئيس المشاريع المسرحية', 'اللجان والبرامج', '/members/member-09.jpg'),
    ('فيصل أحمد', 'رئيس العلاقات العامة والإعلام', 'اللجان والبرامج', '/members/member-06.jpg'),
    ('طاهر محسن', 'رئيس الدراسات المسرحية', 'اللجان والبرامج', '/members/member-04.jpg')
) as seed(name, role, group_name, image)
where not exists (select 1 from public.members);

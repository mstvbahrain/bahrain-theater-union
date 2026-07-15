# Supabase Setup

1. Create a free Supabase project.
2. Open Supabase SQL Editor and run `supabase/schema.sql`.
3. Open Authentication > Users and create one admin user.
   - Use the email you want for admin login.
   - Use a strong password, then share it only with the people allowed to post.
4. Open Project Settings > API.
5. Copy these values:
   - Project URL
   - anon public key
6. Add them to Vercel as environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Redeploy the site.

After this, anything posted from `/admin` is saved in Supabase and appears on phones, laptops, and all visitors' devices.

Do not put the Supabase service role key in GitHub or in this frontend project.

# Bahrain Theater Union Website

Ready-to-upload Next.js website for GitHub and Vercel.

## How to use

1. Upload this folder to GitHub.
2. In Vercel, choose **Add New Project**.
3. Import the GitHub repository.
4. Click **Deploy**.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Edit content

Most content is in:

```txt
lib/siteConfig.ts
```

Change:

- YouTube URL
- Instagram URL
- Featured YouTube video embed link
- Members
- Contact information

## Change logo

Replace:

```txt
public/logo.jpeg
```

Keep the same file name, or update `lib/siteConfig.ts`.

## Replace member photos

This version uses elegant placeholder initials. To use real photos, add images to `public/members/` and update the member cards in `components/MembersSection.tsx`.

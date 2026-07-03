# Bahrain Theater Union Website

This is a GitHub-ready Next.js website project for Bahrain Theater Union.

It includes:

- Homepage matching the black/gold theatre mockup style
- Uploaded Bahrain Theater Union logo
- 9 uploaded member photos in the Members section
- About page
- Members page
- Contact page
- YouTube and Instagram buttons
- Featured YouTube embed area
- Responsive design for mobile, tablet, and desktop

## Upload to GitHub

1. Download and extract the ZIP.
2. Open the extracted folder named `bahrain-theater-union`.
3. Upload the contents of that folder to a new GitHub repository.
4. Import the repository into Vercel.
5. Deploy with the default Next.js settings.

## Run locally

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Edit the member names and positions

Open:

```txt
lib/siteConfig.ts
```

Edit this section:

```ts
members: [
  { name: 'Member 01', role: 'President', image: '/members/member-01.jpg' }
]
```

Only change the `name` and `role` text. Keep the image path unless you replace the image file.

## Replace member photos

Photos are stored in:

```txt
public/members/
```

Replace any image with the same file name, for example:

```txt
member-01.jpg
member-02.jpg
```

## Edit YouTube and Instagram links

Open:

```txt
lib/siteConfig.ts
```

Change:

```ts
youtubeUrl: 'https://www.youtube.com/',
instagramUrl: 'https://www.instagram.com/',
featuredVideoEmbed: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
```

For the featured video, use a YouTube embed link such as:

```txt
https://www.youtube.com/embed/VIDEO_ID
```

## Edit contact information

Open:

```txt
lib/siteConfig.ts
```

Change the email, phone, address, and website under `contact`.

## Change logo

The logo is stored at:

```txt
public/logo.jpeg
```

Replace that file with a new logo if needed, keeping the same file name.

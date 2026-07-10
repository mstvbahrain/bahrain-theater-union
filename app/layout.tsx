import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'اتحاد جمعيات المسرحيين - البحرين',
  description: 'المظلة الرسمية للفرق المسرحية الأهلية في مملكة البحرين.',
  icons: { icon: '/logo.jpeg' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}

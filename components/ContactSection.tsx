import { Mail, MapPin, Phone, Globe } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

const items = [
  { icon: Mail, label: 'البريد الإلكتروني', value: siteConfig.contact.email, ltr: true },
  { icon: Phone, label: 'الهاتف', value: siteConfig.contact.phone, ltr: true },
  { icon: MapPin, label: 'العنوان', value: siteConfig.contact.address },
  { icon: Globe, label: 'الموقع الإلكتروني', value: siteConfig.contact.website, ltr: true }
];

export default function ContactSection() {
  return (
    <section className="bg-cream px-5 py-20" id="contact">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm font-semibold text-gold">تواصل معنا</p>
        <h2 className="mt-3 font-heading text-4xl text-black md:text-5xl">نسعد بتواصلكم</h2>
        <div className="mx-auto gold-line" />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="rounded-3xl bg-white p-7 shadow-md">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold text-black"><item.icon size={24} /></div>
              <h3 className="mt-5 font-heading text-xl text-black">{item.label}</h3>
              <p className="mt-2 text-sm text-neutral-600" dir={item.ltr ? 'ltr' : 'rtl'}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

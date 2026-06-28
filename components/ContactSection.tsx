import { Mail, MapPin, Phone, Globe } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

const items = [
  { icon: Mail, label: 'Email', value: siteConfig.contact.email },
  { icon: Phone, label: 'Phone', value: siteConfig.contact.phone },
  { icon: MapPin, label: 'Address', value: siteConfig.contact.address },
  { icon: Globe, label: 'Website', value: siteConfig.contact.website }
];

export default function ContactSection() {
  return (
    <section className="bg-cream px-5 py-20" id="contact">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">Contact Us</p>
        <h2 className="mt-3 font-heading text-4xl text-black md:text-5xl">Get In Touch</h2>
        <div className="mx-auto gold-line" />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="rounded-3xl bg-white p-7 shadow-md">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold text-black"><item.icon size={24} /></div>
              <h3 className="mt-5 font-heading text-xl text-black">{item.label}</h3>
              <p className="mt-2 text-sm text-neutral-600">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

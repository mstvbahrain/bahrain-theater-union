import Navbar from '@/components/Navbar';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <div className="bg-oliveDark px-5 pb-16 pt-36 text-center text-white">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">Contact</p>
        <h1 className="mt-4 font-heading text-5xl md:text-7xl">Contact Us</h1>
      </div>
      <ContactSection />
      <Footer />
    </main>
  );
}

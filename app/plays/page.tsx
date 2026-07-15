import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PlaysContent from '@/components/PlaysContent';

export default function PlaysPage() {
  return (
    <main className="bg-cream">
      <Navbar />
      <section className="px-5 pb-20 pt-36">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold text-gold">المسرحيات</p>
          <h1 className="mt-4 font-heading text-5xl text-black md:text-7xl">المسرحيات والعروض</h1>
          <div className="gold-line" />
          <p className="mt-8 text-lg leading-9 text-neutral-700">
            مساحة لعرض المسرحيات والإنتاجات المسرحية التي يشارك فيها الاتحاد أو يدعمها، مع إبراز الأعمال الجديدة والتجارب الإبداعية في البحرين.
          </p>
          <PlaysContent />
        </div>
      </section>
      <Footer />
    </main>
  );
}

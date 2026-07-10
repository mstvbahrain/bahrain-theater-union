import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function EventsPage() {
  return (
    <main className="bg-cream">
      <Navbar />
      <section className="px-5 pb-20 pt-36">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold text-gold">الفعاليات</p>
          <h1 className="mt-4 font-heading text-5xl text-black md:text-7xl">الفعاليات والأنشطة</h1>
          <div className="gold-line" />
          <p className="mt-8 text-lg leading-9 text-neutral-700">
            هنا تُعرض فعاليات الاتحاد، والورش، والندوات، والعروض، والأنشطة الثقافية التي تجمع المسرحيين والجمهور.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}

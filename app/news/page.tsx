import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NewsPage() {
  return (
    <main className="bg-cream">
      <Navbar />
      <section className="px-5 pb-20 pt-36">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold text-gold">الأخبار</p>
          <h1 className="mt-4 font-heading text-5xl text-black md:text-7xl">أخبار الاتحاد</h1>
          <div className="gold-line" />
          <p className="mt-8 text-lg leading-9 text-neutral-700">
            تابعوا آخر أخبار الاتحاد البحريني للمسرح، وإعلاناته، ومشاركاته، والمستجدات المتعلقة بالحركة المسرحية في مملكة البحرين.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BooksContent from '@/components/BooksContent';

export default function BooksPage() {
  return (
    <main className="bg-cream">
      <Navbar />
      <section className="px-5 pb-20 pt-36">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold text-gold">الكتب</p>
          <h1 className="mt-4 font-heading text-5xl text-black md:text-7xl">الكتب والإصدارات</h1>
          <div className="gold-line" />
          <p className="mt-8 text-lg leading-9 text-neutral-700">
            قسم مخصص للكتب والإصدارات المسرحية، والدراسات، والنصوص، والمواد المعرفية التي تثري المشهد المسرحي وتوثق تجربته.
          </p>
          <BooksContent />
        </div>
      </section>
      <Footer />
    </main>
  );
}

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero-stage min-h-screen px-5 pt-32 text-white">
      <div className="mx-auto flex max-w-7xl items-center py-24 md:min-h-[720px]">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold text-gold">مملكة البحرين</p>
          <h1 className="font-heading text-5xl leading-tight md:text-7xl lg:text-8xl">
            نوحّد المواهب<br />ونلهم الثقافة
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/75">
            المظلة الرسمية التي تجمع الفرق المسرحية الأهلية وتدعم ريادة المسرح البحريني محلياً وعالمياً.
          </p>
          <Link href="/about" className="mt-9 inline-flex rounded-full bg-gold px-8 py-4 text-sm font-semibold text-black transition hover:bg-white">
            تعرّف أكثر
          </Link>
        </div>
      </div>
    </section>
  );
}

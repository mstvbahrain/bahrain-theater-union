import Link from 'next/link';

export default function AboutPreview() {
  return (
    <section className="grid min-h-[580px] lg:grid-cols-2">
      <div className="bg-oliveDark px-5 py-20 text-white lg:px-16">
        <div className="mx-auto max-w-xl lg:mr-auto">
          <p className="text-sm font-semibold text-gold">عن الاتحاد</p>
          <h2 className="mt-4 font-heading text-4xl md:text-5xl">اتحاد جمعيات المسرحيين - البحرين</h2>
          <div className="gold-line" />
          <p className="mt-8 text-lg leading-9 text-white/75">
            يُعتبر الاتحاد المظلة الرسمية والكيان التنظيمي الذي يجمع الفرق المسرحية الأهلية في مملكة البحرين، ويعمل على تطوير الحركة المسرحية، وتمكين المبدعين، وحفظ الذاكرة الفنية للمملكة.
          </p>
          <Link href="/about" className="mt-9 inline-flex rounded-full border border-gold px-8 py-4 text-sm font-semibold text-gold transition hover:bg-gold hover:text-black">
            المزيد عن الاتحاد
          </Link>
        </div>
      </div>
      <div className="about-image min-h-[420px]" />
    </section>
  );
}

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <main className="bg-cream">
      <Navbar />
      <section className="px-5 pb-20 pt-36">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold text-gold">عن الاتحاد</p>
          <h1 className="mt-4 font-heading text-5xl text-black md:text-7xl">اتحاد جمعيات المسرحيين - البحرين</h1>
          <div className="gold-line" />
          <div className="mt-8 space-y-6 text-lg leading-9 text-neutral-700">
            <p>
              يُعتبر اتحاد جمعيات المسرحيين البحرينيين المظلة الرسمية والكيان التنظيمي الذي يجمع الفرق المسرحية الأهلية في مملكة البحرين. وقد لعب الاتحاد دوراً محورياً في صياغة المشهد الثقافي وتطوير الحركة المسرحية التي تتميز بها البحرين تاريخياً.
            </p>
            <p>
              جاء تأسيس الاتحاد نتيجة حراك طويل قاده رواد العمل المسرحي في البحرين، إيماناً بالحاجة إلى اتحاد نوعي يحفظ خصوصية الفرق ويوحد صوتها أمام التحديات. وقد توافقت الفرق المسرحية الكبرى، أوال والصواري وجلجامش والبيادر والريف، على صياغة نظام أساسي يضمن ديمومة الفعل المسرحي وتطوير أدواته.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h2 className="font-heading text-2xl text-black">الرؤية</h2>
              <p className="mt-4 leading-8 text-neutral-700">
                تحقيق الريادة والتميز للمسرح البحريني عالمياً، وبناء هوية مسرحية معاصرة تستلهم التراث وتنفتح على التجريب الحديث.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h2 className="font-heading text-2xl text-black">الرسالة</h2>
              <p className="mt-4 leading-8 text-neutral-700">
                تمكين المسرحيين البحرينيين، وتوحيد جهودهم الإبداعية، وخلق حراك فني يساهم في التنمية الثقافية المستدامة.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h2 className="font-heading text-2xl text-black">الدور المؤسسي</h2>
              <p className="mt-4 leading-8 text-neutral-700">
                يمثل الاتحاد الفرق الأهلية قانونياً، ويخاطب الجهات الحكومية والمنظمات العربية والدولية لعقد الشراكات وبناء التعاون الثقافي.
              </p>
            </div>
          </div>

          <section className="mt-12 rounded-2xl bg-oliveDark p-7 text-white shadow-luxury">
            <h2 className="font-heading text-3xl">المنطلقات الاستراتيجية</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <div>
                <h3 className="font-heading text-xl text-gold">تمكين الكوادر</h3>
                <p className="mt-3 leading-8 text-white/75">توفير الموارد المعرفية واللوجستية للفنانين وصقل المواهب الشابة فنياً وإدارياً.</p>
              </div>
              <div>
                <h3 className="font-heading text-xl text-gold">الوحدة التنظيمية</h3>
                <p className="mt-3 leading-8 text-white/75">تنسيق الجهود بين الفرق الأهلية لضمان تكامل الأدوار وتوحيد الحراك المسرحي.</p>
              </div>
              <div>
                <h3 className="font-heading text-xl text-gold">التنمية المستدامة</h3>
                <p className="mt-3 leading-8 text-white/75">جعل المسرح جزءاً من الاقتصاد الإبداعي والتنمية البشرية في مملكة البحرين.</p>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-3xl text-black">الأهداف الاستراتيجية</h2>
            <div className="gold-line" />
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {[
                'الارتقاء بالمستوى الفني والأكاديمي للعروض المسرحية بما يواكب التطور الجمالي والتقني.',
                'إقامة ورش ومختبرات تدريبية لصقل مواهب الشباب وربطهم بالخبرات المحلية والعالمية.',
                'مأسسة المهرجانات المسرحية الوطنية وتحويلها إلى تظاهرة ثقافية سنوية كبرى.',
                'تعزيز حضور البحرين في المهرجانات الخليجية والعربية والدولية بوفود وعروض تمثل المملكة.',
                'حماية الإرث المسرحي البحريني عبر الأرشفة الرقمية والورقية للنصوص والصور والتسجيلات.',
                'تحسين الأوضاع الاعتبارية والاجتماعية للفنان المسرحي وتعزيز دوره في المجتمع.'
              ].map((goal) => (
                <div key={goal} className="rounded-2xl border border-black/5 bg-white p-5 leading-8 text-neutral-700 shadow-md">
                  {goal}
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}

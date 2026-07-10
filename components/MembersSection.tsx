import Image from 'next/image';
import { siteConfig } from '@/lib/siteConfig';

const memberGroups = [
  {
    title: 'رئاسة الاتحاد',
    description: 'رئيس مجلس الإدارة ونائبا الرئيس المسؤولان عن قيادة العمل المسرحي والتنظيمي.',
    columns: 'lg:grid-cols-3',
    members: siteConfig.members.filter((member) => member.group === 'رئاسة الاتحاد')
  },
  {
    title: 'الأمانة والإدارة المالية',
    description: 'المسؤوليات التنظيمية والمالية التي تدعم استمرارية عمل الاتحاد.',
    columns: 'lg:grid-cols-3',
    members: siteConfig.members.filter((member) => member.group === 'الأمانة والإدارة المالية')
  },
  {
    title: 'اللجان والبرامج',
    description: 'المسؤولون عن المشاريع، والعلاقات العامة، والدراسات المسرحية.',
    columns: 'lg:grid-cols-3',
    members: siteConfig.members.filter((member) => member.group === 'اللجان والبرامج')
  }
];

function MemberCard({ member, featured = false }: { member: (typeof siteConfig.members)[number]; featured?: boolean }) {
  return (
    <article
      className={`group overflow-hidden rounded-xl border border-black/5 bg-white text-center shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-luxury ${
        featured ? 'md:flex md:items-center md:text-right' : ''
      }`}
    >
      <div className={`relative w-full overflow-hidden bg-neutral-200 ${featured ? 'h-64 md:h-56 md:w-52 md:shrink-0' : 'h-44'}`}>
        <Image
          src={member.image}
          alt={`صورة ${member.name}`}
          fill
          sizes={featured ? '(min-width: 768px) 208px, 100vw' : '(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw'}
          className="object-cover object-center transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className={featured ? 'px-6 py-5' : 'px-3 py-4'}>
        <p className="text-xs font-semibold text-gold">{member.role}</p>
        <h3 className={featured ? 'mt-2 text-2xl font-bold text-black' : 'mt-1 text-sm font-bold text-black'}>{member.name}</h3>
      </div>
    </article>
  );
}

export default function MembersSection() {
  return (
    <section className="bg-softCream px-5 py-16" id="members">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-center gap-6 text-center">
          <span className="hidden h-px w-16 bg-gold md:block" />
          <h2 className="font-heading text-3xl text-black md:text-4xl">الأعضاء الحاليون</h2>
          <span className="hidden h-px w-16 bg-gold md:block" />
        </div>

        <div className="mt-12 space-y-12">
          {memberGroups.map((group) => (
            <section key={group.title}>
              <div className="mb-6">
                <h3 className="font-heading text-2xl text-black md:text-3xl">{group.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-neutral-600">{group.description}</p>
              </div>
              <div className={`grid gap-5 ${group.columns}`}>
                {group.members.map((member) => (
                  <MemberCard key={member.image} member={member} featured={group.title !== 'مجلس الإدارة'} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

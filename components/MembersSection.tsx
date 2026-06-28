import { siteConfig } from '@/lib/siteConfig';

export default function MembersSection() {
  return (
    <section className="bg-softCream px-5 py-20" id="members">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">Current Members</p>
          <h2 className="mt-3 font-heading text-4xl text-black md:text-5xl">The People Behind The Union</h2>
          <div className="mx-auto gold-line" />
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {siteConfig.members.map((member) => (
            <article key={member.name} className="rounded-3xl bg-white p-5 text-center shadow-md transition hover:-translate-y-2 hover:shadow-luxury">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-oliveDark to-gold font-heading text-3xl text-white shadow-inner">
                {member.initials}
              </div>
              <h3 className="mt-5 font-heading text-xl text-black">{member.name}</h3>
              <p className="mt-1 text-sm uppercase tracking-[0.15em] text-gold">{member.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

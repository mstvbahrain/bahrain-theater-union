import Image from 'next/image';
import { siteConfig } from '@/lib/siteConfig';

export default function MembersSection() {
  return (
    <section className="bg-softCream px-5 py-16" id="members">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex items-center justify-center gap-6 text-center">
          <span className="hidden h-px w-16 bg-gold md:block" />
          <h2 className="font-heading text-3xl uppercase tracking-[0.08em] text-black md:text-4xl">Current Members</h2>
          <span className="hidden h-px w-16 bg-gold md:block" />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-9">
          {siteConfig.members.map((member) => (
            <article
              key={member.image}
              className="group overflow-hidden rounded-xl border border-black/5 bg-white text-center shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-luxury"
            >
              <div className="relative h-44 w-full overflow-hidden bg-neutral-200">
                <Image
                  src={member.image}
                  alt={`${member.name} profile photo`}
                  fill
                  sizes="(min-width: 1280px) 11vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover object-center transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-3 py-4">
                <h3 className="text-sm font-bold text-black">{member.name}</h3>
                <p className="mt-1 text-xs font-medium text-gold">{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

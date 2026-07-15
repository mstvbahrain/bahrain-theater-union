'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MemberItem, memberGroupOptions, storageKeys } from '@/lib/contentStorage';
import { siteConfig } from '@/lib/siteConfig';

const groupDescriptions: Record<string, string> = {
  'رئاسة الاتحاد': 'رئيس مجلس الإدارة ونائبا الرئيس المسؤولان عن قيادة العمل المسرحي والتنظيمي.',
  'الأمانة والإدارة المالية': 'المسؤوليات التنظيمية والمالية التي تدعم استمرارية عمل الاتحاد.',
  'اللجان والبرامج': 'المسؤولون عن المشاريع، والعلاقات العامة، والدراسات المسرحية.'
};

const defaultMembers: MemberItem[] = siteConfig.members.map((member) => ({
  id: member.image,
  ...member
}));

function MemberPhoto({ member }: { member: MemberItem }) {
  if (member.image.startsWith('data:')) {
    return <img src={member.image} alt={`صورة ${member.name}`} className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105" />;
  }

  return (
    <Image
      src={member.image}
      alt={`صورة ${member.name}`}
      fill
      sizes="(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 100vw"
      className="object-cover object-center transition duration-500 group-hover:scale-105"
    />
  );
}

function MemberCard({ member }: { member: MemberItem }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-black/5 bg-white text-center shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-luxury md:flex md:items-center md:text-right">
      <div className="relative h-64 w-full overflow-hidden bg-neutral-200 md:h-56 md:w-52 md:shrink-0">
        <MemberPhoto member={member} />
      </div>
      <div className="px-6 py-5">
        <p className="text-xs font-semibold text-gold">{member.role}</p>
        <h3 className="mt-2 text-2xl font-bold text-black">{member.name}</h3>
      </div>
    </article>
  );
}

export default function MembersSection() {
  const [members, setMembers] = useState<MemberItem[]>(defaultMembers);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKeys.members);
    if (saved) {
      setMembers(JSON.parse(saved));
    }
  }, []);

  return (
    <section className="bg-softCream px-5 py-16" id="members">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-center gap-6 text-center">
          <span className="hidden h-px w-16 bg-gold md:block" />
          <h2 className="font-heading text-3xl text-black md:text-4xl">الأعضاء الحاليون</h2>
          <span className="hidden h-px w-16 bg-gold md:block" />
        </div>

        <div className="mt-12 space-y-12">
          {memberGroupOptions.map((group) => {
            const groupMembers = members.filter((member) => member.group === group);

            if (groupMembers.length === 0) return null;

            return (
              <section key={group}>
                <div className="mb-6">
                  <h3 className="font-heading text-2xl text-black md:text-3xl">{group}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-neutral-600">{groupDescriptions[group]}</p>
                </div>
                <div className="grid gap-5 lg:grid-cols-3">
                  {groupMembers.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

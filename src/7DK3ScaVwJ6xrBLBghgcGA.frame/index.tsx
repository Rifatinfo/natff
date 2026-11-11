import React from 'react'
import { Download } from 'lucide-react'

import { PageShell, PageIntro } from '../shared/components/PageShell'
import { IMG, bn, type Navigate } from '../shared/site'
import { MEMBERS } from '../shared/members'

export const args = {
  section: 'goals',
}

export const argTypes = {
  section: {
    control: 'radio',
    options: ['goals', 'constitution', 'advisory'],
  },
}

type Props = Partial<typeof args> & { onNavigate?: Navigate }

export default function About(props: Props) {
  const { section, onNavigate } = { ...args, ...props }
  const title = section === 'constitution' ? 'সংবিধান' : section === 'advisory' ? 'উপদেষ্টা পর্ষদ' : 'লক্ষ্য ও উদ্দেশ্য'

  return (
    <PageShell page="about" sub={section} onNavigate={onNavigate}>
      <PageIntro
        page="about"
        sub={section}
        onNavigate={onNavigate}
        title={`আমাদের কথা — ${title}`}
        lede="জাতীয় চলচ্চিত্র সংঘ একটি অরাজনৈতিক, অলাভজনক ও সবার জন্য উন্মুক্ত সংগঠন। ২০২৪ সালে প্রতিষ্ঠিত এই সংঘের লক্ষ্য — সুস্থ চলচ্চিত্র সংস্কৃতিকে দেশের প্রতিটি প্রান্তে পৌঁছে দেওয়া।"
      />

      {section === 'goals' && <Goals />}
      {section === 'constitution' && <Constitution />}
      {section === 'advisory' && <Advisory />}
    </PageShell>
  )
}

function Goals() {
  const goals = [
    ['চলচ্চিত্র সাক্ষরতা', 'স্কুল, কলেজ ও বিশ্ববিদ্যালয়ে চলচ্চিত্র দেখা ও বিশ্লেষণের চর্চা গড়ে তোলা।'],
    ['প্রদর্শনের সুযোগ', 'সিনেমা হলহীন জেলা ও গ্রামে নিয়মিত ভ্রাম্যমাণ প্রদর্শনী আয়োজন।'],
    ['নতুন নির্মাতা তৈরি', 'ওয়ার্কশপ, পরামর্শ ও সরঞ্জাম সহায়তার মাধ্যমে তরুণ নির্মাতাদের পাশে দাঁড়ানো।'],
    ['ঐতিহ্য সংরক্ষণ', 'বাংলা চলচ্চিত্রের দলিল, পোস্টার, চিত্রনাট্য ও মৌখিক ইতিহাস সংগ্রহ ও সংরক্ষণ।'],
    ['গবেষণা ও প্রকাশনা', 'চলচ্চিত্র বিষয়ক গবেষণা, সাময়িকী ও প্রবন্ধ প্রকাশ করা।'],
    ['নীতি-সংলাপ', 'চলচ্চিত্র নীতি, সেন্সর ও বিতরণ ব্যবস্থা নিয়ে সংশ্লিষ্ট সবার সাথে মত বিনিময়।'],
  ]
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1fr_1.4fr] lg:px-8">
      <div>
        <p className="font-serif text-2xl font-semibold leading-relaxed text-ink sm:text-3xl">
          “চলচ্চিত্র কেবল বিনোদন নয় — এটি একটি জাতির স্মৃতি, প্রশ্ন ও স্বপ্নের ভাষা।”
        </p>
        <p className="mt-4 text-ink-mute">— প্রতিষ্ঠা ঘোষণাপত্র, ২০২৪</p>
        <img src={IMG.workshop} alt="তরুণ নির্মাতাদের ওয়ার্কশপ" className="mt-10 aspect-[4/3] w-full rounded-sm object-cover" />
      </div>
      <div>
        <h2 className="font-serif text-2xl font-bold">আমাদের উদ্দেশ্য</h2>
        <dl className="mt-6 divide-y divide-paper-edge border-t border-ink">
          {goals.map(([t, d], i) => (
            <div key={t} className="grid grid-cols-[3rem_1fr] gap-4 py-6">
              <dt className="font-serif text-2xl font-bold text-ink-mute">{bn(i + 1)}</dt>
              <dd>
                <p className="font-serif text-xl font-semibold">{t}</p>
                <p className="mt-1.5 leading-relaxed text-ink-soft">{d}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Constitution() {
  const chapters = [
    ['প্রথম অধ্যায়', 'নাম, ঠিকানা ও কার্যএলাকা', 'সংগঠনের নাম “জাতীয় চলচ্চিত্র সংঘ” (National Film Forum)। প্রধান কার্যালয় ঢাকায় এবং কার্যএলাকা সমগ্র বাংলাদেশ।'],
    ['দ্বিতীয় অধ্যায়', 'লক্ষ্য ও উদ্দেশ্য', 'চলচ্চিত্র সাক্ষরতা, প্রদর্শন, নির্মাণ সহায়তা, সংরক্ষণ ও গবেষণা — সংঘের সকল কার্যক্রমের ভিত্তি।'],
    ['তৃতীয় অধ্যায়', 'সদস্যপদ', 'বয়স, লিঙ্গ, ধর্ম, পেশা নির্বিশেষে যে কোনো বাংলাদেশি নাগরিক বা প্রবাসী সদস্য হতে পারবেন। সদস্যপদ তিন প্রকার: সাধারণ, ছাত্র ও আজীবন।'],
    ['চতুর্থ অধ্যায়', 'সাংগঠনিক কাঠামো', 'জাতীয়, বিভাগীয়, জেলা, বিশ্ববিদ্যালয় ও বিশেষ শাখা — পাঁচ স্তরের কার্যকরী পর্ষদ। প্রতিটি পর্ষদের মেয়াদ দুই বছর।'],
    ['পঞ্চম অধ্যায়', 'নির্বাচন', 'সাধারণ সভায় সদস্যদের প্রত্যক্ষ ভোটে কার্যকরী পর্ষদ নির্বাচিত হবে।'],
    ['ষষ্ঠ অধ্যায়', 'আর্থিক ব্যবস্থাপনা', 'সদস্য চাঁদা ও অনুদানই আয়ের উৎস। প্রতি বছর নিরীক্ষিত হিসাব প্রকাশ করা হবে।'],
  ]
  return (
    <section className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink pb-6">
        <p className="text-ink-soft">সর্বশেষ সংশোধিত: ১২ মার্চ ২০২৬, সাধারণ সভায় অনুমোদিত</p>
        <button className="flex items-center gap-2 whitespace-nowrap rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors duration-150 hover:bg-accent">
          <Download className="h-4 w-4" /> পূর্ণ সংবিধান (পিডিএফ)
        </button>
      </div>
      <div className="divide-y divide-paper-edge">
        {chapters.map(([c, t, d]) => (
          <details key={c} className="group py-6" open={c === 'তৃতীয় অধ্যায়'}>
            <summary className="flex cursor-pointer list-none items-baseline gap-4">
              <span className="w-28 shrink-0 text-sm font-semibold text-ink-mute">{c}</span>
              <span className="flex-1 font-serif text-xl font-semibold">{t}</span>
              <span className="text-xl text-ink-mute group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 leading-relaxed text-ink-soft sm:pl-32">{d}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

function Advisory() {
  const people = [
    { ...MEMBERS[5], role: 'প্রধান উপদেষ্টা' },
    { ...MEMBERS[0], role: 'উপদেষ্টা' },
    { ...MEMBERS[7], role: 'উপদেষ্টা, গবেষণা' },
    { ...MEMBERS[4], role: 'উপদেষ্টা, নির্মাণ' },
  ]
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">
        দেশের বরেণ্য চলচ্চিত্র নির্মাতা, গবেষক ও শিক্ষকদের নিয়ে গঠিত উপদেষ্টা পর্ষদ সংঘের নীতি ও দিকনির্দেশনা দেন।
      </p>
      <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {people.map((p) => (
          <article key={p.id}>
            <img src={p.photo} alt={p.name} className="aspect-[4/5] w-full rounded-sm object-cover" />
            <p className="mt-4 text-sm font-semibold text-accent">{p.role}</p>
            <h3 className="mt-1 font-serif text-xl font-bold">{p.name}</h3>
            <p className="mt-1 text-ink-soft">{p.profession}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

import React from 'react'
import { Play, Download, Clock } from 'lucide-react'

import { PageShell, PageIntro } from '../shared/components/PageShell'
import { IMG, subsOf, type Navigate } from '../shared/site'
import { MEMBERS } from '../shared/members'

export const args = {
  category: 'magazine',
}

export const argTypes = {
  category: { control: 'select', options: ['magazine', 'vlog', 'essay', 'research', 'video'] },
}

type Props = Partial<typeof args> & { onNavigate?: Navigate }

const LEDES: Record<string, string> = {
  magazine: 'ত্রৈমাসিক সাময়িকী “চলচ্চিত্রপত্র” — সমালোচনা, সাক্ষাৎকার ও চলচ্চিত্র সংস্কৃতির খবর।',
  vlog: 'উৎসব, শুটিং ও প্রদর্শনীর পর্দার পেছনের গল্প, সদস্যদের ক্যামেরায়।',
  essay: 'বাংলা ও বিশ্ব চলচ্চিত্র নিয়ে সদস্য ও আমন্ত্রিত লেখকদের প্রবন্ধ ও নিবন্ধ।',
  research: 'সংঘের গবেষণা সেলের মাঠ সমীক্ষা, প্রতিবেদন ও নীতি-প্রস্তাব।',
  video: 'সেমিনার, মাস্টারক্লাস ও সাক্ষাৎকারের পূর্ণ ভিডিও।',
}

export default function Publications(props: Props) {
  const { category, onNavigate } = { ...args, ...props }
  const label = subsOf('publications').find((s) => s.key === category)?.label ?? 'প্রকাশনা'

  return (
    <PageShell page="publications" sub={category} onNavigate={onNavigate}>
      <PageIntro page="publications" sub={category} onNavigate={onNavigate} title={label} lede={LEDES[category]} />
      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        {category === 'magazine' && <Magazine />}
        {(category === 'vlog' || category === 'video') && <Videos kind={category} />}
        {category === 'essay' && <Essays />}
        {category === 'research' && <Research />}
      </section>
    </PageShell>
  )
}

function Magazine() {
  const issues = [
    { no: 'সংখ্যা ১২', when: 'অক্টোবর ২০২৬', theme: 'ঋত্বিক শতবর্ষ' },
    { no: 'সংখ্যা ১১', when: 'জুলাই ২০২৬', theme: 'নারীর চোখে সিনেমা' },
    { no: 'সংখ্যা ১০', when: 'এপ্রিল ২০২৬', theme: 'মফস্বলের সিনেমা হল' },
    { no: 'সংখ্যা ৯', when: 'জানুয়ারি ২০২৬', theme: 'প্রামাণ্যচিত্রের নতুন ভাষা' },
  ]
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
      {/* Current issue gets the weight */}
      <div className="flex aspect-[3/4] flex-col justify-between bg-ink p-8 text-paper">
        <div className="film-rule -mx-8 -mt-8 bg-paper" />
        <div>
          <p className="text-sm tracking-[0.2em] text-paper/70">ত্রৈমাসিক · {issues[0].no}</p>
          <p className="mt-3 font-serif text-5xl font-bold">চলচ্চিত্রপত্র</p>
        </div>
        <div>
          <p className="font-serif text-3xl font-semibold leading-snug">{issues[0].theme}</p>
          <p className="mt-2 text-paper/70">{issues[0].when}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="whitespace-nowrap rounded-full bg-paper px-5 py-2.5 font-semibold text-ink">অনলাইনে পড়ুন</button>
            <button className="flex items-center gap-2 whitespace-nowrap rounded-full border border-paper/40 px-5 py-2.5 font-semibold">
              <Download className="h-4 w-4" /> পিডিএফ
            </button>
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-serif text-2xl font-bold">এই সংখ্যায়</h2>
        <ul className="mt-4 divide-y divide-paper-edge border-t border-ink">
          {['ঋত্বিকের দেশভাগ: ক্ষত ও প্রতিরোধ', 'সাক্ষাৎকার: “তিতাস”-এর চিত্রগ্রাহকের স্মৃতি', 'পুনর্পাঠ: “অযান্ত্রিক” ও যন্ত্রের প্রতি ভালোবাসা', 'তরুণ নির্মাতারা কেন ঋত্বিকে ফেরেন'].map((t) => (
            <li key={t} className="py-4 font-serif text-lg">{t}</li>
          ))}
        </ul>
        <h3 className="mt-12 font-serif text-xl font-bold">পূর্ববর্তী সংখ্যা</h3>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {issues.slice(1).map((i) => (
            <button key={i.no} className="group text-left">
              <span className="flex aspect-[3/4] flex-col justify-end border border-ink bg-paper-deep p-3 transition-colors duration-150 group-hover:bg-paper-edge">
                <span className="font-serif text-sm font-semibold leading-snug sm:text-base">{i.theme}</span>
              </span>
              <span className="mt-2 block text-sm text-ink-soft">{i.no} · {i.when}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Videos({ kind }: { kind: string }) {
  const items =
    kind === 'vlog'
      ? [
          { t: 'খুলনা উৎসবের সাত দিন', d: '১২:৪০', img: IMG.festival, by: MEMBERS[6].name },
          { t: 'কুষ্টিয়ার মাঠে এক রাতের সিনেমা', d: '৮:১৫', img: IMG.hero, by: MEMBERS[2].name },
          { t: 'ওয়ার্কশপের প্রথম দিন', d: '৬:৩০', img: IMG.workshop, by: MEMBERS[3].name },
          { t: 'পুরোনো রিলের খোঁজে', d: '১০:০২', img: IMG.archive, by: MEMBERS[6].name },
        ]
      : [
          { t: 'মাস্টারক্লাস: আলো দিয়ে গল্প বলা', d: '১:১২:০৫', img: IMG.workshop, by: MEMBERS[4].name },
          { t: 'সেমিনার: মুক্তিযুদ্ধের চলচ্চিত্র', d: '১:৪৮:২০', img: IMG.seminar, by: 'জাতীয় পর্ষদ' },
          { t: 'সাক্ষাৎকার: সুফিয়া বেগম', d: '৩৪:১০', img: IMG.archive, by: MEMBERS[7].name },
          { t: 'উৎসবের উদ্বোধনী আলোচনা', d: '৫২:৪৫', img: IMG.festival, by: 'উৎসব কমিটি' },
        ]
  const [lead, ...rest] = items
  return (
    <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
      <button className="group text-left">
        <span className="relative block">
          <img src={lead.img} alt="" className="aspect-video w-full rounded-sm object-cover" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-150 group-hover:scale-105">
              <Play className="ml-1 h-7 w-7 fill-current" />
            </span>
          </span>
        </span>
        <span className="mt-4 block font-serif text-2xl font-bold">{lead.t}</span>
        <span className="mt-1 block text-ink-soft">{lead.by} · {lead.d}</span>
      </button>
      <ul className="divide-y divide-paper-edge">
        {rest.map((v) => (
          <li key={v.t}>
            <button className="group grid w-full grid-cols-[9rem_1fr] gap-4 py-4 text-left first:pt-0">
              <span className="relative">
                <img src={v.img} alt="" className="aspect-video w-full rounded-sm object-cover" />
                <span className="absolute bottom-1.5 right-1.5 rounded-sm bg-ink px-1.5 text-xs text-paper">{v.d}</span>
              </span>
              <span>
                <span className="block font-serif font-semibold leading-snug group-hover:underline">{v.t}</span>
                <span className="mt-1 block text-sm text-ink-soft">{v.by}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Essays() {
  const essays = [
    { t: 'জহির রায়হানের “জীবন থেকে নেয়া”: রাজনৈতিক রূপকের পাঠ', a: MEMBERS[7], ex: 'একটি পারিবারিক গল্পের আড়ালে কীভাবে একটি জাতির মুক্তির আকাঙ্ক্ষা লুকিয়ে ছিল — তার পুনর্পাঠ।', m: '১৪ মিনিট' },
    { t: 'ক্যামেরা যখন গ্রামে যায়: আমাদের প্রামাণ্যচিত্রের নৈতিকতা', a: MEMBERS[0], ex: 'যাদের গল্প বলি, তাদের কাছে আমাদের দায় কী?', m: '৯ মিনিট' },
    { t: 'সিনেমা হলের অন্ধকার কেন জরুরি', a: MEMBERS[1], ex: 'মোবাইলের পর্দায় সব দেখা যায়, কিন্তু একসাথে দেখা যায় না।', m: '৭ মিনিট' },
    { t: 'স্বল্পদৈর্ঘ্য চলচ্চিত্র: সীমাবদ্ধতা নয়, স্বাধীনতা', a: MEMBERS[2], ex: 'বাজেট ছোট হলে গল্প বড় হতে বাধা কোথায়?', m: '৬ মিনিট' },
  ]
  return (
    <div className="mx-auto max-w-4xl divide-y divide-paper-edge border-t border-ink">
      {essays.map((e) => (
        <article key={e.t} className="py-8">
          <h2 className="font-serif text-2xl font-bold leading-snug hover:underline">{e.t}</h2>
          <p className="mt-3 text-lg leading-relaxed text-ink-soft">{e.ex}</p>
          <div className="mt-4 flex items-center gap-3 text-sm text-ink-soft">
            <img src={e.a.photo} alt="" className="h-8 w-8 rounded-full object-cover" />
            <span className="font-semibold text-ink">{e.a.name}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {e.m}</span>
          </div>
        </article>
      ))}
    </div>
  )
}

function Research() {
  const papers = [
    { t: 'জেলা শহরে সিনেমা হল বন্ধের এক দশক: একটি মাঠ সমীক্ষা', y: '২০২৬', p: '৮৬ পৃষ্ঠা', a: 'গবেষণা সেল, জাতীয় চলচ্চিত্র সংঘ' },
    { t: 'বাংলাদেশে চলচ্চিত্র সাক্ষরতা: মাধ্যমিক বিদ্যালয়ে পাইলট প্রকল্পের ফলাফল', y: '২০২৬', p: '৪২ পৃষ্ঠা', a: 'ড. সেলিনা আক্তার, তানভীর হাসান' },
    { t: 'হারিয়ে যাওয়া সেলুলয়েড: ১৯৫৬–১৯৮০ সালের চলচ্চিত্র প্রিন্টের অবস্থা', y: '২০২৫', p: '১২০ পৃষ্ঠা', a: 'সুফিয়া বেগম' },
  ]
  return (
    <div className="divide-y divide-paper-edge border-t border-ink">
      {papers.map((r) => (
        <article key={r.t} className="grid gap-4 py-7 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="font-serif text-xl font-bold leading-snug sm:text-2xl">{r.t}</h2>
            <p className="mt-2 text-ink-soft">{r.a} · {r.y} · {r.p}</p>
          </div>
          <button className="flex w-fit items-center gap-2 whitespace-nowrap rounded-full border border-ink/25 px-5 py-2.5 font-semibold transition-colors duration-150 hover:bg-paper-deep">
            <Download className="h-4 w-4" /> প্রতিবেদন ডাউনলোড
          </button>
        </article>
      ))}
    </div>
  )
}

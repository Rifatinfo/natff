import React, { useState } from 'react'
import { Play, Download, MapPin, Images, Quote } from 'lucide-react'

import { PageShell, PageIntro } from '../shared/components/PageShell'
import { IMG, subsOf, type Navigate } from '../shared/site'
import { MEMBERS } from '../shared/members'

export const args = {
  category: 'news',
  year: '২০২৬',
}

export const argTypes = {
  category: { control: 'select', options: ['news', 'events', 'photos', 'videos', 'opinions', 'notices'] },
  year: { control: 'radio', options: ['২০২৬', '২০২৫', '২০২৪'] },
}

type Props = Partial<typeof args> & { onNavigate?: Navigate }

const LEDES: Record<string, string> = {
  news: 'সংঘ ও দেশের চলচ্চিত্র অঙ্গনের খবর, প্রকাশের তারিখ অনুযায়ী।',
  events: 'অতীতের সব আয়োজনের নথি — কোথায়, কবে, কারা ছিলেন।',
  photos: 'উৎসব, প্রদর্শনী ও কর্মশালার আলোকচিত্র অ্যালবাম।',
  videos: 'আয়োজনের ধারণকৃত ভিডিও ও প্রতিবেদন।',
  opinions: 'সদস্য ও দর্শকদের মতামত, প্রতিক্রিয়া ও খোলা চিঠি।',
  notices: 'সংঘের সব দাপ্তরিক বিজ্ঞপ্তি, ডাউনলোডযোগ্য।',
}

const YEARS = ['২০২৬', '২০২৫', '২০২৪']

export default function Archive(props: Props) {
  const { category, year: initialYear, onNavigate } = { ...args, ...props }
  const [year, setYear] = useState(initialYear)
  const label = subsOf('archive').find((s) => s.key === category)?.label ?? 'আর্কাইভ'

  return (
    <PageShell page="archive" sub={category} onNavigate={onNavigate}>
      <PageIntro
        page="archive"
        sub={category}
        onNavigate={onNavigate}
        title={`আর্কাইভ: ${label}`}
        lede={LEDES[category]}
        aside={
          <div className="flex shrink-0 rounded-full border border-ink/20 p-1">
            {YEARS.map((y) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-150 ${
                  year === y ? 'bg-ink text-paper' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        }
      />
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        {category === 'news' && <News year={year} />}
        {category === 'events' && <Events year={year} />}
        {category === 'photos' && <Photos year={year} />}
        {category === 'videos' && <Videos />}
        {category === 'opinions' && <Opinions />}
        {category === 'notices' && <Notices year={year} />}
      </section>
    </PageShell>
  )
}

function News({ year }: { year: string }) {
  const items = [
    { d: `১০ নভেম্বর ${year}`, t: 'জাতীয় চলচ্চিত্র উৎসব ২০২৭-এর জুরি বোর্ড ঘোষণা', ex: 'পাঁচ সদস্যের জুরি বোর্ডের নেতৃত্বে থাকছেন প্রবীণ চলচ্চিত্র গবেষক সুফিয়া বেগম।' },
    { d: `২৮ অক্টোবর ${year}`, t: 'সাত দিনের আঞ্চলিক চলচ্চিত্র উৎসবে ৪২টি চলচ্চিত্র, দর্শক ১২ হাজার', ex: 'খুলনার পুরোনো সিনেমা হলে ফিরে এলো দর্শকের ভিড়।' },
    { d: `১৫ অক্টোবর ${year}`, t: 'নতুন ছয়টি জেলায় কার্যকরী পর্ষদ গঠিত', ex: 'নেত্রকোনা, নীলফামারী, ভোলা, মেহেরপুর, বান্দরবান ও সুনামগঞ্জে আহ্বায়ক কমিটি দায়িত্ব নিয়েছে।' },
    { d: `০২ অক্টোবর ${year}`, t: 'বিদ্যালয়ে চলচ্চিত্র সাক্ষরতা: পাইলট প্রকল্পের দ্বিতীয় ধাপ শুরু', ex: 'এবার ২০টি মাধ্যমিক বিদ্যালয়ে সাপ্তাহিক ক্লাস।' },
    { d: `২০ সেপ্টেম্বর ${year}`, t: 'সংঘের সদস্য সংখ্যা ছাড়াল ৪,৮০০', ex: 'অনলাইন আবেদন চালুর পর এক বছরে নতুন সদস্য ১,৯০০ জন।' },
  ]
  const [lead, ...rest] = items
  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <article>
        <img src={IMG.festival} alt="" className="aspect-[16/9] w-full rounded-sm object-cover" />
        <p className="mt-4 text-sm text-ink-mute">{lead.d}</p>
        <h2 className="mt-1 font-serif text-3xl font-bold leading-snug hover:underline">{lead.t}</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink-soft">{lead.ex}</p>
      </article>
      <ul className="divide-y divide-paper-edge border-t border-ink lg:border-t-0">
        {rest.map((n) => (
          <li key={n.t} className="py-5 first:pt-5 lg:first:pt-0">
            <p className="text-sm text-ink-mute">{n.d}</p>
            <h3 className="mt-1 font-serif text-xl font-semibold leading-snug hover:underline">{n.t}</h3>
            <p className="mt-1.5 text-ink-soft">{n.ex}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Events({ year }: { year: string }) {
  const items = [
    { d: '২৮', m: 'অক্টোবর', t: 'আঞ্চলিক চলচ্চিত্র উৎসব, খুলনা বিভাগ', p: 'উমা সিনেমা হল, খুলনা', k: 'চলচ্চিত্র উৎসব', n: '১২,০০০ দর্শক' },
    { d: '১২', m: 'সেপ্টেম্বর', t: 'ক্যামেরার ভাষা: চিত্রগ্রহণ কর্মশালা', p: 'শিল্পকলা একাডেমি, ঢাকা', k: 'ওয়ার্কশপ', n: '৪০ জন অংশগ্রহণকারী' },
    { d: '২১', m: 'আগস্ট', t: 'মুক্তিযুদ্ধের চলচ্চিত্র: স্মৃতি ও নির্মাণ', p: 'রাজশাহী বিশ্ববিদ্যালয়', k: 'সেমিনার', n: '৩৫০ জন উপস্থিত' },
    { d: '০৫', m: 'জুলাই', t: 'তরুণ নির্মাতাদের সাথে মত বিনিময়', p: 'চট্টগ্রাম প্রেস ক্লাব', k: 'মত বিনিময়', n: '৮০ জন উপস্থিত' },
    { d: '১৪', m: 'এপ্রিল', t: 'পহেলা বৈশাখ উপলক্ষে উন্মুক্ত চলচ্চিত্র প্রদর্শনী', p: 'কুষ্টিয়া শিলাইদহ', k: 'চলচ্চিত্র প্রদর্শনী', n: '২,০০০ দর্শক' },
  ]
  return (
    <ul className="border-t border-ink">
      {items.map((e) => (
        <li key={e.t} className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-paper-edge py-5 sm:grid-cols-[6rem_1fr_auto] sm:items-center sm:gap-6">
          <span className="text-center">
            <span className="block font-serif text-3xl font-bold leading-none">{e.d}</span>
            <span className="mt-1 block text-sm text-ink-mute">{e.m} {year}</span>
          </span>
          <span className="min-w-0">
            <span className="text-sm font-semibold text-accent">{e.k}</span>
            <span className="mt-0.5 block font-serif text-lg font-semibold leading-snug sm:text-xl">{e.t}</span>
            <span className="mt-1 flex items-center gap-1.5 text-sm text-ink-mute"><MapPin className="h-3.5 w-3.5" /> {e.p}</span>
          </span>
          <span className="col-start-2 text-sm text-ink-soft sm:col-start-auto sm:text-right">{e.n}</span>
        </li>
      ))}
    </ul>
  )
}

function Photos({ year }: { year: string }) {
  const albums = [
    { t: 'আঞ্চলিক চলচ্চিত্র উৎসব, খুলনা', img: IMG.festival, n: '৮৪টি ছবি' },
    { t: 'ভ্রাম্যমাণ প্রদর্শনী, কুষ্টিয়া', img: IMG.hero, n: '৪২টি ছবি' },
    { t: 'চিত্রগ্রহণ কর্মশালা, ঢাকা', img: IMG.workshop, n: '৩৬টি ছবি' },
    { t: 'মুক্তিযুদ্ধের চলচ্চিত্র সেমিনার', img: IMG.seminar, n: '২৮টি ছবি' },
    { t: 'বিশ্ববিদ্যালয় চলচ্চিত্র সংসদ সপ্তাহ', img: IMG.clubs, n: '৫১টি ছবি' },
    { t: 'সংঘের আর্কাইভ: পুরোনো রিল', img: IMG.archive, n: '৬০টি ছবি' },
  ]
  const [lead, ...rest] = albums
  return (
    <div className="grid gap-5 md:grid-cols-3">
      <button className="group text-left md:col-span-2 md:row-span-2">
        <img src={lead.img} alt="" className="aspect-[4/3] w-full rounded-sm object-cover md:aspect-auto md:h-[calc(100%-4rem)]" />
        <span className="mt-3 block font-serif text-2xl font-bold group-hover:underline">{lead.t}</span>
        <span className="flex items-center gap-1.5 text-sm text-ink-mute"><Images className="h-3.5 w-3.5" /> {lead.n} · {year}</span>
      </button>
      {rest.map((a) => (
        <button key={a.t} className="group text-left">
          <img src={a.img} alt="" className="aspect-[4/3] w-full rounded-sm object-cover" />
          <span className="mt-2 block font-serif font-semibold leading-snug group-hover:underline">{a.t}</span>
          <span className="flex items-center gap-1.5 text-sm text-ink-mute"><Images className="h-3.5 w-3.5" /> {a.n}</span>
        </button>
      ))}
    </div>
  )
}

function Videos() {
  const vids = [
    { t: 'উৎসব প্রতিবেদন: খুলনায় সাত দিন', d: '১৪:২০', img: IMG.festival },
    { t: 'কর্মশালার শেষ দিনের প্রদর্শনী', d: '২২:০৫', img: IMG.workshop },
    { t: 'সেমিনার: মুক্তিযুদ্ধের চলচ্চিত্র (পূর্ণ)', d: '১:৪৮:২০', img: IMG.seminar },
    { t: 'মাঠের সিনেমা: কুষ্টিয়া', d: '৯:৪০', img: IMG.hero },
    { t: 'ক্যাম্পাস সংসদ সপ্তাহ', d: '১১:১৫', img: IMG.clubs },
    { t: 'রিল সংরক্ষণ প্রকল্প', d: '১৮:৩০', img: IMG.archive },
  ]
  return (
    <ul className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {vids.map((v) => (
        <li key={v.t}>
          <button className="group w-full text-left">
            <span className="relative block">
              <img src={v.img} alt="" className="aspect-video w-full rounded-sm object-cover" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-150 group-hover:scale-105">
                  <Play className="ml-0.5 h-5 w-5 fill-current" />
                </span>
              </span>
              <span className="absolute bottom-2 right-2 rounded-sm bg-ink px-1.5 text-xs text-paper">{v.d}</span>
            </span>
            <span className="mt-3 block font-serif text-lg font-semibold leading-snug group-hover:underline">{v.t}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}

function Opinions() {
  const ops = [
    { m: MEMBERS[3], t: 'জেলা শহরে সিনেমা হল বাঁচাতে স্থানীয় সরকারের ভূমিকা চাই', q: 'একটি হল বন্ধ মানে শুধু একটি ব্যবসা বন্ধ নয়, একটি শহরের একসাথে বসে স্বপ্ন দেখার জায়গা হারিয়ে যাওয়া।' },
    { m: MEMBERS[6], t: 'উৎসবে আঞ্চলিক ভাষার চলচ্চিত্রের জন্য আলাদা বিভাগ হোক', q: 'সিলেটি, চাটগাঁইয়া বা চাকমা ভাষার ছবিগুলো মূল প্রতিযোগিতায় হারিয়ে যায়।' },
    { m: MEMBERS[2], t: 'শিক্ষার্থী সদস্যদের জন্য সরঞ্জাম ভাগাভাগির ব্যবস্থা', q: 'একটি ক্যামেরা ও একটি মাইক্রোফোন দশজন তরুণ নির্মাতার প্রথম ছবি সম্ভব করতে পারে।' },
  ]
  return (
    <div className="mx-auto max-w-4xl divide-y divide-paper-edge border-t border-ink">
      {ops.map((o) => (
        <article key={o.t} className="py-9">
          <Quote className="h-6 w-6 text-accent" />
          <p className="mt-3 font-serif text-2xl font-semibold leading-snug">{o.q}</p>
          <h2 className="mt-4 text-lg font-semibold hover:underline">{o.t}</h2>
          <div className="mt-4 flex items-center gap-3">
            <img src={o.m.photo} alt="" className="h-10 w-10 rounded-full object-cover" />
            <span>
              <span className="block font-semibold">{o.m.name}</span>
              <span className="block text-sm text-ink-mute">{o.m.profession}, {o.m.district}</span>
            </span>
          </div>
        </article>
      ))}
    </div>
  )
}

function Notices({ year }: { year: string }) {
  const rows = [
    { no: '১৪৮', d: `০৮ নভেম্বর ${year}`, t: 'জাতীয় চলচ্চিত্র উৎসব ২০২৭: চলচ্চিত্র জমাদানের নির্দেশিকা' },
    { no: '১৪৭', d: `২৫ অক্টোবর ${year}`, t: 'বার্ষিক সাধারণ সভা আহ্বান' },
    { no: '১৪৬', d: `১০ অক্টোবর ${year}`, t: 'সদস্যপদ নবায়ন ফি জমাদানের সময়সীমা বৃদ্ধি' },
    { no: '১৪৫', d: `২২ সেপ্টেম্বর ${year}`, t: 'জেলা কার্যকরী পর্ষদ নির্বাচন: তফসিল ঘোষণা' },
    { no: '১৪৪', d: `০১ সেপ্টেম্বর ${year}`, t: 'চলচ্চিত্র সম্মাননা ২০২৬: মনোনয়ন আহ্বান' },
  ]
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-left">
        <thead>
          <tr className="border-b border-ink text-sm text-ink-mute">
            <th className="py-3 pr-4 font-medium">স্মারক নং</th>
            <th className="py-3 pr-4 font-medium">তারিখ</th>
            <th className="py-3 pr-4 font-medium">বিষয়</th>
            <th className="py-3 font-medium" />
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.no} className="border-b border-paper-edge">
              <td className="py-4 pr-4 font-serif font-bold">{r.no}</td>
              <td className="whitespace-nowrap py-4 pr-4 text-ink-soft">{r.d}</td>
              <td className="py-4 pr-4 font-medium">{r.t}</td>
              <td className="py-4 text-right">
                <button className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-ink/20 px-3.5 py-1.5 text-sm font-semibold transition-colors duration-150 hover:bg-paper-deep">
                  <Download className="h-3.5 w-3.5" /> পিডিএফ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

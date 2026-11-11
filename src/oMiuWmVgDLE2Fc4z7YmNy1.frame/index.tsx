import React from 'react'
import { ArrowRight, CalendarDays, MapPin, FileText, Award } from 'lucide-react'

import { PageShell, PageIntro } from '../shared/components/PageShell'
import { IMG, subsOf, type Navigate } from '../shared/site'
import { MEMBERS } from '../shared/members'

export const args = {
  category: 'workshop',
}

export const argTypes = {
  category: {
    control: 'select',
    options: ['workshop', 'seminar', 'screening', 'festival', 'dialogue', 'honours', 'gathering', 'notice'],
  },
}

type Props = Partial<typeof args> & { onNavigate?: Navigate }

type Item = { date: string; title: string; place: string; note: string }

const DATA: Record<string, { img: string; lede: string; featured: Item; past: Item[] }> = {
  workshop: {
    img: IMG.workshop,
    lede: 'হাতে-কলমে শেখা: চিত্রনাট্য, চিত্রগ্রহণ, সম্পাদনা ও শব্দ — অভিজ্ঞ নির্মাতাদের তত্ত্বাবধানে।',
    featured: { date: '২৪–২৬ নভেম্বর ২০২৬', title: 'মোবাইল ফোনে স্বল্পদৈর্ঘ্য চলচ্চিত্র নির্মাণ', place: 'রাজশাহী বিশ্ববিদ্যালয়, শহীদ মুনসুর আলী ভবন', note: 'আসন সংখ্যা ৪০ · সদস্যদের জন্য বিনামূল্যে' },
    past: [
      { date: 'সেপ্টেম্বর ২০২৬', title: 'প্রামাণ্যচিত্রের গবেষণা ও সাক্ষাৎকার পদ্ধতি', place: 'খুলনা', note: '৩২ জন অংশগ্রহণকারী' },
      { date: 'জুলাই ২০২৬', title: 'চিত্রনাট্য লেখার প্রাথমিক পাঠ', place: 'ঢাকা', note: '৫০ জন অংশগ্রহণকারী' },
      { date: 'মে ২০২৬', title: 'শব্দ ধারণ ও সাউন্ড ডিজাইন', place: 'চট্টগ্রাম', note: '২৮ জন অংশগ্রহণকারী' },
    ],
  },
  seminar: {
    img: IMG.seminar,
    lede: 'চলচ্চিত্রের নান্দনিকতা, ইতিহাস ও নীতি নিয়ে গবেষক, নির্মাতা ও দর্শকের মুখোমুখি আলোচনা।',
    featured: { date: '৫ ডিসেম্বর ২০২৬', title: 'বাংলাদেশের স্বাধীন চলচ্চিত্র: সংকট ও সম্ভাবনা', place: 'চট্টগ্রাম শিল্পকলা একাডেমি', note: 'প্রবেশ উন্মুক্ত · বিকেল ৪টা' },
    past: [
      { date: 'আগস্ট ২০২৬', title: 'মুক্তিযুদ্ধের চলচ্চিত্র: পঞ্চাশ বছরের পাঠ', place: 'ঢাকা', note: 'মূল প্রবন্ধ: ড. সেলিনা আক্তার' },
      { date: 'জুন ২০২৬', title: 'ওটিটি যুগে সিনেমা হলের ভবিষ্যৎ', place: 'সিলেট', note: '৪ জন আলোচক' },
    ],
  },
  screening: {
    img: IMG.hero,
    lede: 'প্রতি মাসে দেশের নানা প্রান্তে ধ্রুপদি ও সমকালীন চলচ্চিত্রের প্রদর্শনী, প্রদর্শনী শেষে আলোচনা।',
    featured: { date: '১৮ নভেম্বর ২০২৬, সন্ধ্যা ৬টা', title: 'ঋত্বিক ঘটক স্মরণে: “মেঘে ঢাকা তারা”', place: 'কেন্দ্রীয় পাবলিক লাইব্রেরি মিলনায়তন, ঢাকা', note: 'প্রবেশ বিনামূল্যে' },
    past: [
      { date: 'অক্টোবর ২০২৬', title: 'ভ্রাম্যমাণ প্রদর্শনী: “মাটির ময়না”', place: 'কুষ্টিয়া', note: 'প্রায় ৮০০ দর্শক' },
      { date: 'সেপ্টেম্বর ২০২৬', title: 'তরুণ নির্মাতাদের স্বল্পদৈর্ঘ্য সন্ধ্যা', place: 'রংপুর', note: '৯টি চলচ্চিত্র' },
      { date: 'আগস্ট ২০২৬', title: '“জীবন থেকে নেয়া” — বিশেষ প্রদর্শনী', place: 'বরিশাল', note: '৪৫০ দর্শক' },
    ],
  },
  festival: {
    img: IMG.festival,
    lede: 'জাতীয় ও আঞ্চলিক চলচ্চিত্র উৎসব — নতুন নির্মাতাদের কাজ দর্শকের সামনে আনার সবচেয়ে বড় মঞ্চ।',
    featured: { date: '১০–১৬ মার্চ ২০২৭', title: 'জাতীয় চলচ্চিত্র উৎসব ২০২৭', place: 'ঢাকা ও আট বিভাগীয় শহর', note: 'চলচ্চিত্র জমার শেষ তারিখ: ১৪ জানুয়ারি ২০২৭' },
    past: [
      { date: 'অক্টোবর ২০২৬', title: 'খুলনা আঞ্চলিক চলচ্চিত্র উৎসব', place: 'খুলনা', note: '৪২টি চলচ্চিত্র · ১২ হাজার দর্শক' },
      { date: 'মার্চ ২০২৬', title: 'জাতীয় চলচ্চিত্র উৎসব ২০২৬', place: 'ঢাকা', note: '১১৮টি চলচ্চিত্র' },
    ],
  },
  dialogue: {
    img: IMG.seminar,
    lede: 'নির্মাতা, প্রদর্শক, নীতিনির্ধারক ও দর্শকের মধ্যে খোলামেলা মত বিনিময় সভা।',
    featured: { date: '২০ ডিসেম্বর ২০২৬', title: 'জেলা পর্যায়ে সিনেমা হল পুনরুজ্জীবন: প্রদর্শকদের সাথে মত বিনিময়', place: 'বগুড়া প্রেস ক্লাব', note: 'সদস্য ও আমন্ত্রিত অতিথি' },
    past: [
      { date: 'জুলাই ২০২৬', title: 'সেন্সর বোর্ড থেকে সার্টিফিকেশন বোর্ড: নির্মাতাদের ভাবনা', place: 'ঢাকা', note: '৬০ জন অংশগ্রহণকারী' },
    ],
  },
  honours: {
    img: IMG.archive,
    lede: 'চলচ্চিত্রে আজীবন অবদান ও সম্ভাবনাময় নতুন কাজের স্বীকৃতিতে বার্ষিক চলচ্চিত্র সম্মাননা।',
    featured: { date: '১৬ মার্চ ২০২৭', title: 'জাতীয় চলচ্চিত্র সম্মাননা ২০২৭ — মনোনয়ন আহ্বান', place: 'সমাপনী অনুষ্ঠান, জাতীয় চলচ্চিত্র উৎসব', note: 'মনোনয়নের শেষ তারিখ: ৩১ ডিসেম্বর ২০২৬' },
    past: [
      { date: '২০২৬', title: 'আজীবন সম্মাননা: সুফিয়া বেগম', place: 'চলচ্চিত্র গবেষণায় অবদান', note: 'আজীবন সম্মাননা' },
      { date: '২০২৬', title: 'সম্ভাবনাময় নির্মাতা: রাশেদ করিম', place: 'কাহিনিচিত্র “নোনা জল”', note: 'নবীন নির্মাতা সম্মাননা' },
    ],
  },
  gathering: {
    img: IMG.hero,
    lede: 'সদস্যদের বার্ষিক সাধারণ সভা, পুনর্মিলনী ও আঞ্চলিক সমাবেশ।',
    featured: { date: '২৮ ফেব্রুয়ারি ২০২৭', title: 'বার্ষিক সাধারণ সভা ও সদস্য সমাবেশ', place: 'বাংলা একাডেমি, ঢাকা', note: 'সকল সদস্য আমন্ত্রিত' },
    past: [{ date: 'ফেব্রুয়ারি ২০২৬', title: 'প্রথম বার্ষিক সাধারণ সভা', place: 'ঢাকা', note: '১,২০০ সদস্যের উপস্থিতি' }],
  },
  notice: { img: IMG.archive, lede: '', featured: { date: '', title: '', place: '', note: '' }, past: [] },
}

const NOTICES = [
  { date: '১০ নভেম্বর ২০২৬', title: 'জাতীয় চলচ্চিত্র উৎসব ২০২৭-এ চলচ্চিত্র জমা দেওয়ার আহ্বান', urgent: true },
  { date: '০২ নভেম্বর ২০২৬', title: 'বার্ষিক সদস্য চাঁদা নবায়নের সময়সীমা ৩১ ডিসেম্বর পর্যন্ত বর্ধিত', urgent: false },
  { date: '২৫ অক্টোবর ২০২৬', title: 'বিশ্ববিদ্যালয় শাখা গঠনের নির্দেশিকা (সংশোধিত)', urgent: false },
  { date: '১২ অক্টোবর ২০২৬', title: 'জাতীয় চলচ্চিত্র সম্মাননা ২০২৭ — মনোনয়ন ফরম', urgent: false },
  { date: '৩০ সেপ্টেম্বর ২০২৬', title: 'কার্যকরী পর্ষদ নির্বাচন ২০২৭: তফসিল ঘোষণা', urgent: false },
]

export default function Activities(props: Props) {
  const { category, onNavigate } = { ...args, ...props }
  const label = subsOf('activities').find((s) => s.key === category)?.label ?? 'কার্যক্রম'
  const d = DATA[category] ?? DATA.workshop

  return (
    <PageShell page="activities" sub={category} onNavigate={onNavigate}>
      <PageIntro page="activities" sub={category} onNavigate={onNavigate} title={label} lede={category === 'notice' ? 'সংঘের আনুষ্ঠানিক ঘোষণা, তফসিল ও নির্দেশিকা।' : d.lede} />

      {category === 'notice' ? (
        <section className="mx-auto max-w-4xl px-5 py-14 lg:px-8">
          <ul className="divide-y divide-paper-edge border-y border-ink">
            {NOTICES.map((n) => (
              <li key={n.title} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-6">
                <span className="w-36 shrink-0 text-sm text-ink-mute">{n.date}</span>
                <span className="flex-1 font-serif text-lg font-semibold leading-snug">
                  {n.urgent && <span className="mr-2 rounded-sm bg-accent px-1.5 py-0.5 align-middle font-sans text-xs font-semibold text-paper">জরুরি</span>}
                  {n.title}
                </span>
                <button className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-ink hover:text-accent">
                  <FileText className="h-4 w-4" /> পিডিএফ
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <>
          {/* What's next — the reason anyone opens this page */}
          <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-12 lg:px-8">
            <img src={d.img} alt="" className="aspect-[16/10] w-full rounded-sm object-cover" />
            <div>
              <p className="font-semibold text-accent">আসন্ন</p>
              <h2 className="mt-2 font-serif text-3xl font-bold leading-snug sm:text-4xl">{d.featured.title}</h2>
              <div className="mt-5 space-y-2 text-ink-soft">
                <p className="flex items-start gap-2"><CalendarDays className="mt-1 h-4 w-4 shrink-0" /> {d.featured.date}</p>
                <p className="flex items-start gap-2"><MapPin className="mt-1 h-4 w-4 shrink-0" /> {d.featured.place}</p>
              </div>
              <p className="mt-4 border-l-2 border-ink pl-3 text-ink">{d.featured.note}</p>
              <button className="mt-7 flex items-center gap-2 whitespace-nowrap rounded-full bg-ink px-6 py-3 font-semibold text-paper transition-colors duration-150 hover:bg-accent">
                {category === 'honours' ? 'মনোনয়ন দিন' : category === 'festival' ? 'চলচ্চিত্র জমা দিন' : 'নিবন্ধন করুন'} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
            <h3 className="font-serif text-2xl font-bold">{category === 'honours' ? 'সম্মাননাপ্রাপ্ত' : 'পূর্ববর্তী আয়োজন'}</h3>
            <ul className="mt-5 divide-y divide-paper-edge border-t border-ink">
              {d.past.map((p, i) => (
                <li key={p.title} className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-6">
                  <span className="text-sm text-ink-mute">{p.date}</span>
                  <span className="flex min-w-0 items-center gap-4">
                    {category === 'honours' && (
                      <img src={i === 0 ? MEMBERS[5].photo : MEMBERS[4].photo} alt="" className="h-14 w-14 shrink-0 rounded-full object-cover" />
                    )}
                    <span className="min-w-0">
                      <span className="block font-serif text-lg font-semibold">{p.title}</span>
                      <span className="block text-ink-soft">{p.place}</span>
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-ink-soft">
                    {category === 'honours' && <Award className="h-4 w-4" />} {p.note}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </PageShell>
  )
}

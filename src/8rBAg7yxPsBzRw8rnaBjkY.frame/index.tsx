import React, { useState } from 'react'
import { MapPin, Users, ArrowRight, Search } from 'lucide-react'

import { PageShell, PageIntro } from '../shared/components/PageShell'
import { IMG, bn, type Navigate } from '../shared/site'

export const args = {
  filter: 'সব',
}

export const argTypes = {
  filter: { control: 'radio', options: ['সব', 'বিশ্ববিদ্যালয়', 'জেলা', 'কলেজ ও বিদ্যালয়'] },
}

type Props = Partial<typeof args> & { onNavigate?: Navigate }

const CLUBS = [
  { name: 'ঢাকা বিশ্ববিদ্যালয় চলচ্চিত্র সংসদ', kind: 'বিশ্ববিদ্যালয়', place: 'ঢাকা', members: 412, since: '১৯৮৪', meets: 'প্রতি বৃহস্পতিবার প্রদর্শনী' },
  { name: 'রাজশাহী বিশ্ববিদ্যালয় ফিল্ম সোসাইটি', kind: 'বিশ্ববিদ্যালয়', place: 'রাজশাহী', members: 268, since: '১৯৯২', meets: 'মাসিক চলচ্চিত্র আড্ডা' },
  { name: 'চট্টগ্রাম বিশ্ববিদ্যালয় চলচ্চিত্র চক্র', kind: 'বিশ্ববিদ্যালয়', place: 'চট্টগ্রাম', members: 231, since: '২০০১', meets: 'পাক্ষিক প্রদর্শনী ও আলোচনা' },
  { name: 'খুলনা ফিল্ম সোসাইটি', kind: 'জেলা', place: 'খুলনা', members: 186, since: '১৯৭৮', meets: 'আঞ্চলিক চলচ্চিত্র উৎসবের আয়োজক' },
  { name: 'সিলেট চলচ্চিত্র সংসদ', kind: 'জেলা', place: 'সিলেট', members: 142, since: '১৯৯৫', meets: 'চা-বাগানে ভ্রাম্যমাণ প্রদর্শনী' },
  { name: 'কুষ্টিয়া সিনে ক্লাব', kind: 'জেলা', place: 'কুষ্টিয়া', members: 97, since: '২০১০', meets: 'খোলা মাঠে মাসিক প্রদর্শনী' },
  { name: 'শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ফিল্ম ক্লাব', kind: 'বিশ্ববিদ্যালয়', place: 'সিলেট', members: 175, since: '২০০৬', meets: 'বার্ষিক স্বল্পদৈর্ঘ্য প্রতিযোগিতা' },
  { name: 'বরিশাল সরকারি বি এম কলেজ চলচ্চিত্র চক্র', kind: 'কলেজ ও বিদ্যালয়', place: 'বরিশাল', members: 88, since: '২০১৫', meets: 'চলচ্চিত্র সাক্ষরতা কর্মশালা' },
  { name: 'ময়মনসিংহ জিলা স্কুল ফিল্ম ক্লাব', kind: 'কলেজ ও বিদ্যালয়', place: 'ময়মনসিংহ', members: 64, since: '২০২২', meets: 'শিশু-কিশোর চলচ্চিত্র প্রদর্শনী' },
]

const FILTERS = ['সব', 'বিশ্ববিদ্যালয়', 'জেলা', 'কলেজ ও বিদ্যালয়']

export default function Clubs(props: Props) {
  const { filter: initial, onNavigate } = { ...args, ...props }
  const [filter, setFilter] = useState(initial)
  const [q, setQ] = useState('')
  const list = CLUBS.filter((c) => (filter === 'সব' || c.kind === filter) && (q === '' || `${c.name} ${c.place}`.includes(q)))

  return (
    <PageShell page="clubs" onNavigate={onNavigate}>
      <PageIntro
        page="clubs"
        title="ক্লাব/সোসাইটি"
        lede="দেশজুড়ে বিশ্ববিদ্যালয়, জেলা, কলেজ ও বিদ্যালয়ের চলচ্চিত্র ক্লাব ও সোসাইটি জাতীয় চলচ্চিত্র সংঘের সাথে যুক্ত। আপনার কাছের ক্লাবটি খুঁজে নিন।"
        onNavigate={onNavigate}
        aside={
          <div className="flex shrink-0 gap-8">
            <p>
              <span className="block font-serif text-4xl font-bold leading-none">{bn(126)}</span>
              <span className="mt-1 block text-sm text-ink-soft">সংযুক্ত ক্লাব</span>
            </p>
            <p>
              <span className="block font-serif text-4xl font-bold leading-none">{bn(48)}</span>
              <span className="mt-1 block text-sm text-ink-soft">জেলায় সক্রিয়</span>
            </p>
          </div>
        }
      />

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                  filter === f ? 'bg-ink text-paper' : 'border border-ink/20 text-ink-soft hover:bg-paper-deep'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <label className="flex w-full items-center gap-3 rounded-full border border-ink/20 px-5 py-2.5 focus-within:border-ink md:max-w-xs">
            <Search className="h-4 w-4 shrink-0 text-ink-mute" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ক্লাব বা জেলার নাম" className="w-full min-w-0 bg-transparent placeholder:text-ink-mute focus:outline-none" />
          </label>
        </div>

        {/* A directory — so a list, not tiles */}
        <ul className="mt-8 border-t border-ink">
          {list.map((c) => (
            <li key={c.name} className="grid gap-2 border-b border-paper-edge py-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)_8rem_auto] md:items-center md:gap-6">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-accent">{c.kind}</p>
                <h2 className="font-serif text-xl font-bold leading-snug">{c.name}</h2>
              </div>
              <p className="text-ink-soft">{c.meets}</p>
              <div className="flex gap-4 text-sm text-ink-soft md:flex-col md:gap-1">
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {c.place}</span>
                <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {bn(c.members)} জন</span>
              </div>
              <p className="text-sm text-ink-mute md:text-right">প্রতিষ্ঠা {c.since}</p>
            </li>
          ))}
          {list.length === 0 && <li className="py-16 text-center text-ink-soft">এই নামে কোনো ক্লাব পাওয়া যায়নি।</li>}
        </ul>
      </section>

      {/* Register a club */}
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:px-8">
          <img src={IMG.clubs} alt="বিশ্ববিদ্যালয় চলচ্চিত্র সংসদের প্রদর্শনী" className="aspect-[3/2] w-full rounded-sm object-cover" />
          <div>
            <h2 className="font-serif text-3xl font-bold leading-snug sm:text-4xl">আপনার ক্লাবকে সংঘের সাথে যুক্ত করুন</h2>
            <p className="mt-4 text-lg leading-relaxed text-paper/80">
              সংযুক্ত ক্লাব পায় চলচ্চিত্র প্রিন্ট ও প্রদর্শনীর অনুমতি, প্রশিক্ষক সহায়তা, উৎসবে অংশগ্রহণের সুযোগ এবং সংঘের প্রকাশনা।
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate?.('contact')}
                className="flex items-center gap-2 whitespace-nowrap rounded-full bg-paper px-6 py-3.5 font-semibold text-ink transition-colors duration-150 hover:bg-paper-deep"
              >
                নিবন্ধনের জন্য যোগাযোগ <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => onNavigate?.('about', 'constitution')}
                className="whitespace-nowrap rounded-full border border-paper/40 px-6 py-3.5 font-semibold transition-colors duration-150 hover:bg-paper/10"
              >
                সংযুক্তির নিয়মাবলি
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}

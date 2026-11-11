import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Check } from 'lucide-react'

import { PageShell, PageIntro } from '../shared/components/PageShell'
import { FacebookIcon, YoutubeIcon, WhatsappIcon } from '../shared/components/BrandIcons'
import type { Navigate } from '../shared/site'

export const args = {
  state: 'default',
}

export const argTypes = {
  state: { control: 'radio', options: ['default', 'sent'] },
}

type Props = Partial<typeof args> & { onNavigate?: Navigate }

const TOPICS = ['সাধারণ জিজ্ঞাসা', 'সদস্যপদ', 'ক্লাব সংযুক্তি', 'আয়োজনে অংশগ্রহণ', 'গণমাধ্যম', 'অনুদান']

const DIVISIONS = [
  { d: 'চট্টগ্রাম বিভাগ', p: '০১৮১৯-৪৫৬৭৮৯' },
  { d: 'রাজশাহী বিভাগ', p: '০১৭১৩-৩৪৫৬৭৮' },
  { d: 'খুলনা বিভাগ', p: '০১৭১১-৮৯০১২৩' },
  { d: 'সিলেট বিভাগ', p: '০১৭১৫-৬৭৮৯০১' },
]

export default function Contact(props: Props) {
  const { state, onNavigate } = { ...args, ...props }
  const [sent, setSent] = useState(state === 'sent')
  const [topic, setTopic] = useState(TOPICS[0])

  return (
    <PageShell page="contact" onNavigate={onNavigate}>
      <PageIntro
        page="contact"
        title="যোগাযোগ"
        lede="প্রশ্ন, প্রস্তাব বা সহযোগিতার জন্য লিখুন। আমরা দুই কর্মদিবসের মধ্যে উত্তর দিই।"
        onNavigate={onNavigate}
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:px-8">
        {/* Message form — the main thing here */}
        <div>
          {sent ? (
            <div className="border-t border-ink pt-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper">
                <Check className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-serif text-3xl font-bold">বার্তা পাঠানো হয়েছে</h2>
              <p className="mt-3 max-w-md text-lg text-ink-soft">ধন্যবাদ। আপনার ইমেইলে একটি নিশ্চিতকরণ পাঠানো হয়েছে। দুই কর্মদিবসের মধ্যে আমরা যোগাযোগ করব।</p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 rounded-full border border-ink/25 px-5 py-2.5 font-semibold transition-colors duration-150 hover:bg-paper-deep"
              >
                আরেকটি বার্তা লিখুন
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
              className="space-y-6"
            >
              <div>
                <p className="mb-2 text-sm font-semibold">বিষয়</p>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                        topic === t ? 'bg-ink text-paper' : 'border border-ink/20 text-ink-soft hover:border-ink'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold">আপনার নাম</span>
                  <input required defaultValue="মাহমুদুল হক" className={input} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold">ইমেইল বা মোবাইল</span>
                  <input required defaultValue="mahmudul.haque@yahoo.com" className={input} />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">বার্তা</span>
                <textarea
                  required
                  rows={6}
                  defaultValue="আমাদের উপজেলায় একটি ভ্রাম্যমাণ চলচ্চিত্র প্রদর্শনী আয়োজন করতে চাই। সংঘের সহায়তা কীভাবে পেতে পারি?"
                  className={`${input} resize-none`}
                />
              </label>
              <button
                type="submit"
                className="w-full whitespace-nowrap rounded-full bg-ink px-8 py-3.5 font-semibold text-paper transition-colors duration-150 hover:bg-accent sm:w-auto"
              >
                বার্তা পাঠান
              </button>
            </form>
          )}
        </div>

        {/* Where to find us */}
        <aside className="space-y-10">
          <div>
            <h2 className="font-serif text-2xl font-bold">কেন্দ্রীয় কার্যালয়</h2>
            <ul className="mt-4 space-y-3.5 text-ink-soft">
              <li className="flex gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0 text-ink" /> বাড়ি ১২, সড়ক ৫, ধানমন্ডি, ঢাকা ১২০৫</li>
              <li className="flex gap-3"><Phone className="mt-1 h-4 w-4 shrink-0 text-ink" /> ০২-৯৬৬১২৩৪ · ০১৭১২-৩৪৫৬৭৮</li>
              <li className="flex gap-3"><Mail className="mt-1 h-4 w-4 shrink-0 text-ink" /> info@nff.org.bd</li>
              <li className="flex gap-3"><Clock className="mt-1 h-4 w-4 shrink-0 text-ink" /> শনি–বৃহস্পতি, সকাল ১০টা – সন্ধ্যা ৬টা</li>
            </ul>
            <div className="mt-5 flex gap-2">
              {[FacebookIcon, YoutubeIcon, WhatsappIcon].map((Icon, i) => (
                <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition-colors duration-150 hover:bg-ink hover:text-paper">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-xl font-bold">বিভাগীয় কার্যালয়</h2>
            <ul className="mt-3 divide-y divide-paper-edge border-t border-ink">
              {DIVISIONS.map((d) => (
                <li key={d.d} className="flex items-center justify-between gap-4 py-3">
                  <span className="font-medium">{d.d}</span>
                  <span className="whitespace-nowrap text-ink-soft">{d.p}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => onNavigate?.('committee', 'divisional')} className="mt-3 text-sm font-semibold hover:text-accent">
              সব বিভাগীয় পর্ষদ দেখুন →
            </button>
          </div>
        </aside>
      </section>
    </PageShell>
  )
}

const input =
  'w-full rounded-sm border border-ink/20 bg-paper px-3.5 py-2.5 text-ink transition-colors duration-150 focus:border-ink focus:outline-none'

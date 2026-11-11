import React, { useMemo, useState } from 'react'
import { Search, ArrowRight } from 'lucide-react'

import { PageShell, PageIntro } from '../shared/components/PageShell'
import { bn, type Navigate } from '../shared/site'
import { MEMBERS } from '../shared/members'

export const args = {
  query: '',
  type: 'সকল',
}

export const argTypes = {
  query: { control: 'text' },
  type: { control: 'radio', options: ['সকল', 'আজীবন সদস্য', 'সাধারণ সদস্য', 'ছাত্র সদস্য'] },
}

type Props = Partial<typeof args> & { onNavigate?: Navigate; onOpenMember?: (id: string) => void }

const TYPES = ['সকল', 'আজীবন সদস্য', 'সাধারণ সদস্য', 'ছাত্র সদস্য']

export default function Members(props: Props) {
  const p = { ...args, ...props }
  const { onNavigate, onOpenMember } = p
  const [query, setQuery] = useState(p.query)
  const [type, setType] = useState(p.type)

  const list = useMemo(
    () =>
      MEMBERS.filter(
        (m) =>
          (type === 'সকল' || m.type === type) &&
          (!query || [m.name, m.nameEn, m.district, m.profession, m.id].some((f) => f.toLowerCase().includes(query.toLowerCase())))
      ),
    [query, type]
  )

  return (
    <PageShell page="members" onNavigate={onNavigate}>
      <PageIntro
        page="members"
        title="সদস্য"
        lede="জাতীয় চলচ্চিত্র সংঘের সকল অনুমোদিত সদস্যের তালিকা সবার জন্য উন্মুক্ত। যে কোনো সদস্যের প্রোফাইল কার্ড দেখুন ও শেয়ার করুন।"
        aside={
          <button
            onClick={() => onNavigate?.('apply')}
            className="flex w-fit items-center gap-2 whitespace-nowrap rounded-full bg-ink px-6 py-3.5 font-semibold text-paper transition-colors duration-150 hover:bg-accent"
          >
            সদস্যপদের জন্য আবেদন <ArrowRight className="h-4 w-4" />
          </button>
        }
      />

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <label className="flex w-full items-center gap-2 rounded-full border border-ink/25 bg-paper px-4 py-2.5 md:max-w-md">
            <Search className="h-4 w-4 shrink-0 text-ink-mute" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="নাম, জেলা, পেশা বা সদস্য নম্বর দিয়ে খুঁজুন"
              className="w-full bg-transparent outline-none placeholder:text-ink-mute"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors duration-150 ${
                  type === t ? 'bg-ink font-semibold text-paper' : 'border border-paper-edge text-ink-soft hover:bg-paper-deep'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm text-ink-mute">{bn(list.length)} জন সদস্য দেখানো হচ্ছে · মোট নিবন্ধিত ৪,৮২৬</p>

        {list.length === 0 ? (
          <div className="mt-10 border-y border-paper-edge py-16 text-center">
            <p className="font-serif text-2xl font-semibold">কোনো সদস্য পাওয়া যায়নি</p>
            <p className="mt-2 text-ink-soft">অন্য নাম বা জেলা দিয়ে আবার খুঁজুন।</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {list.map((m) => (
              <button key={m.id} onClick={() => onOpenMember?.(m.id)} className="group flex flex-col text-left">
                <span className="block overflow-hidden rounded-sm bg-paper-deep">
                  <img src={m.photo} alt={m.name} className="aspect-[4/5] w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]" />
                </span>
                <span className="mt-3 font-serif text-lg font-bold leading-snug group-hover:underline">{m.name}</span>
                <span className="mt-0.5 line-clamp-1 text-sm text-ink-soft">{m.role}</span>
                <span className="mt-2 flex flex-wrap gap-x-3 text-xs text-ink-mute">
                  <span>{m.district}</span>
                  <span>{m.type}</span>
                  <span>নং {bn(m.id)}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  )
}

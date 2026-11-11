import React, { useState } from 'react'
import { Phone, Users } from 'lucide-react'

import { PageShell, PageIntro } from '../shared/components/PageShell'
import { bn, type Navigate } from '../shared/site'
import { MEMBERS } from '../shared/members'

export const args = {
  tier: 'national',
}

export const argTypes = {
  tier: { control: 'select', options: ['national', 'divisional', 'district', 'university', 'special'] },
}

type Props = Partial<typeof args> & { onNavigate?: Navigate; onOpenMember?: (id: string) => void }

const TITLES: Record<string, string> = {
  national: 'জাতীয় কার্যকরী পর্ষদ',
  divisional: 'বিভাগীয় কার্যকরী পর্ষদ',
  district: 'জেলা কার্যকরী পর্ষদ',
  university: 'বিশ্ববিদ্যালয় শাখা',
  special: 'বিশেষ শাখা',
}

const UNITS: Record<string, string[]> = {
  divisional: ['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'],
  district: ['ঢাকা', 'গাজীপুর', 'নারায়ণগঞ্জ', 'টাঙ্গাইল', 'কুমিল্লা', 'চট্টগ্রাম', 'কক্সবাজার', 'রাজশাহী', 'বগুড়া', 'খুলনা', 'যশোর', 'কুষ্টিয়া', 'বরিশাল', 'সিলেট', 'রংপুর', 'দিনাজপুর', 'ময়মনসিংহ', 'নেত্রকোণা'],
  university: ['ঢাকা বিশ্ববিদ্যালয়', 'জাহাঙ্গীরনগর বিশ্ববিদ্যালয়', 'রাজশাহী বিশ্ববিদ্যালয়', 'চট্টগ্রাম বিশ্ববিদ্যালয়', 'খুলনা বিশ্ববিদ্যালয়', 'শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়', 'জগন্নাথ বিশ্ববিদ্যালয়', 'বেগম রোকেয়া বিশ্ববিদ্যালয়'],
  special: ['নারী নির্মাতা শাখা', 'শিশু-কিশোর চলচ্চিত্র শাখা', 'প্রবাসী শাখা', 'প্রামাণ্যচিত্র শাখা', 'চলচ্চিত্র সংরক্ষণ শাখা'],
}

const ROLES = ['সভাপতি', 'সহ-সভাপতি', 'সাধারণ সম্পাদক', 'যুগ্ম সম্পাদক', 'সাংগঠনিক সম্পাদক', 'অর্থ সম্পাদক', 'প্রচার সম্পাদক', 'সদস্য']
const NAMES = ['মো. শফিকুল ইসলাম', 'রুমানা পারভীন', 'আরিফ হোসেন', 'সাদিয়া রহমান', 'কামরুল হাসান', 'জান্নাতুল ফেরদৌস', 'নাজমুল হক', 'ইমরান খান', 'তাসলিমা নাসির', 'রবিউল আলম']

export default function Committee(props: Props) {
  const { tier, onNavigate, onOpenMember } = { ...args, ...props }

  return (
    <PageShell page="committee" sub={tier} onNavigate={onNavigate}>
      <PageIntro
        page="committee"
        sub={tier}
        onNavigate={onNavigate}
        title={TITLES[tier] ?? TITLES.national}
        lede="সংঘের পাঁচ স্তরের কার্যকরী পর্ষদ সদস্যদের সরাসরি ভোটে দুই বছরের জন্য নির্বাচিত হয়। মেয়াদ: ২০২৫–২০২৭।"
      />
      {tier === 'national' ? <National onOpenMember={onOpenMember} /> : <Units key={tier} tier={tier} />}
    </PageShell>
  )
}

function National({ onOpenMember }: { onOpenMember?: (id: string) => void }) {
  const leads = [MEMBERS[0], MEMBERS[1]]
  const rest = [MEMBERS[7], MEMBERS[4], MEMBERS[3], MEMBERS[2]]
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="grid gap-8 md:grid-cols-2">
        {leads.map((m) => (
          <button key={m.id} onClick={() => onOpenMember?.(m.id)} className="group grid grid-cols-[8rem_1fr] items-end gap-5 text-left sm:grid-cols-[11rem_1fr]">
            <img src={m.photo} alt={m.name} className="aspect-[3/4] w-full rounded-sm object-cover" />
            <div className="pb-2">
              <p className="font-semibold text-accent">{m.role.split(',')[0]}</p>
              <h2 className="mt-1 font-serif text-2xl font-bold group-hover:underline sm:text-3xl">{m.name}</h2>
              <p className="mt-2 text-ink-soft">{m.profession}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-14 border-t border-ink pt-8">
        <h3 className="font-serif text-xl font-bold">সম্পাদকমণ্ডলী ও সদস্যবৃন্দ</h3>
        <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4">
          {rest.map((m) => (
            <button key={m.id} onClick={() => onOpenMember?.(m.id)} className="group text-left">
              <img src={m.photo} alt={m.name} className="aspect-square w-full rounded-sm object-cover" />
              <p className="mt-3 font-serif text-lg font-semibold leading-snug group-hover:underline">{m.name}</p>
              <p className="text-sm text-ink-soft">{m.role.split(',')[0]}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function Units({ tier }: { tier: string }) {
  const units = UNITS[tier] ?? []
  const [sel, setSel] = useState(0)
  const unit = units[sel]
  const seed = (sel * 3 + tier.length) % NAMES.length
  const rows = ROLES.map((r, i) => ({ role: r, name: NAMES[(seed + i) % NAMES.length] }))

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[18rem_1fr] lg:px-8">
      <aside>
        <p className="text-sm font-semibold text-ink-mute">শাখা নির্বাচন করুন ({bn(units.length)})</p>
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-0.5 lg:overflow-visible">
          {units.map((u, i) => (
            <li key={u} className="shrink-0">
              <button
                onClick={() => setSel(i)}
                className={`w-full whitespace-nowrap rounded-md px-3 py-2 text-left transition-colors duration-150 lg:whitespace-normal ${
                  i === sel ? 'bg-ink font-semibold text-paper' : 'text-ink-soft hover:bg-paper-deep'
                }`}
              >
                {u}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="min-w-0">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-5">
          <div>
            <h2 className="font-serif text-3xl font-bold">{unit}</h2>
            <p className="mt-1 text-ink-soft">মেয়াদ ২০২৫–২০২৭ · {bn(rows.length)} সদস্যের পর্ষদ</p>
          </div>
          <p className="flex items-center gap-2 text-ink-soft">
            <Users className="h-4 w-4" /> সাধারণ সদস্য {bn(120 + sel * 37)} জন
          </p>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-ink-mute">
              <th className="py-3 pr-4 font-medium">পদবি</th>
              <th className="py-3 pr-4 font-medium">নাম</th>
              <th className="hidden py-3 font-medium sm:table-cell">যোগাযোগ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-paper-edge">
            {rows.map((r, i) => (
              <tr key={r.role}>
                <td className="py-4 pr-4 text-ink-soft">{r.role}</td>
                <td className={`py-4 pr-4 font-serif ${i < 3 ? 'text-lg font-semibold' : ''}`}>{r.name}</td>
                <td className="hidden py-4 text-ink-soft sm:table-cell">
                  {i < 3 && (
                    <span className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5" /> {bn(`০১৭১১-${(seed * 1000 + i * 271 + 4000) % 9000 + 1000}৫২`)}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

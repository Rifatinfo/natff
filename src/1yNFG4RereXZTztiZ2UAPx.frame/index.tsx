import React, { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Camera, Check, Loader2, ArrowRight, ShieldCheck } from 'lucide-react'

import { PageShell, PageIntro } from '../shared/components/PageShell'
import { MemberCard } from '../shared/components/MemberCard'
import { IMG, bn, type Navigate } from '../shared/site'
import type { Member } from '../shared/members'

export const args = {
  state: 'default',
  name: 'সাবরিনা ইয়াসমিন',
  nameEn: 'Sabrina Yasmin',
  district: 'কুমিল্লা',
}

export const argTypes = {
  state: { control: 'select', options: ['default', 'error', 'submitted', 'approved'] },
  name: { control: 'text' },
  nameEn: { control: 'text' },
  district: { control: 'text' },
}

type Props = Partial<typeof args> & {
  onNavigate?: Navigate
  onSubmit?: (m: Member) => void
  onViewCard?: () => void
  onReset?: () => void
}

const TYPES: { value: Member['type']; fee: string; note: string }[] = [
  { value: 'সাধারণ সদস্য', fee: '৫০০ টাকা / বছর', note: 'যেকোনো চলচ্চিত্রপ্রেমী' },
  { value: 'ছাত্র সদস্য', fee: '২০০ টাকা / বছর', note: 'বৈধ শিক্ষার্থী পরিচয়পত্রসহ' },
  { value: 'আজীবন সদস্য', fee: '১০,০০০ টাকা, এককালীন', note: 'আজীবন ভোটাধিকারসহ' },
]
const BRANCHES = ['জাতীয়', 'বিভাগীয়', 'জেলা', 'বিশ্ববিদ্যালয়', 'বিশেষ শাখা']
const INTERESTS = ['চলচ্চিত্র নির্মাণ', 'চিত্রনাট্য', 'অভিনয়', 'চিত্রগ্রহণ', 'সম্পাদনা', 'সমালোচনা ও গবেষণা', 'চলচ্চিত্র দেখা']

export default function MembershipApplication(props: Props) {
  const p = { ...args, ...props }
  const { state, onNavigate, onSubmit, onViewCard, onReset } = p
  const [name, setName] = useState(p.name)
  const [nameEn, setNameEn] = useState(p.nameEn)
  const [district, setDistrict] = useState(p.district)
  const [profession, setProfession] = useState('স্বাধীন চলচ্চিত্র নির্মাতা')
  const [phone, setPhone] = useState('01711-234567')
  const [type, setType] = useState<Member['type']>('সাধারণ সদস্য')
  const [branch, setBranch] = useState('জেলা')
  const [interests, setInterests] = useState<string[]>(['চলচ্চিত্র নির্মাণ', 'চিত্রনাট্য'])
  const [bio, setBio] = useState('গ্রামীণ নারীদের জীবন নিয়ে স্বল্পদৈর্ঘ্য প্রামাণ্যচিত্র নির্মাণ করছি।')
  const [photo, setPhoto] = useState(IMG.applicant)
  const [agree, setAgree] = useState(state !== 'error')
  const [tried, setTried] = useState(state === 'error')
  const fileRef = useRef<HTMLInputElement>(null)

  const draft: Member = {
    id: '2026-4827',
    name: name || 'আপনার নাম',
    nameEn: nameEn || 'Your name',
    photo,
    role: `সদস্য, ${district || 'আপনার জেলা'} ${branch} শাখা`,
    type,
    district: district || 'আপনার জেলা',
    branch,
    profession: profession || 'পেশা',
    joined: 'নভেম্বর ২০২৬',
    bio,
  }

  const missing = !name || !phone || !district || !agree
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setTried(true)
    if (missing) return
    onSubmit?.(draft)
  }

  if (state === 'submitted' || state === 'approved') {
    return (
      <PageShell page="apply" onNavigate={onNavigate}>
        <Outcome state={state} member={draft} onViewCard={onViewCard} onReset={onReset} onNavigate={onNavigate} />
      </PageShell>
    )
  }

  return (
    <PageShell page="apply" onNavigate={onNavigate}>
      <PageIntro
        page="apply"
        title="সদস্যপদের জন্য আবেদন"
        lede="জাতীয় চলচ্চিত্র সংঘের সদস্য হতে পারেন যে কেউ। ফর্মটি পূরণ করুন — অনুমোদনের পর আপনার ছবি ও নামসহ সদস্য প্রোফাইল কার্ড স্বয়ংক্রিয়ভাবে তৈরি হবে।"
        onNavigate={onNavigate}
      />

      <form onSubmit={submit} className="mx-auto grid max-w-7xl gap-12 px-5 py-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:px-8">
        <div className="min-w-0 space-y-12">
          {/* Photo */}
          <Group title="ছবি" hint="আপনার প্রোফাইল কার্ডে এই ছবিটি ব্যবহার হবে। মুখ স্পষ্ট দেখা যায় এমন ছবি দিন।">
            <div className="flex items-center gap-5">
              <img src={photo} alt="" className="h-28 w-24 rounded-sm object-cover" />
              <div>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-2 whitespace-nowrap rounded-full border border-ink/25 px-5 py-2.5 font-semibold transition-colors duration-150 hover:bg-paper-deep"
                >
                  <Camera className="h-4 w-4" /> ছবি পরিবর্তন করুন
                </button>
                <p className="mt-2 text-sm text-ink-mute">JPG বা PNG, সর্বোচ্চ ৫ মেগাবাইট</p>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) setPhoto(URL.createObjectURL(f))
                  }}
                />
              </div>
            </div>
          </Group>

          <Group title="ব্যক্তিগত তথ্য">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="পূর্ণ নাম (বাংলায়)" required error={tried && !name}>
                <input value={name} onChange={(e) => setName(e.target.value)} className={input} />
              </Field>
              <Field label="Full name (English)">
                <input value={nameEn} onChange={(e) => setNameEn(e.target.value)} className={input} />
              </Field>
              <Field label="মোবাইল নম্বর" required error={tried && !phone}>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" className={input} />
              </Field>
              <Field label="ইমেইল">
                <input type="email" defaultValue="sabrina.yasmin@gmail.com" className={input} />
              </Field>
              <Field label="জেলা" required error={tried && !district}>
                <input value={district} onChange={(e) => setDistrict(e.target.value)} className={input} />
              </Field>
              <Field label="পেশা">
                <input value={profession} onChange={(e) => setProfession(e.target.value)} className={input} />
              </Field>
            </div>
          </Group>

          <Group title="সদস্যপদের ধরন">
            <div className="grid gap-3 sm:grid-cols-3">
              {TYPES.map((t) => {
                const on = type === t.value
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setType(t.value)}
                    className={`flex flex-col rounded-sm border p-4 text-left transition-colors duration-150 ${
                      on ? 'border-ink bg-ink text-paper' : 'border-ink/20 hover:border-ink'
                    }`}
                  >
                    <span className="font-serif text-lg font-bold">{t.value}</span>
                    <span className={`mt-1 text-sm ${on ? 'text-paper/75' : 'text-ink-soft'}`}>{t.note}</span>
                    <span className="mt-auto pt-3 font-semibold">{t.fee}</span>
                  </button>
                )
              })}
            </div>
          </Group>

          <Group title="কোন শাখার সাথে যুক্ত হতে চান?">
            <div className="flex flex-wrap gap-2">
              {BRANCHES.map((b) => (
                <Chip key={b} on={branch === b} onClick={() => setBranch(b)}>
                  {b}
                </Chip>
              ))}
            </div>
          </Group>

          <Group title="চলচ্চিত্রে আপনার আগ্রহ" hint="একাধিক বেছে নিতে পারেন।">
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((i) => (
                <Chip
                  key={i}
                  on={interests.includes(i)}
                  onClick={() => setInterests((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]))}
                >
                  {i}
                </Chip>
              ))}
            </div>
            <Field label="সংক্ষিপ্ত পরিচিতি" className="mt-6">
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className={`${input} resize-none`} />
            </Field>
          </Group>

          <div className="border-t border-ink pt-8">
            <label className="flex items-start gap-3">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 h-5 w-5 accent-[#121116]" />
              <span className="text-ink-soft">
                আমি জাতীয় চলচ্চিত্র সংঘের{' '}
                <button type="button" onClick={() => onNavigate?.('about', 'constitution')} className="font-semibold text-ink underline">
                  সংবিধান
                </button>{' '}
                মেনে চলতে সম্মত এবং আমার নাম, ছবি ও প্রাথমিক তথ্য সদস্য তালিকায় প্রকাশে সম্মতি দিচ্ছি।
              </span>
            </label>
            {tried && missing && (
              <p role="alert" className="mt-4 font-medium text-accent">
                তারকাচিহ্নিত ঘরগুলো পূরণ করুন এবং সম্মতি দিন।
              </p>
            )}
            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ink px-8 py-4 text-lg font-semibold text-paper transition-colors duration-150 hover:bg-accent sm:w-auto"
            >
              আবেদন জমা দিন <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Live preview of what they will receive */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <p className="font-serif text-xl font-bold">আপনার সদস্য কার্ড</p>
          <p className="mt-1 text-sm text-ink-soft">ফর্ম পূরণের সাথে সাথে কার্ডটি তৈরি হচ্ছে। অনুমোদনের পর এটি শেয়ার করতে পারবেন।</p>
          <div className="mt-5 bg-paper-deep p-5">
            <MemberCard member={draft} className="shadow-[0_20px_40px_-24px_rgba(18,17,22,0.5)]" />
          </div>
          <p className="mt-4 flex items-start gap-2 text-sm text-ink-mute">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" /> আপনার মোবাইল নম্বর ও ইমেইল কখনো প্রকাশ করা হবে না।
          </p>
        </aside>
      </form>
    </PageShell>
  )
}

const input =
  'w-full rounded-sm border border-ink/20 bg-paper px-3.5 py-2.5 text-ink placeholder:text-ink-mute transition-colors duration-150 focus:border-ink focus:outline-none'

function Group({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="font-serif text-2xl font-bold">{title}</legend>
      {hint && <p className="mt-1 text-ink-soft">{hint}</p>}
      <div className="mt-5">{children}</div>
    </fieldset>
  )
}

function Field({
  label,
  required,
  error,
  className = '',
  children,
}: {
  label: string
  required?: boolean
  error?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-semibold">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      <span className={`block ${error ? '[&>*]:border-accent' : ''}`}>{children}</span>
      {error && <span className="mt-1 block text-sm text-accent">এই ঘরটি পূরণ করা আবশ্যক</span>}
    </label>
  )
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 ${
        on ? 'bg-ink text-paper' : 'border border-ink/20 text-ink-soft hover:border-ink hover:text-ink'
      }`}
    >
      {on && <Check className="h-3.5 w-3.5" />}
      {children}
    </button>
  )
}

function Outcome({
  state,
  member,
  onViewCard,
  onReset,
  onNavigate,
}: {
  state: 'submitted' | 'approved'
  member: Member
  onViewCard?: () => void
  onReset?: () => void
  onNavigate?: Navigate
}) {
  const steps = ['আবেদন গৃহীত', 'শাখা কর্তৃক যাচাই', 'সদস্যপদ অনুমোদন', 'প্রোফাইল কার্ড তৈরি']
  const done = state === 'approved' ? 4 : 1
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-5 py-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-8">
      <div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={state}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl">
              {state === 'approved' ? `স্বাগতম, ${member.name}!` : 'আপনার আবেদন জমা হয়েছে'}
            </h1>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">
              {state === 'approved'
                ? `আপনার সদস্যপদ অনুমোদিত হয়েছে। সদস্য নম্বর ${bn(member.id)}। আপনার প্রোফাইল কার্ড তৈরি — এখনই শেয়ার করুন।`
                : `আবেদন নম্বর ${bn(member.id)}। ${member.district} ${member.branch} শাখা আপনার তথ্য যাচাই করছে। অনুমোদন হলে এসএমএস পাবেন।`}
            </p>
          </motion.div>
        </AnimatePresence>

        <ol className="mt-10 border-l-2 border-paper-edge">
          {steps.map((s, i) => {
            const complete = i < done
            const active = i === done && state === 'submitted'
            return (
              <li key={s} className="relative pb-6 pl-8 last:pb-0">
                <span
                  className={`absolute -left-[13px] top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                    complete ? 'border-ink bg-ink text-paper' : 'border-paper-edge bg-paper text-ink-mute'
                  }`}
                >
                  {complete ? <Check className="h-3.5 w-3.5" /> : active ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                </span>
                <span className={complete || active ? 'font-semibold text-ink' : 'text-ink-mute'}>{s}</span>
              </li>
            )
          })}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          {state === 'approved' ? (
            <button
              onClick={onViewCard}
              className="flex items-center gap-2 whitespace-nowrap rounded-full bg-ink px-6 py-3.5 font-semibold text-paper transition-colors duration-150 hover:bg-accent"
            >
              প্রোফাইল কার্ড দেখুন ও শেয়ার করুন <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => onNavigate?.('home')}
              className="whitespace-nowrap rounded-full bg-ink px-6 py-3.5 font-semibold text-paper transition-colors duration-150 hover:bg-accent"
            >
              প্রচ্ছদে ফিরে যান
            </button>
          )}
          <button
            onClick={onReset}
            className="whitespace-nowrap rounded-full border border-ink/25 px-6 py-3.5 font-semibold transition-colors duration-150 hover:bg-paper-deep"
          >
            নতুন আবেদন
          </button>
        </div>
      </div>

      <div className="bg-paper-deep p-5 sm:p-8">
        <div className={`transition-[filter,opacity] duration-300 ${state === 'approved' ? '' : 'opacity-60 grayscale'}`}>
          <MemberCard member={member} className="shadow-[0_24px_50px_-24px_rgba(18,17,22,0.45)]" />
        </div>
        {state === 'submitted' && <p className="mt-4 text-center text-sm text-ink-mute">অনুমোদনের পর কার্ডটি সক্রিয় হবে</p>}
      </div>
    </section>
  )
}

import React, { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Link2, Check, ArrowLeft, PartyPopper, MapPin, Briefcase, CalendarDays, BadgeCheck } from 'lucide-react'
import { toPng } from 'html-to-image'

import { PageShell } from '../shared/components/PageShell'
import { MemberCard } from '../shared/components/MemberCard'
import { FacebookIcon, WhatsappIcon, XIcon, LinkedinIcon } from '../shared/components/BrandIcons'
import { bn, type Navigate } from '../shared/site'
import { MEMBERS, findMember, type Member } from '../shared/members'

export const args = {
  memberId: '2025-0318',
  format: 'square',
  isNew: false,
}

export const argTypes = {
  memberId: { control: 'select', options: ['2024-0017', '2024-0042', '2025-0318', '2025-0251', '2024-0089', '2024-0003', '2025-0407', '2024-0126'] },
  format: { control: 'radio', options: ['square', 'story'] },
  isNew: { control: 'boolean' },
}

type Props = Partial<typeof args> & {
  applicant?: Member | null
  onNavigate?: Navigate
  onOpenMember?: (id: string) => void
}

export default function MemberProfile(props: Props) {
  const { memberId, format: initialFormat, isNew, applicant, onNavigate, onOpenMember } = { ...args, ...props }
  const member = applicant ?? findMember(memberId)
  const [format, setFormat] = useState<'square' | 'story'>(initialFormat === 'story' ? 'story' : 'square')
  const [copied, setCopied] = useState(false)
  const [saving, setSaving] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const url = `https://nff.org.bd/member/${member.id}`
  const text = `আমি জাতীয় চলচ্চিত্র সংঘের গর্বিত সদস্য — ${member.name}। আপনিও যুক্ত হোন!`
  const enc = encodeURIComponent
  const shares = [
    { label: 'ফেসবুক', Icon: FacebookIcon, href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { label: 'হোয়াটসঅ্যাপ', Icon: WhatsappIcon, href: `https://wa.me/?text=${enc(`${text} ${url}`)}` },
    { label: 'এক্স', Icon: XIcon, href: `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}` },
    { label: 'লিংকডইন', Icon: LinkedinIcon, href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
  ]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      /* clipboard may be blocked in a preview; still confirm */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const download = async () => {
    if (!cardRef.current) return
    setSaving(true)
    try {
      const width = cardRef.current.offsetWidth
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 1080 / width, cacheBust: true })
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = `NFF-member-${member.id}-${format}.png`
      a.click()
    } catch {
      /* image export unavailable */
    } finally {
      setSaving(false)
    }
  }

  return (
    <PageShell page="profile" onNavigate={onNavigate}>
      {isNew && (
        <div className="bg-ink text-paper">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-4 lg:px-8">
            <PartyPopper className="h-5 w-5 shrink-0" />
            <p>
              <span className="font-semibold">অভিনন্দন, {member.name}!</span> আপনার সদস্যপদ অনুমোদিত হয়েছে এবং আপনার প্রোফাইল কার্ড স্বয়ংক্রিয়ভাবে তৈরি হয়েছে।
            </p>
          </div>
        </div>
      )}

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-8 lg:px-8">
        <button
          onClick={() => onNavigate?.('members')}
          className="flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors duration-150 hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> সদস্য তালিকা
        </button>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14">
          {/* The card is the point of this page */}
          <div>
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm text-ink-soft">সোশ্যাল মিডিয়ার জন্য সদস্য কার্ড</p>
              <div className="flex rounded-full border border-ink/20 p-1">
                {(['square', 'story'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-150 ${
                      format === f ? 'bg-ink text-paper' : 'text-ink-soft hover:text-ink'
                    }`}
                  >
                    {f === 'square' ? 'পোস্ট (১:১)' : 'স্টোরি (৯:১৬)'}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-center rounded-sm bg-paper-deep p-4 sm:p-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${member.id}-${format}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  className={`w-full shadow-[0_24px_50px_-24px_rgba(18,17,22,0.45)] ${format === 'story' ? 'max-w-[340px]' : 'max-w-[560px]'}`}
                  ref={cardRef}
                >
                  <MemberCard member={member} format={format} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Share, then who this is */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm font-semibold text-accent">
              <BadgeCheck className="h-4 w-4" /> যাচাইকৃত সদস্য
            </div>
            <h1 className="mt-2 font-serif text-4xl font-bold leading-tight sm:text-5xl">{member.name}</h1>
            <p className="mt-1 text-lg text-ink-mute">{member.nameEn}</p>
            <p className="mt-4 text-lg font-medium">{member.role}</p>

            <h2 className="mt-9 font-serif text-xl font-bold">কার্ডটি শেয়ার করুন</h2>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {shares.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-2 rounded-sm border border-ink/15 py-4 text-sm font-medium transition-colors duration-150 hover:border-ink hover:bg-paper-deep"
                >
                  <Icon className="h-6 w-6" />
                  {label}
                </a>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <button
                onClick={download}
                disabled={saving}
                className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ink px-5 py-3 font-semibold text-paper transition-colors duration-150 hover:bg-accent disabled:opacity-70"
              >
                <Download className="h-4 w-4" /> {saving ? 'তৈরি হচ্ছে…' : 'ছবি ডাউনলোড (PNG)'}
              </button>
              <button
                onClick={copy}
                className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-ink/25 px-5 py-3 font-semibold transition-colors duration-150 hover:bg-paper-deep"
              >
                {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
                {copied ? 'লিংক কপি হয়েছে' : 'প্রোফাইল লিংক কপি'}
              </button>
            </div>

            <dl className="mt-10 divide-y divide-paper-edge border-t border-ink">
              {[
                { Icon: Briefcase, k: 'পেশা', v: member.profession },
                { Icon: MapPin, k: 'জেলা ও শাখা', v: `${member.district} · ${member.branch}` },
                { Icon: BadgeCheck, k: 'সদস্যপদ', v: `${member.type} · নং ${bn(member.id)}` },
                { Icon: CalendarDays, k: 'যোগদান', v: member.joined },
              ].map(({ Icon, k, v }) => (
                <div key={k} className="grid grid-cols-[8rem_1fr] gap-3 py-3.5 sm:grid-cols-[10rem_1fr]">
                  <dt className="flex items-center gap-2 text-ink-mute">
                    <Icon className="h-4 w-4 shrink-0" /> {k}
                  </dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 font-serif text-lg leading-relaxed text-ink-soft">{member.bio}</p>
          </div>
        </div>
      </section>

      {/* Other members */}
      <section className="border-t border-paper-edge">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">আরও সদস্য</h2>
            <button onClick={() => onNavigate?.('apply')} className="whitespace-nowrap font-semibold hover:text-accent">
              আপনিও সদস্য হোন →
            </button>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {MEMBERS.filter((m) => m.id !== member.id)
              .slice(0, 4)
              .map((m) => (
                <li key={m.id}>
                  <button onClick={() => onOpenMember?.(m.id)} className="group w-full text-left">
                    <MemberCard member={m} className="transition-transform duration-200 ease-out group-hover:-translate-y-1" />
                    <span className="mt-2 block truncate text-sm font-semibold">{m.name}</span>
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </PageShell>
  )
}

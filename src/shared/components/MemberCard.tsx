import React from 'react'
import { LOGO, bn } from '../site'
import type { Member } from '../members'

type Props = {
  member: Member
  /** square: Facebook / Instagram post (1:1). story: Facebook / Instagram / WhatsApp story (9:16). */
  format?: 'square' | 'story'
  className?: string
}

/**
 * The membership profile card, generated automatically once an application is approved.
 * Everything is sized in container units so the card renders identically at any size —
 * as a thumbnail on the site or exported at 1080px for social media.
 */
export function MemberCard({ member, format = 'square', className = '' }: Props) {
  if (format === 'story') return <StoryCard member={member} className={className} />
  return (
    <div className={`@container relative aspect-square w-full overflow-hidden bg-paper text-ink ${className}`}>
      <div className="flex h-full flex-col">
        {/* Identity */}
        <div className="flex items-center justify-between px-[6cqw] pt-[5.5cqw]">
          <div className="flex items-center gap-[2.2cqw]">
            <span className="relative block h-[10cqw] w-[10cqw] overflow-hidden">
              <img src={LOGO} alt="" className="absolute inset-0 h-full w-full -translate-y-[6%] scale-[1.9] object-cover" />
            </span>
            <span>
              <span className="block font-serif text-[4.4cqw] font-bold leading-tight">জাতীয় চলচ্চিত্র সংঘ</span>
              <span className="block text-[2cqw] font-semibold tracking-[0.2em] text-ink-mute">NATIONAL FILM FORUM</span>
            </span>
          </div>
          <span className="rounded-full border-[0.3cqw] border-ink px-[2.4cqw] py-[0.8cqw] text-[2.4cqw] font-semibold">{member.type}</span>
        </div>

        {/* Photo + name */}
        <div className="grid flex-1 grid-cols-[42%_1fr] items-center gap-[5cqw] px-[6cqw] py-[4cqw]">
          <div className="relative">
            <div className="absolute -bottom-[2cqw] -right-[2cqw] h-full w-full bg-ink" />
            <img src={member.photo} alt={member.name} className="relative aspect-[4/5] w-full border-[0.8cqw] border-paper object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-[2.8cqw] font-semibold text-accent">গর্বিত সদস্য</p>
            <p className="mt-[1cqw] font-serif text-[7.4cqw] font-bold leading-[1.2]">{member.name}</p>
            <p className="mt-[1.6cqw] text-[3cqw] leading-snug text-ink-soft">{member.profession}</p>
            <p className="mt-[0.4cqw] text-[3cqw] leading-snug text-ink-soft">{member.district} · {member.branch} শাখা</p>
          </div>
        </div>

        {/* Film-strip footer */}
        <div className="bg-ink text-paper">
          <div className="film-rule" />
          <div className="grid grid-cols-3 gap-[3cqw] px-[6cqw] pb-[4.5cqw] pt-[3cqw]">
            <Field label="সদস্য নম্বর" value={bn(member.id)} />
            <Field label="সদস্যপদ গ্রহণ" value={member.joined} />
            <Field label="যাচাই করুন" value="nff.org.bd" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[2.2cqw] text-paper/60">{label}</p>
      <p className="truncate font-serif text-[3.4cqw] font-bold">{value}</p>
    </div>
  )
}

function StoryCard({ member, className }: { member: Member; className: string }) {
  return (
    <div className={`@container relative aspect-[9/16] w-full overflow-hidden bg-paper text-ink ${className}`}>
      <div className="flex h-full flex-col">
        <div className="flex flex-col items-center px-[8cqw] pt-[9cqw] text-center">
          <span className="relative block h-[18cqw] w-[18cqw] overflow-hidden">
            <img src={LOGO} alt="" className="absolute inset-0 h-full w-full -translate-y-[6%] scale-[1.9] object-cover" />
          </span>
          <span className="mt-[1cqw] block font-serif text-[6.4cqw] font-bold leading-tight">জাতীয় চলচ্চিত্র সংঘ</span>
          <span className="block text-[2.8cqw] font-semibold tracking-[0.2em] text-ink-mute">NATIONAL FILM FORUM</span>
        </div>

        <div className="relative mx-auto mt-[8cqw] w-[66%]">
          <div className="absolute -bottom-[3cqw] -right-[3cqw] h-full w-full bg-ink" />
          <img src={member.photo} alt={member.name} className="relative aspect-[4/5] w-full border-[1.2cqw] border-paper object-cover" />
        </div>

        <div className="px-[8cqw] pt-[9cqw] text-center">
          <p className="text-[4cqw] font-semibold text-accent">গর্বিত সদস্য</p>
          <p className="mt-[1.4cqw] font-serif text-[10cqw] font-bold leading-[1.2]">{member.name}</p>
          <p className="mt-[2cqw] text-[4.2cqw] text-ink-soft">{member.profession}</p>
          <p className="text-[4.2cqw] text-ink-soft">{member.district} · {member.type}</p>
        </div>

        <div className="mt-auto bg-ink text-paper">
          <div className="film-rule" />
          <div className="flex items-end justify-between gap-[4cqw] px-[8cqw] pb-[8cqw] pt-[5cqw]">
            <div>
              <p className="text-[3.2cqw] text-paper/60">সদস্য নম্বর</p>
              <p className="font-serif text-[6cqw] font-bold">{bn(member.id)}</p>
            </div>
            <p className="text-right text-[3.4cqw] leading-snug text-paper/80">
              আপনিও সদস্য হোন
              <br />
              <span className="font-semibold text-paper">nff.org.bd</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

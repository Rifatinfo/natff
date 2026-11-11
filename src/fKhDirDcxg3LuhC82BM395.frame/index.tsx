import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, MapPin, CalendarDays, Play, Clock, Mail } from 'lucide-react'

import { PageShell } from '../shared/components/PageShell'
import { IMG, bn, type Navigate } from '../shared/site'
import { MEMBERS } from '../shared/members'

export const args = {
  headline: 'চলচ্চিত্র সবার, চলচ্চিত্রের জন্য আমরা সবাই',
  memberCount: 4826,
  festivalDaysLeft: 64,
  showNotice: true,
}

export const argTypes = {
  headline: { control: 'text' },
  memberCount: { control: 'number' },
  festivalDaysLeft: { control: 'number' },
  showNotice: { control: 'boolean' },
}

type Props = Partial<typeof args> & { onNavigate?: Navigate; onOpenMember?: (id: string) => void }

const EASE = [0.23, 1, 0.32, 1] as const

export default function Home(props: Props) {
  const { headline, memberCount, festivalDaysLeft, showNotice, onNavigate, onOpenMember } = { ...args, ...props }
  const reduce = useReducedMotion()
  const rise = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.28, ease: EASE, delay: 0.06 + i * 0.05 },
        }
  const [lead, ...rest] = EVENTS

  return (
    <PageShell page="home" onNavigate={onNavigate}>
      {showNotice && (
        <button
          onClick={() => onNavigate?.('activities', 'notice')}
          className="flex w-full items-center justify-center gap-2 bg-accent px-5 py-2.5 text-center text-sm text-paper transition-colors duration-150 hover:bg-accent-deep"
        >
          <span className="hidden h-2 w-2 shrink-0 rounded-full bg-paper sm:block" />
          <span>
            <span className="font-semibold">বিশেষ বিজ্ঞপ্তি:</span> জাতীয় চলচ্চিত্র উৎসব ২০২৭-এ চলচ্চিত্র জমা নেওয়া শুরু হয়েছে
          </span>
          <ArrowRight className="h-4 w-4 shrink-0" />
        </button>
      )}

      {/* ───────── Hero: full-bleed, the screening itself ───────── */}
      <section className="relative isolate overflow-hidden bg-ink text-paper">
        <motion.img
          src={IMG.heroWide}
          alt="গ্রামের খোলা মাঠে সন্ধ্যায় ভ্রাম্যমাণ চলচ্চিত্র প্রদর্শনী"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[60%_center]"
          initial={reduce ? false : { scale: 1 }}
          animate={reduce ? undefined : { scale: 1.08 }}
          transition={{ duration: 24, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        />
        <div className="absolute inset-0 -z-10 bg-ink/55" />
        <div className="absolute inset-y-0 left-0 -z-10 w-full bg-ink/35 lg:w-[62%]" />

        <div className="mx-auto flex min-h-[620px] max-w-7xl flex-col px-5 pt-14 sm:pt-20 lg:min-h-[700px] lg:px-8 lg:pt-24">
          <div className="grid flex-1 gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
            <div className="max-w-3xl pb-4">
              <motion.p {...rise(0)} className="flex items-center gap-2.5 text-sm font-medium text-paper/85 sm:text-base">
                <span className="relative flex h-2.5 w-2.5">
                  {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />}
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-bright" />
                </span>
                আজ সন্ধ্যায় প্রদর্শনী চলছে — কুষ্টিয়া, ভেড়ামারা
              </motion.p>
              <motion.h1
                {...rise(1)}
                className="mt-6 font-serif text-[2.6rem] font-bold leading-[1.2] text-paper sm:text-6xl lg:text-[4.4rem] lg:leading-[1.15]"
              >
                {headline}
              </motion.h1>
              <motion.p {...rise(2)} className="mt-6 max-w-xl text-lg leading-relaxed text-paper/85 sm:text-xl">
                গ্রামের মাঠ থেকে বিশ্ববিদ্যালয়ের মিলনায়তন — দেশের ৬৪ জেলায় চলচ্চিত্র দেখা, বোঝা ও নির্মাণের চর্চা ছড়িয়ে দিচ্ছে জাতীয় চলচ্চিত্র সংঘ।
              </motion.p>
              <motion.div {...rise(3)} className="mt-9 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate?.('apply')}
                  className="group flex items-center gap-2 whitespace-nowrap rounded-full bg-accent px-7 py-4 text-base font-semibold text-paper transition-[background-color,transform] duration-150 hover:bg-accent-deep active:scale-[0.98]"
                >
                  সদস্য হোন — বিনামূল্যে
                  <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </button>
                <button
                  onClick={() => onNavigate?.('publications', 'video')}
                  className="flex items-center gap-3 whitespace-nowrap rounded-full py-2 pl-2 pr-5 font-semibold text-paper transition-colors duration-150 hover:bg-paper/10"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/50">
                    <Play className="ml-0.5 h-4 w-4 fill-paper" />
                  </span>
                  আমাদের গল্প দেখুন
                </button>
              </motion.div>
            </div>

            {/* Next screening ticket */}
            <motion.button
              {...rise(4)}
              onClick={() => onNavigate?.('activities', lead.sub)}
              className="group mb-4 hidden w-full max-w-sm justify-self-end overflow-hidden rounded-md bg-paper text-left text-ink shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] sm:block lg:mb-10"
            >
              <div className="relative">
                <img src={IMG.filmHall} alt="" className="aspect-[16/9] w-full object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-paper">পরবর্তী প্রদর্শনী</span>
              </div>
              <div className="flex gap-4 p-5">
                <span className="shrink-0 border-r border-paper-edge pr-4 text-center">
                  <span className="block font-serif text-4xl font-bold leading-none">{lead.d}</span>
                  <span className="mt-1 block text-sm text-ink-mute">{lead.m}</span>
                </span>
                <span className="min-w-0">
                  <span className="block font-serif text-lg font-semibold leading-snug">{lead.title}</span>
                  <span className="mt-2 flex items-center gap-1.5 text-sm text-ink-mute">
                    <Clock className="h-3.5 w-3.5 shrink-0" /> {lead.time}
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-paper-edge px-5 py-3 text-sm font-semibold">
                বিনামূল্যে প্রবেশ · আসন সংরক্ষণ করুন
                <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </div>
            </motion.button>
          </div>

          {/* Reach, with members leading */}
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-paper/20 py-7 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:items-center">
            <button onClick={() => onNavigate?.('members')} className="col-span-2 flex items-center gap-4 text-left md:col-span-1">
              <span className="flex -space-x-3">
                {MEMBERS.slice(0, 5).map((m) => (
                  <img key={m.id} src={m.photo} alt={m.name} className="h-11 w-11 rounded-full border-2 border-ink object-cover" />
                ))}
              </span>
              <span>
                <span className="block font-serif text-3xl font-bold leading-none sm:text-4xl">{bn(memberCount.toLocaleString('en-IN'))}</span>
                <span className="mt-1 block text-sm text-paper/75">নিবন্ধিত সদস্য</span>
              </span>
            </button>
            {REACH.map((r) => (
              <div key={r.label}>
                <p className="font-serif text-2xl font-bold leading-none sm:text-3xl">{r.value}</p>
                <p className="mt-1.5 text-sm text-paper/75">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="film-rule" />

      {/* ───────── Upcoming: one lead event, the rest as a list ───────── */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl font-bold sm:text-[2.6rem]">আসন্ন আয়োজন</h2>
            <p className="mt-3 max-w-xl text-ink-soft">সব আয়োজন সাধারণের জন্য উন্মুক্ত। সদস্যরা আগাম আসন সংরক্ষণ করতে পারেন।</p>
          </div>
          <button onClick={() => onNavigate?.('activities')} className="flex shrink-0 items-center gap-1 whitespace-nowrap font-semibold text-ink hover:text-accent">
            সব কার্যক্রম <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
          <button onClick={() => onNavigate?.('activities', lead.sub)} className="group text-left">
            <div className="relative overflow-hidden rounded-md">
              <img
                src={IMG.hero}
                alt=""
                className="aspect-[16/10] w-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
              />
              <span className="absolute bottom-0 left-0 bg-paper px-5 py-3 text-center">
                <span className="block font-serif text-4xl font-bold leading-none">{lead.d}</span>
                <span className="mt-1 block text-sm text-ink-mute">{lead.m}</span>
              </span>
            </div>
            <p className="mt-5 text-sm font-semibold text-accent">{lead.tag}</p>
            <h3 className="mt-1 font-serif text-2xl font-bold leading-snug group-hover:underline sm:text-3xl">{lead.title}</h3>
            <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-ink-mute">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {lead.place}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {lead.time}</span>
            </p>
          </button>

          <ul className="border-t border-ink">
            {rest.map((e) => (
              <li key={e.title}>
                <button
                  onClick={() => onNavigate?.('activities', e.sub)}
                  className="group grid w-full grid-cols-[4.5rem_1fr] items-center gap-4 border-b border-paper-edge py-6 text-left transition-colors duration-150 hover:bg-paper-deep sm:px-3"
                >
                  <span className="text-center">
                    <span className="block font-serif text-4xl font-bold leading-none">{e.d}</span>
                    <span className="mt-1 block text-sm text-ink-mute">{e.m}</span>
                  </span>
                  <span className="min-w-0">
                    <span className="text-sm font-semibold text-accent">{e.tag}</span>
                    <span className="mt-1 block font-serif text-lg font-semibold leading-snug">{e.title}</span>
                    <span className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-mute">
                      <MapPin className="h-3.5 w-3.5 shrink-0" /> {e.place}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── What we do: bento of the work, screenings lead ───────── */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
            <h2 className="font-serif text-3xl font-bold leading-snug sm:text-[2.6rem]">সারা বছর, সারা দেশে</h2>
            <p className="max-w-lg text-lg leading-relaxed text-paper/75 lg:justify-self-end">
              প্রদর্শনী থেকে নির্মাণ, আলোচনা থেকে সম্মাননা — চলচ্চিত্রকে মানুষের কাছে নিয়ে যাওয়ার প্রতিটি কাজ।
            </p>
          </div>

          <div className="mt-10 grid auto-rows-[220px] gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[250px]">
            {WORK.map((w) => (
              <button
                key={w.sub}
                onClick={() => onNavigate?.('activities', w.sub)}
                className={`group relative overflow-hidden rounded-md text-left ${w.span}`}
              >
                <img
                  src={w.img}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-ink/45 transition-colors duration-200 group-hover:bg-ink/35" />
                <span className="absolute inset-x-0 bottom-0 bg-ink/70 p-5">
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-serif text-xl font-bold sm:text-2xl">{w.label}</span>
                    <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-150 group-hover:translate-x-1" />
                  </span>
                  <span className="mt-1 block text-sm text-paper/80">{w.line}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="mr-2 text-sm text-paper/60">আরও:</span>
            {MORE_WORK.map((m) => (
              <button
                key={m.sub}
                onClick={() => onNavigate?.('activities', m.sub)}
                className="whitespace-nowrap rounded-full border border-paper/30 px-4 py-2 text-sm font-medium text-paper transition-colors duration-150 hover:bg-paper hover:text-ink"
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Festival call for entries ───────── */}
      <section className="bg-accent text-paper">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16 lg:px-8">
          <div>
            <p className="font-semibold text-paper/85">চলচ্চিত্র জমা চলছে</p>
            <h2 className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl">জাতীয় চলচ্চিত্র উৎসব ২০২৭</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/90">
              নবীন ও স্বাধীন নির্মাতাদের জন্য দেশের সবচেয়ে বড় মঞ্চ। নির্বাচিত চলচ্চিত্র প্রদর্শিত হবে আট বিভাগে, সেরাদের জন্য থাকছে নির্মাণ অনুদান।
            </p>

            <div className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-6">
              <div>
                <p className="font-serif text-6xl font-bold leading-none sm:text-7xl">{bn(festivalDaysLeft)}</p>
                <p className="mt-2 text-paper/85">দিন বাকি · শেষ দিন ১৪ জানুয়ারি</p>
              </div>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-paper/95">
                {['পূর্ণদৈর্ঘ্য', 'স্বল্পদৈর্ঘ্য', 'প্রামাণ্যচিত্র', 'মোবাইল ফিল্ম'].map((c) => (
                  <li key={c} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-paper" /> {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate?.('activities', 'festival')}
                className="flex items-center gap-2 whitespace-nowrap rounded-full bg-paper px-7 py-4 font-semibold text-ink transition-colors duration-150 hover:bg-paper-deep"
              >
                চলচ্চিত্র জমা দিন <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => onNavigate?.('activities', 'notice')}
                className="whitespace-nowrap rounded-full border border-paper/50 px-7 py-4 font-semibold text-paper transition-colors duration-150 hover:bg-paper/10"
              >
                নিয়মাবলি পড়ুন
              </button>
            </div>
          </div>
          <img src={IMG.projector} alt="চলমান ৩৫ মিমি প্রজেক্টর" className="aspect-[4/5] w-full max-w-md justify-self-center rounded-md object-cover lg:justify-self-end" />
        </div>
      </section>

      {/* ───────── Nationwide network ───────── */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <h2 className="font-serif text-3xl font-bold leading-snug sm:text-[2.6rem]">দেশজুড়ে আমাদের শাখা</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
              আট বিভাগে ৬৪টি জেলা শাখা, ১২৮টি বিশ্ববিদ্যালয় ইউনিট ও শত শত ফিল্ম ক্লাব। আপনার কাছের শাখা খুঁজে নিন, বা নিজের প্রতিষ্ঠানে একটি ক্লাব শুরু করুন।
            </p>
            <img src={IMG.filmmakers} alt="ঢাকার রাস্তায় শুটিং করছেন বিশ্ববিদ্যালয়ের শিক্ষার্থীরা" className="mt-8 aspect-[4/3] w-full rounded-md object-cover" />
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate?.('clubs')}
                className="flex items-center gap-2 whitespace-nowrap rounded-full bg-ink px-6 py-3.5 font-semibold text-paper transition-colors duration-150 hover:bg-accent"
              >
                ক্লাব নিবন্ধন করুন <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => onNavigate?.('committee', 'divisional')}
                className="whitespace-nowrap rounded-full border border-ink/25 px-6 py-3.5 font-semibold text-ink transition-colors duration-150 hover:bg-paper-deep"
              >
                বিভাগীয় কমিটি
              </button>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 border-b border-ink pb-3 text-sm font-semibold text-ink-mute sm:gap-x-10">
              <span>বিভাগ</span>
              <span className="text-right">জেলা</span>
              <span className="text-right">বিশ্ববিদ্যালয়</span>
              <span className="text-right">ক্লাব</span>
            </div>
            <ul>
              {DIVISIONS.map((d) => (
                <li key={d.name}>
                  <button
                    onClick={() => onNavigate?.('committee', 'divisional')}
                    className="grid w-full grid-cols-[1fr_auto_auto_auto] items-center gap-x-4 border-b border-paper-edge py-4 text-left transition-colors duration-150 hover:bg-paper-deep sm:gap-x-10 sm:px-2"
                  >
                    <span className="min-w-0">
                      <span className="block font-serif text-lg font-semibold">{d.name}</span>
                      <span className="mt-1 block h-1 rounded-full bg-paper-deep">
                        <span className="block h-1 rounded-full bg-accent" style={{ width: `${(d.clubs / 96) * 100}%` }} />
                      </span>
                    </span>
                    <span className="w-10 text-right font-serif text-lg tabular-nums">{bn(d.districts)}</span>
                    <span className="w-16 text-right font-serif text-lg tabular-nums sm:w-24">{bn(d.units)}</span>
                    <span className="w-10 text-right font-serif text-lg font-bold tabular-nums">{bn(d.clubs)}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 pt-4 font-semibold sm:gap-x-10 sm:px-2">
              <span>মোট</span>
              <span className="w-10 text-right font-serif text-lg">৬৪</span>
              <span className="w-16 text-right font-serif text-lg sm:w-24">১২৮</span>
              <span className="w-10 text-right font-serif text-lg">৩৪৩</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Membership band ───────── */}
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <h2 className="font-serif text-3xl font-bold leading-snug sm:text-[2.6rem]">যে কেউ সদস্য হতে পারেন</h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-paper/80">
              অনলাইনে আবেদন করুন। অনুমোদনের পর আপনার ছবি ও নামসহ একটি সদস্য প্রোফাইল কার্ড তৈরি হবে — যা ফেসবুক, হোয়াটসঅ্যাপসহ যেকোনো মাধ্যমে শেয়ার করতে পারবেন।
            </p>
            <ol className="mt-8 space-y-4">
              {['অনলাইন ফর্মে তথ্য ও ছবি জমা দিন', 'সংশ্লিষ্ট শাখা আবেদন যাচাই ও অনুমোদন করে', 'আপনার প্রোফাইল কার্ড তৈরি হয়, শেয়ার করুন'].map((s, i) => (
                <li key={s} className="flex items-center gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-paper/40 font-serif font-bold">{bn(i + 1)}</span>
                  <span className="text-paper/90">{s}</span>
                </li>
              ))}
            </ol>
            <div className="mt-9 flex flex-wrap gap-3">
              <button onClick={() => onNavigate?.('apply')} className="whitespace-nowrap rounded-full bg-accent px-7 py-3.5 font-semibold text-paper transition-colors duration-150 hover:bg-accent-deep">
                আবেদন করুন
              </button>
              <button onClick={() => onNavigate?.('members')} className="whitespace-nowrap rounded-full border border-paper/40 px-6 py-3.5 font-semibold text-paper transition-colors duration-150 hover:bg-paper/10">
                সদস্য তালিকা দেখুন
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {MEMBERS.slice(0, 8).map((m) => (
              <button key={m.id} onClick={() => onOpenMember?.(m.id)} className="group text-left">
                <span className="block overflow-hidden rounded-sm">
                  <img src={m.photo} alt={m.name} className="aspect-[3/4] w-full object-cover grayscale transition-[filter] duration-200 group-hover:grayscale-0" />
                </span>
                <span className="mt-2 block truncate text-sm font-semibold">{m.name}</span>
                <span className="block truncate text-xs text-paper/60">{m.district}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Honours spotlight ───────── */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
          <img src={IMG.honours} alt="চলচ্চিত্র সম্মাননা ২০২৬ প্রদান অনুষ্ঠান" className="aspect-[4/3] w-full rounded-md object-cover" />
          <div>
            <p className="font-semibold text-accent">চলচ্চিত্র সম্মাননা ২০২৬</p>
            <blockquote className="mt-4 font-serif text-2xl font-semibold leading-relaxed sm:text-3xl">
              “গ্রামের মাঠে যে ছেলেটা প্রথম পর্দায় নিজের ভাষা শুনল, সে-ই আগামী দিনের নির্মাতা।”
            </blockquote>
            <p className="mt-5 text-ink-soft">
              আজীবন সম্মাননা গ্রহণের পর প্রবীণ চিত্রগ্রাহক আবদুল মতিন। এ বছর ছয়টি বিভাগে সম্মাননা পেয়েছেন ১৪ জন নির্মাতা, কলাকুশলী ও সংগঠক।
            </p>
            <button onClick={() => onNavigate?.('activities', 'honours')} className="mt-7 flex items-center gap-1.5 font-semibold text-ink hover:text-accent">
              সম্মাননাপ্রাপ্তদের তালিকা <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <div className="film-rule" />

      {/* ───────── Latest: one lead story, three short ───────── */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-bold sm:text-[2.6rem]">সাম্প্রতিক</h2>
          <button onClick={() => onNavigate?.('archive')} className="flex shrink-0 items-center gap-1 whitespace-nowrap font-semibold text-ink hover:text-accent">
            আর্কাইভ <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <button onClick={() => onNavigate?.('archive', 'news')} className="group text-left">
            <div className="overflow-hidden rounded-md">
              <img src={IMG.festival} alt="" className="aspect-[16/9] w-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]" />
            </div>
            <p className="mt-4 text-sm font-semibold text-accent">খবর</p>
            <h3 className="mt-1 font-serif text-2xl font-bold leading-snug group-hover:underline sm:text-3xl">
              সাত দিনের আঞ্চলিক চলচ্চিত্র উৎসবে ৪২টি চলচ্চিত্র, দর্শক ১২ হাজার
            </h3>
            <p className="mt-3 leading-relaxed text-ink-soft">
              খুলনার পুরোনো সিনেমা হলে ফিরে এলো দর্শকের ভিড়। উৎসবে বিভাগের তরুণ নির্মাতাদের ১৬টি স্বল্পদৈর্ঘ্য চলচ্চিত্র প্রথমবার প্রদর্শিত হয়।
            </p>
          </button>
          <div className="divide-y divide-paper-edge border-t border-ink lg:border-t-0">
            {LATEST.map((p) => (
              <button key={p.title} onClick={() => onNavigate?.('publications', p.sub)} className="group block w-full py-5 text-left lg:first:pt-0">
                <p className="text-sm font-semibold text-accent">{p.tag}</p>
                <h3 className="mt-1 font-serif text-xl font-semibold leading-snug group-hover:underline">{p.title}</h3>
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-mute">
                  <CalendarDays className="h-3.5 w-3.5" /> {p.by}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Support: donate + newsletter ───────── */}
      <section className="bg-paper-deep">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.3fr_1px_1fr] lg:gap-14 lg:px-8">
          <div>
            <h2 className="font-serif text-3xl font-bold leading-snug sm:text-[2.6rem]">একটি গ্রামে, একটি সন্ধ্যা</h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
              ৫,০০০ টাকায় পর্দা, প্রজেক্টর ও জেনারেটরসহ একটি গ্রামে পুরো একটি প্রদর্শনী হয়। আপনার অনুদান সরাসরি ভ্রাম্যমাণ প্রদর্শনী ও নবীন নির্মাতা অনুদানে যায়।
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {['৫০০', '১,০০০', '৫,০০০', '১০,০০০'].map((a, i) => (
                <button
                  key={a}
                  onClick={() => onNavigate?.('donate')}
                  className={`whitespace-nowrap rounded-full px-5 py-2.5 font-semibold transition-colors duration-150 ${
                    i === 2 ? 'bg-ink text-paper' : 'border border-ink/25 text-ink hover:bg-paper'
                  }`}
                >
                  ৳ {a}
                </button>
              ))}
            </div>
            <button
              onClick={() => onNavigate?.('donate')}
              className="mt-6 flex items-center gap-2 whitespace-nowrap rounded-full bg-accent px-7 py-3.5 font-semibold text-paper transition-colors duration-150 hover:bg-accent-deep"
            >
              ডোনেশন দিন <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="hidden bg-paper-edge lg:block" />

          <div className="border-t border-paper-edge pt-10 lg:border-t-0 lg:pt-0">
            <h3 className="font-serif text-2xl font-bold">প্রতি মাসে চলচ্চিত্রপত্র</h3>
            <p className="mt-3 leading-relaxed text-ink-soft">আসন্ন প্রদর্শনী, ওয়ার্কশপের আসন ও নতুন প্রবন্ধ — মাসে একটি ইমেইল, এর বেশি নয়।</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <label className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-ink/25 bg-paper px-4">
                <Mail className="h-4 w-4 shrink-0 text-ink-mute" />
                <input type="email" placeholder="আপনার ইমেইল" className="min-w-0 flex-1 bg-transparent py-3.5 text-ink outline-none placeholder:text-ink-mute" />
              </label>
              <button className="whitespace-nowrap rounded-full bg-ink px-6 py-3.5 font-semibold text-paper transition-colors duration-150 hover:bg-accent">
                সাবস্ক্রাইব
              </button>
            </form>
            <p className="mt-3 text-sm text-ink-mute">১২,৪০০ জন পাঠক ইতিমধ্যে যুক্ত।</p>
          </div>
        </div>
      </section>
    </PageShell>
  )
}

const EVENTS = [
  { d: '১৮', m: 'নভেম্বর', time: 'সন্ধ্যা ৬:৩০', title: 'ঋত্বিক ঘটক স্মরণে চলচ্চিত্র প্রদর্শনী: “মেঘে ঢাকা তারা”', place: 'কেন্দ্রীয় পাবলিক লাইব্রেরি মিলনায়তন, ঢাকা', tag: 'চলচ্চিত্র প্রদর্শনী', sub: 'screening' },
  { d: '২৪', m: 'নভেম্বর', time: 'সকাল ১০টা', title: 'মোবাইল ফোনে স্বল্পদৈর্ঘ্য চলচ্চিত্র নির্মাণ — তিন দিনের ওয়ার্কশপ', place: 'রাজশাহী বিশ্ববিদ্যালয়', tag: 'ওয়ার্কশপ', sub: 'workshop' },
  { d: '০৫', m: 'ডিসেম্বর', time: 'বিকেল ৩টা', title: 'বাংলাদেশের স্বাধীন চলচ্চিত্র: সংকট ও সম্ভাবনা', place: 'চট্টগ্রাম শিল্পকলা একাডেমি', tag: 'সেমিনার', sub: 'seminar' },
  { d: '১৪', m: 'জানুয়ারি', time: 'রাত ১২টা', title: 'জাতীয় চলচ্চিত্র উৎসব ২০২৭ — চলচ্চিত্র জমার শেষ দিন', place: 'অনলাইন', tag: 'চলচ্চিত্র উৎসব', sub: 'festival' },
]

const REACH = [
  { value: '৬৪', label: 'জেলা শাখা' },
  { value: '১২৮', label: 'বিশ্ববিদ্যালয় ইউনিট' },
  { value: '৩৪০+', label: 'প্রদর্শনী প্রতি বছর' },
]

const WORK = [
  { sub: 'screening', label: 'চলচ্চিত্র প্রদর্শনী', line: 'গ্রামের মাঠ থেকে শহরের মিলনায়তনে', img: IMG.filmHall, span: 'sm:col-span-2 lg:row-span-2' },
  { sub: 'workshop', label: 'ওয়ার্কশপ', line: 'মোবাইল ফোনে নির্মাণ থেকে চিত্রনাট্য', img: IMG.filmmakers, span: 'sm:col-span-2' },
  { sub: 'festival', label: 'চলচ্চিত্র উৎসব', line: 'জাতীয় ও আঞ্চলিক উৎসব', img: IMG.festival, span: '' },
  { sub: 'honours', label: 'চলচ্চিত্র সম্মাননা', line: 'যাঁরা চলচ্চিত্রকে এগিয়ে নিলেন', img: IMG.honours, span: '' },
]

const MORE_WORK = [
  { sub: 'seminar', label: 'সেমিনার' },
  { sub: 'dialogue', label: 'মত বিনিময়' },
  { sub: 'gathering', label: 'সমাবেশ' },
  { sub: 'notice', label: 'বিশেষ বিজ্ঞপ্তি' },
]

const DIVISIONS = [
  { name: 'ঢাকা', districts: 13, units: 38, clubs: 96 },
  { name: 'চট্টগ্রাম', districts: 11, units: 22, clubs: 58 },
  { name: 'খুলনা', districts: 10, units: 14, clubs: 44 },
  { name: 'রাজশাহী', districts: 8, units: 16, clubs: 41 },
  { name: 'রংপুর', districts: 8, units: 11, clubs: 31 },
  { name: 'সিলেট', districts: 4, units: 10, clubs: 27 },
  { name: 'ময়মনসিংহ', districts: 4, units: 9, clubs: 24 },
  { name: 'বরিশাল', districts: 6, units: 8, clubs: 22 },
]

const LATEST = [
  { tag: 'প্রবন্ধ', sub: 'essay', title: 'জহির রায়হানের “জীবন থেকে নেয়া”: রাজনৈতিক রূপকের পাঠ', by: 'ড. সেলিনা আক্তার' },
  { tag: 'সাময়িকী', sub: 'magazine', title: '“চলচ্চিত্রপত্র” — অক্টোবর ২০২৬ সংখ্যা প্রকাশিত', by: 'সম্পাদনা পর্ষদ' },
  { tag: 'গবেষণা', sub: 'research', title: 'জেলা শহরে সিনেমা হল বন্ধের এক দশক: একটি মাঠ সমীক্ষা', by: 'গবেষণা সেল' },
]

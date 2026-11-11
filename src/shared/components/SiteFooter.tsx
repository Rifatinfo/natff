import React from 'react'
import { MENU, type Navigate } from '../site'
import { Logo } from './Logo'
import { FacebookIcon, YoutubeIcon, XIcon } from './BrandIcons'

export function SiteFooter({ onNavigate }: { onNavigate?: Navigate }) {
  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="film-rule opacity-90" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_2fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-paper p-1">
              <Logo className="h-12 w-12" />
            </span>
            <div>
              <p className="font-serif text-xl font-bold">জাতীয় চলচ্চিত্র সংঘ</p>
              <p className="text-xs tracking-[0.18em] text-paper/70">NATIONAL FILM FORUM</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm leading-relaxed text-paper/75">
            চলচ্চিত্রকে মানুষের কাছে, মানুষকে চলচ্চিত্রের কাছে — সারা দেশের দর্শক, নির্মাতা ও গবেষকদের একটি উন্মুক্ত সংগঠন।
          </p>
          <div className="mt-6 flex gap-2">
            {[FacebookIcon, YoutubeIcon, XIcon].map((I, i) => (
              <a
                key={i}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 transition-colors duration-150 hover:bg-paper hover:text-ink"
              >
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
          {MENU.filter((m) => m.subs).map((m) => (
            <div key={m.key}>
              <button onClick={() => onNavigate?.(m.key)} className="font-serif font-semibold text-paper">
                {m.label}
              </button>
              <ul className="mt-3 space-y-1.5">
                {m.subs!.map((s) => (
                  <li key={s.key}>
                    <button
                      onClick={() => onNavigate?.(m.key, s.key)}
                      className="text-left text-sm text-paper/70 transition-colors duration-150 hover:text-paper"
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="font-serif font-semibold">আরও</p>
            <ul className="mt-3 space-y-1.5">
              {MENU.filter((m) => !m.subs).map((m) => (
                <li key={m.key}>
                  <button
                    onClick={() => onNavigate?.(m.key)}
                    className="text-left text-sm text-paper/70 transition-colors duration-150 hover:text-paper"
                  >
                    {m.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-paper/15">
        <p className="mx-auto max-w-7xl px-5 py-5 text-sm text-paper/60 lg:px-8">
          © ২০২৬ জাতীয় চলচ্চিত্র সংঘ। সর্বস্বত্ব সংরক্ষিত।
        </p>
      </div>
    </footer>
  )
}

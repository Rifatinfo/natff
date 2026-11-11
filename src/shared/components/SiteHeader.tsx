import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X, Search } from 'lucide-react'

import { MENU, type Navigate, type PageKey } from '../site'
import { Logo } from './Logo'

type Props = {
  active: PageKey
  activeSub?: string
  onNavigate?: Navigate
}

export function SiteHeader({ active, activeSub, onNavigate }: Props) {
  const [open, setOpen] = useState<PageKey | null>(null)
  const [mobile, setMobile] = useState(false)
  const go: Navigate = (p, s) => {
    setOpen(null)
    setMobile(false)
    onNavigate?.(p, s)
  }

  return (
    <header className="relative z-40 border-b border-paper-edge bg-paper">
      {/* Top band: identity and the two calls to action */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
        <button onClick={() => go('home')} className="flex min-w-0 items-center gap-3 text-left">
          <Logo className="h-14 w-14 shrink-0" />
          <span className="min-w-0">
            <span className="block truncate font-serif text-xl font-bold leading-tight text-ink sm:text-2xl">
              জাতীয় চলচ্চিত্র সংঘ
            </span>
            <span className="block truncate text-xs font-semibold tracking-[0.18em] text-ink-mute">
              NATIONAL FILM FORUM
            </span>
          </span>
        </button>

        <div className="flex shrink-0 items-center gap-2">
          <button
            aria-label="অনুসন্ধান"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-ink-soft hover:bg-paper-deep md:flex"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={() => go('apply')}
            className="hidden whitespace-nowrap rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors duration-150 hover:bg-accent sm:block"
          >
            সদস্য হোন
          </button>
          <button
            aria-label="মেনু"
            onClick={() => setMobile((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-paper-deep lg:hidden"
          >
            {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Desktop menu: all ten items in one row */}
      <nav className="hidden border-t border-paper-edge lg:block" onMouseLeave={() => setOpen(null)}>
        <ul className="mx-auto flex max-w-7xl items-stretch justify-between px-5 lg:px-8">
          {MENU.map((item) => {
            const isActive = active === item.key || (item.key === 'members' && (active === 'apply' || active === 'profile'))
            return (
              <li key={item.key} className="relative" onMouseEnter={() => setOpen(item.subs ? item.key : null)}>
                <button
                  onClick={() => (item.subs ? setOpen(open === item.key ? null : item.key) : go(item.key))}
                  className={`relative flex items-center gap-1 whitespace-nowrap px-2 py-3.5 text-[15px] font-medium transition-colors duration-150 xl:px-3 ${
                    isActive ? 'text-ink' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {item.label}
                  {item.subs && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
                  {isActive && <span className="absolute inset-x-2 bottom-0 h-[3px] bg-ink xl:inset-x-3" />}
                </button>

                <AnimatePresence>
                  {open === item.key && item.subs && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.98 }}
                      transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute left-0 top-full min-w-56 origin-top-left rounded-b-lg border border-t-0 border-paper-edge bg-paper py-2 shadow-[0_12px_30px_-12px_rgba(18,17,22,0.25)]"
                    >
                      {item.subs.map((s) => (
                        <button
                          key={s.key}
                          onClick={() => go(item.key, s.key)}
                          className={`block w-full whitespace-nowrap px-4 py-2 text-left text-[15px] transition-colors duration-150 hover:bg-paper-deep ${
                            active === item.key && activeSub === s.key ? 'font-semibold text-ink' : 'text-ink-soft'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Mobile menu: every item and sub-item, expanded */}
      <AnimatePresence>
        {mobile && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-x-0 top-full max-h-[75vh] overflow-y-auto border-b border-paper-edge bg-paper px-5 pb-6 lg:hidden"
          >
            {MENU.map((item) => (
              <div key={item.key} className="border-b border-paper-edge py-3">
                <button onClick={() => go(item.key)} className="font-serif text-lg font-semibold text-ink">
                  {item.label}
                </button>
                {item.subs && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.subs.map((s) => (
                      <button
                        key={s.key}
                        onClick={() => go(item.key, s.key)}
                        className="rounded-full border border-paper-edge px-3 py-1 text-sm text-ink-soft"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() => go('apply')}
              className="mt-4 w-full rounded-full bg-ink py-3 font-semibold text-paper"
            >
              সদস্য হোন
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

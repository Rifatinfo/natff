import React from 'react'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'
import { subsOf, type Navigate, type PageKey } from '../site'

type Props = {
  page: PageKey
  sub?: string
  onNavigate?: Navigate
  children: React.ReactNode
}

/** Header + content + footer: every page of the site sits in this. */
export function PageShell({ page, sub, onNavigate, children }: Props) {
  return (
    <div className="flex min-h-full flex-col bg-paper font-sans text-ink antialiased">
      <SiteHeader active={page} activeSub={sub} onNavigate={onNavigate} />
      <main className="flex-1">{children}</main>
      <SiteFooter onNavigate={onNavigate} />
    </div>
  )
}

/** Title block for an inner page, with the section's sub-menu as tabs beneath. */
export function PageIntro({
  page,
  sub,
  title,
  lede,
  onNavigate,
  aside,
}: {
  page: PageKey
  sub?: string
  title: string
  lede?: string
  onNavigate?: Navigate
  aside?: React.ReactNode
}) {
  const subs = subsOf(page)
  return (
    <section className="border-b border-paper-edge">
      <div className="mx-auto max-w-7xl px-5 pt-10 sm:pt-14 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl font-bold leading-tight text-ink sm:text-5xl">{title}</h1>
            {lede && <p className="mt-4 text-lg leading-relaxed text-ink-soft">{lede}</p>}
          </div>
          {aside}
        </div>
        {subs.length > 0 ? (
          <div className="-mx-5 mt-8 overflow-x-auto px-5 lg:mx-0 lg:px-0">
            <div className="flex min-w-max gap-1">
              {subs.map((s) => {
                const on = s.key === sub
                return (
                  <button
                    key={s.key}
                    onClick={() => onNavigate?.(page, s.key)}
                    className={`relative whitespace-nowrap px-4 pb-3.5 pt-2 text-[15px] transition-colors duration-150 ${
                      on ? 'font-semibold text-ink' : 'text-ink-soft hover:text-ink'
                    }`}
                  >
                    {s.label}
                    {on && <span className="absolute inset-x-3 bottom-0 h-[3px] bg-ink" />}
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="h-10" />
        )}
      </div>
    </section>
  )
}

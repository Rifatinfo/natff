import React from 'react'
import { LOGO } from '../site'

/** The supplied logo, cropped to its mark. Its cream ground is the site's ground, so it sits seamlessly. */
export function Logo({ className = '', full = false }: { className?: string; full?: boolean }) {
  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <img
        src={LOGO}
        alt="জাতীয় চলচ্চিত্র সংঘ — লোগো"
        className={`absolute inset-0 h-full w-full object-cover ${full ? 'scale-[1.45]' : 'scale-[1.9] -translate-y-[6%]'}`}
      />
    </span>
  )
}

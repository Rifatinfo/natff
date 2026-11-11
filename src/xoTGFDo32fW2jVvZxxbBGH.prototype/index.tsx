import React, { useEffect, useRef, useState } from 'react'

import Home from '../fKhDirDcxg3LuhC82BM395.frame'
import About from '../7DK3ScaVwJ6xrBLBghgcGA.frame'
import Committee from '../pVtDpn3MAe1jasewnPtcaY.frame'
import Activities from '../oMiuWmVgDLE2Fc4z7YmNy1.frame'
import Publications from '../qP6MgdNYAE4mSjKBAuGPFt.frame'
import Members from '../3FYaLTsZepbgVrdzHTFAQn.frame'
import Apply from '../1yNFG4RereXZTztiZ2UAPx.frame'
import Profile from '../wGuxooRwenL113Dbh6w82a.frame'
import Clubs from '../8rBAg7yxPsBzRw8rnaBjkY.frame'
import Archive from '../txpEm89v29gqU4BNYx64DN.frame'
import Contact from '../8abbuRrY6BTdhqXnTY7F8q.frame'
import Donate from '../pd3Xz5nczDXzh4WaWrFuk6.frame'

import type { PageKey } from '../shared/site'
import type { Member } from '../shared/members'

export const viewport = 'web'

export const folders = [
  { id: 'main', name: 'প্রধান পাতা', frames: ['fKhDirDcxg3LuhC82BM395', '7DK3ScaVwJ6xrBLBghgcGA', 'pVtDpn3MAe1jasewnPtcaY', 'oMiuWmVgDLE2Fc4z7YmNy1', 'qP6MgdNYAE4mSjKBAuGPFt'] },
  { id: 'membership', name: 'সদস্যপদ', frames: ['3FYaLTsZepbgVrdzHTFAQn', '1yNFG4RereXZTztiZ2UAPx', 'wGuxooRwenL113Dbh6w82a'] },
  { id: 'more', name: 'অন্যান্য', frames: ['8rBAg7yxPsBzRw8rnaBjkY', 'txpEm89v29gqU4BNYx64DN', '8abbuRrY6BTdhqXnTY7F8q', 'pd3Xz5nczDXzh4WaWrFuk6'] },
]

const FRAME_TO_PAGE: Record<string, PageKey> = {
  fKhDirDcxg3LuhC82BM395: 'home',
  '7DK3ScaVwJ6xrBLBghgcGA': 'about',
  pVtDpn3MAe1jasewnPtcaY: 'committee',
  oMiuWmVgDLE2Fc4z7YmNy1: 'activities',
  qP6MgdNYAE4mSjKBAuGPFt: 'publications',
  '3FYaLTsZepbgVrdzHTFAQn': 'members',
  '1yNFG4RereXZTztiZ2UAPx': 'apply',
  wGuxooRwenL113Dbh6w82a: 'profile',
  '8rBAg7yxPsBzRw8rnaBjkY': 'clubs',
  txpEm89v29gqU4BNYx64DN: 'archive',
  '8abbuRrY6BTdhqXnTY7F8q': 'contact',
  pd3Xz5nczDXzh4WaWrFuk6: 'donate',
}

const FIRST_SUB: Partial<Record<PageKey, string>> = {
  about: 'goals',
  committee: 'national',
  activities: 'workshop',
  publications: 'magazine',
  archive: 'news',
}

type Props = { start?: string }

export default function NationalFilmForum({ start }: Props) {
  const [page, setPage] = useState<PageKey>(() => (start && FRAME_TO_PAGE[start]) || 'home')
  const [sub, setSub] = useState<string | undefined>(() => FIRST_SUB[(start && FRAME_TO_PAGE[start]) || 'home'])
  const [memberId, setMemberId] = useState('2025-0318')
  const [applicant, setApplicant] = useState<Member | null>(null)
  const [applyState, setApplyState] = useState<'default' | 'submitted' | 'approved'>('default')
  const top = useRef<HTMLDivElement>(null)

  const navigate = (p: PageKey, s?: string) => {
    setPage(p)
    setSub(s ?? FIRST_SUB[p])
  }
  useEffect(() => {
    top.current?.scrollIntoView({ block: 'start' })
  }, [page, sub])

  const openMember = (id: string) => {
    setMemberId(id)
    setApplicant(null)
    setPage('profile')
  }

  const common = { onNavigate: navigate }

  const screen = (() => {
    switch (page) {
      case 'about':
        return <About {...common} section={sub as 'goals'} />
      case 'committee':
        return <Committee {...common} tier={sub as 'national'} onOpenMember={openMember} />
      case 'activities':
        return <Activities {...common} category={sub as 'workshop'} />
      case 'publications':
        return <Publications {...common} category={sub as 'magazine'} />
      case 'members':
        return <Members {...common} onOpenMember={openMember} />
      case 'apply':
        return (
          <Apply
            {...common}
            state={applyState}
            onSubmit={(m) => {
              setApplicant(m)
              setApplyState('submitted')
              setTimeout(() => setApplyState('approved'), 2200)
            }}
            onViewCard={() => {
              setPage('profile')
            }}
            onReset={() => {
              setApplicant(null)
              setApplyState('default')
            }}
          />
        )
      case 'profile':
        return <Profile {...common} memberId={memberId} applicant={applicant} isNew={!!applicant} onOpenMember={openMember} />
      case 'clubs':
        return <Clubs {...common} />
      case 'archive':
        return <Archive {...common} category={sub as 'news'} />
      case 'contact':
        return <Contact {...common} />
      case 'donate':
        return <Donate {...common} />
      default:
        return <Home {...common} onOpenMember={openMember} />
    }
  })()

  return (
    <div ref={top} className="min-h-full bg-paper">
      {screen}
    </div>
  )
}

export type PageKey =
  | 'home'
  | 'about'
  | 'committee'
  | 'activities'
  | 'publications'
  | 'members'
  | 'apply'
  | 'profile'
  | 'clubs'
  | 'archive'
  | 'contact'
  | 'donate'

export type Navigate = (page: PageKey, sub?: string) => void

export type MenuItem = {
  key: PageKey
  label: string
  subs?: { key: string; label: string }[]
}

/** The full menu, exactly as specified — every item and sub-item. */
export const MENU: MenuItem[] = [
  { key: 'home', label: 'প্রচ্ছদ' },
  {
    key: 'about',
    label: 'আমাদের কথা',
    subs: [
      { key: 'goals', label: 'লক্ষ্য ও উদ্দেশ্য' },
      { key: 'constitution', label: 'সংবিধান' },
      { key: 'advisory', label: 'উপদেষ্টা পর্ষদ' },
    ],
  },
  {
    key: 'committee',
    label: 'কার্যকরী পর্ষদ',
    subs: [
      { key: 'national', label: 'জাতীয়' },
      { key: 'divisional', label: 'বিভাগীয়' },
      { key: 'district', label: 'জেলা' },
      { key: 'university', label: 'বিশ্ববিদ্যালয়' },
      { key: 'special', label: 'বিশেষ শাখা' },
    ],
  },
  {
    key: 'activities',
    label: 'কার্যক্রম',
    subs: [
      { key: 'workshop', label: 'ওয়ার্কশপ' },
      { key: 'seminar', label: 'সেমিনার' },
      { key: 'screening', label: 'চলচ্চিত্র প্রদর্শনী' },
      { key: 'festival', label: 'চলচ্চিত্র উৎসব' },
      { key: 'dialogue', label: 'মত বিনিময়' },
      { key: 'honours', label: 'চলচ্চিত্র সম্মাননা' },
      { key: 'gathering', label: 'সমাবেশ' },
      { key: 'notice', label: 'বিশেষ বিজ্ঞপ্তি' },
    ],
  },
  {
    key: 'publications',
    label: 'প্রকাশনা',
    subs: [
      { key: 'magazine', label: 'সাময়িকী' },
      { key: 'vlog', label: 'ভ্লগ' },
      { key: 'essay', label: 'প্রবন্ধ/নিবন্ধ' },
      { key: 'research', label: 'গবেষণা' },
      { key: 'video', label: 'ভিডিও' },
    ],
  },
  { key: 'members', label: 'সদস্য' },
  { key: 'clubs', label: 'ক্লাব/সোসাইটি' },
  {
    key: 'archive',
    label: 'আর্কাইভ',
    subs: [
      { key: 'news', label: 'খবর' },
      { key: 'events', label: 'ইভেন্ট' },
      { key: 'photos', label: 'ফটো' },
      { key: 'videos', label: 'ভিডিও' },
      { key: 'opinions', label: 'মতামত' },
      { key: 'notices', label: 'বিজ্ঞপ্তি' },
    ],
  },
  { key: 'contact', label: 'যোগাযোগ' },
  { key: 'donate', label: 'ডোনেশন' },
]

export const subsOf = (key: PageKey) => MENU.find((m) => m.key === key)?.subs ?? []

export const LOGO =
  'https://cdn.magicpatterns.com/uploads/fdB4XQDG192go3PkQ4E2vM/WhatsApp_Image_2026-11-10_at_6.03.59_PM.jpg'

export const IMG = {
  hero: 'https://cdn.magicpatterns.com/patterns/generated-images/cf29dfce-6a17-4f98-815e-86718d27b105.jpg',
  workshop: 'https://cdn.magicpatterns.com/patterns/generated-images/0e8dd3bd-e5c7-4b87-ad06-ee74fd64c880.jpg',
  festival: 'https://cdn.magicpatterns.com/patterns/generated-images/5912dfd6-7aec-4213-a5ee-c28684e0f371.jpg',
  seminar: 'https://cdn.magicpatterns.com/patterns/generated-images/7d68e5ed-7e32-4466-8e9e-d511b787a2be.jpg',
  archive: 'https://cdn.magicpatterns.com/patterns/generated-images/1497dd11-4cb2-4f8c-8584-497d45657f6d.jpg',
  applicant: 'https://cdn.magicpatterns.com/patterns/generated-images/534f7ecb-2194-43b3-baa7-3686cab08099.jpg',
  clubs: 'https://cdn.magicpatterns.com/patterns/generated-images/b96680bf-0ced-4859-b99c-5c6c43222b63.jpg',
  heroWide: 'https://cdn.magicpatterns.com/patterns/generated-images/a7c6c4f5-f34e-44eb-8de4-71e909bfebcf.jpg',
  projector: 'https://cdn.magicpatterns.com/patterns/generated-images/e477cfc6-7900-464d-a68f-116cf8c7b9b8.jpg',
  filmmakers: 'https://cdn.magicpatterns.com/patterns/generated-images/e64aca65-e9a7-46a4-ad73-358495ac3580.jpg',
  honours: 'https://cdn.magicpatterns.com/patterns/generated-images/909dea13-05ae-41f8-8a1b-248700894d51.jpg',
  filmHall: 'https://cdn.magicpatterns.com/patterns/generated-images/53c83fef-c25a-45ad-8082-7404254e1d65.jpg',
}

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
/** Western digits → Bangla digits */
export const bn = (v: string | number) => String(v).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)])

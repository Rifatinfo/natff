export type Member = {
  id: string
  name: string
  nameEn: string
  photo: string
  role: string
  type: 'আজীবন সদস্য' | 'সাধারণ সদস্য' | 'ছাত্র সদস্য'
  district: string
  branch: string
  profession: string
  joined: string
  bio: string
}

export const MEMBERS: Member[] = [
  {
    id: '2024-0017',
    name: 'আবদুল্লাহ আল মামুন',
    nameEn: 'Abdullah Al Mamun',
    photo: 'https://cdn.magicpatterns.com/patterns/generated-images/2ece7e6b-94ef-4d69-9d05-bf5c0352b5a0.jpg',
    role: 'সভাপতি, জাতীয় পর্ষদ',
    type: 'আজীবন সদস্য',
    district: 'ঢাকা',
    branch: 'জাতীয়',
    profession: 'চলচ্চিত্র নির্মাতা',
    joined: 'জানুয়ারি ২০২৪',
    bio: 'চার দশক ধরে প্রামাণ্যচিত্র নির্মাণ ও চলচ্চিত্র সংসদ আন্দোলনের সাথে যুক্ত।',
  },
  {
    id: '2024-0042',
    name: 'নাসরিন সুলতানা',
    nameEn: 'Nasrin Sultana',
    photo: 'https://cdn.magicpatterns.com/patterns/generated-images/69334162-9a47-44a8-bbcd-3cf264ed1e00.jpg',
    role: 'সাধারণ সম্পাদক, জাতীয় পর্ষদ',
    type: 'আজীবন সদস্য',
    district: 'রাজশাহী',
    branch: 'জাতীয়',
    profession: 'চিত্রনাট্যকার',
    joined: 'ফেব্রুয়ারি ২০২৪',
    bio: 'নারী নির্মাতাদের জন্য চিত্রনাট্য কর্মশালার আয়োজক ও পরামর্শক।',
  },
  {
    id: '2025-0318',
    name: 'তানভীর হাসান',
    nameEn: 'Tanvir Hasan',
    photo: 'https://cdn.magicpatterns.com/patterns/generated-images/270eebae-049f-4a38-82a1-beb9032de0f3.jpg',
    role: 'আহ্বায়ক, ঢাকা বিশ্ববিদ্যালয় শাখা',
    type: 'ছাত্র সদস্য',
    district: 'ঢাকা',
    branch: 'বিশ্ববিদ্যালয়',
    profession: 'শিক্ষার্থী, গণমাধ্যম অধ্যয়ন',
    joined: 'মার্চ ২০২৫',
    bio: 'স্বল্পদৈর্ঘ্য চলচ্চিত্র নির্মাতা; ক্যাম্পাসে সাপ্তাহিক চলচ্চিত্র প্রদর্শনীর উদ্যোক্তা।',
  },
  {
    id: '2025-0251',
    name: 'ফারহানা ইসলাম',
    nameEn: 'Farhana Islam',
    photo: 'https://cdn.magicpatterns.com/patterns/generated-images/438a355a-1580-4f82-9c11-9a0c53418817.jpg',
    role: 'সাংস্কৃতিক সম্পাদক, চট্টগ্রাম বিভাগ',
    type: 'সাধারণ সদস্য',
    district: 'চট্টগ্রাম',
    branch: 'বিভাগীয়',
    profession: 'অভিনয়শিল্পী',
    joined: 'মে ২০২৫',
    bio: 'মঞ্চ ও চলচ্চিত্রে সমানভাবে সক্রিয়; তরুণদের অভিনয় প্রশিক্ষণ দেন।',
  },
  {
    id: '2024-0089',
    name: 'রাশেদ করিম',
    nameEn: 'Rashed Karim',
    photo: 'https://cdn.magicpatterns.com/patterns/generated-images/981fc5ac-5259-47cf-8789-05a7cabfeff1.jpg',
    role: 'সদস্য, জাতীয় পর্ষদ',
    type: 'আজীবন সদস্য',
    district: 'খুলনা',
    branch: 'জাতীয়',
    profession: 'চলচ্চিত্র পরিচালক',
    joined: 'জুন ২০২৪',
    bio: 'তিনটি পূর্ণদৈর্ঘ্য কাহিনিচিত্রের পরিচালক; আন্তর্জাতিক উৎসবে পুরস্কৃত।',
  },
  {
    id: '2024-0003',
    name: 'সুফিয়া বেগম',
    nameEn: 'Sufia Begum',
    photo: 'https://cdn.magicpatterns.com/patterns/generated-images/1d788c08-ee4a-4f11-8f3d-8b742ec44bee.jpg',
    role: 'উপদেষ্টা',
    type: 'আজীবন সদস্য',
    district: 'বরিশাল',
    branch: 'উপদেষ্টা পর্ষদ',
    profession: 'চলচ্চিত্র গবেষক',
    joined: 'জানুয়ারি ২০২৪',
    bio: 'বাংলা চলচ্চিত্রের ইতিহাস নিয়ে ছয়টি গ্রন্থের রচয়িতা।',
  },
  {
    id: '2025-0407',
    name: 'মেহেদী হাসান রনি',
    nameEn: 'Mehedi Hasan Rony',
    photo: 'https://cdn.magicpatterns.com/patterns/generated-images/4397af49-40f4-480c-8667-637fcc9f24a0.jpg',
    role: 'সদস্য, সিলেট জেলা শাখা',
    type: 'সাধারণ সদস্য',
    district: 'সিলেট',
    branch: 'জেলা',
    profession: 'চিত্রগ্রাহক',
    joined: 'আগস্ট ২০২৫',
    bio: 'চা-বাগানের শ্রমজীবী মানুষের জীবন নিয়ে আলোকচিত্র ও প্রামাণ্যচিত্র নির্মাণ করছেন।',
  },
  {
    id: '2024-0126',
    name: 'ড. সেলিনা আক্তার',
    nameEn: 'Dr. Selina Akter',
    photo: 'https://cdn.magicpatterns.com/patterns/generated-images/eb88babc-a030-4f64-9838-4d69be73f4b8.jpg',
    role: 'গবেষণা সম্পাদক, জাতীয় পর্ষদ',
    type: 'আজীবন সদস্য',
    district: 'ময়মনসিংহ',
    branch: 'জাতীয়',
    profession: 'চলচ্চিত্র সমালোচক ও শিক্ষক',
    joined: 'সেপ্টেম্বর ২০২৪',
    bio: 'বিশ্ববিদ্যালয়ে চলচ্চিত্র তত্ত্ব পড়ান; নিয়মিত সমালোচনা লেখেন।',
  },
]

export const findMember = (id?: string) => MEMBERS.find((m) => m.id === id) ?? MEMBERS[2]

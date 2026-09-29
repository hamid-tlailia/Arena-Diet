// ===== Badges / achievements =====

export const BADGES = [
  {
    id: 'firstFast',
    icon: 'Rocket',
    name: { ar: 'الانطلاقة', en: 'Liftoff' },
    desc: { ar: 'أكملت أول صيام كامل', en: 'Completed your first full fast' },
  },
  {
    id: 'streak3',
    icon: 'Flame',
    name: { ar: 'شرارة الالتزام', en: 'Commitment Spark' },
    desc: { ar: '٣ أيام متتالية من النشاط', en: '3 consecutive active days' },
  },
  {
    id: 'streak7',
    icon: 'Trophy',
    name: { ar: 'أسبوع ذهبي', en: 'Golden Week' },
    desc: { ar: '٧ أيام متتالية من النشاط', en: '7 consecutive active days' },
  },
  {
    id: 'explorer',
    icon: 'Compass',
    name: { ar: 'المستكشف', en: 'The Explorer' },
    desc: { ar: 'اطّلعت على الأنظمة الأربعة كلها', en: 'Explored all four diets' },
  },
  {
    id: 'earlyBird',
    icon: 'Sun',
    name: { ar: 'طائر الفجر', en: 'Early Bird' },
    desc: { ar: 'فتحت التطبيق قبل السابعة صباحًا', en: 'Opened the app before 7 AM' },
  },
  {
    id: 'nightOwl',
    icon: 'Moon',
    name: { ar: 'ساهر مثابر', en: 'Night Owl' },
    desc: { ar: 'تدرّبت على الالتزام بعد منتصف الليل', en: 'Stayed committed past midnight' },
  },
  {
    id: 'warrior',
    icon: 'Crown',
    name: { ar: 'محارب العشرين', en: '20h Warrior' },
    desc: { ar: 'أكملت صيام ٢٠ ساعة أو أكثر', en: 'Completed a 20+ hour fast' },
  },
  {
    id: 'renewal',
    icon: 'Gem',
    name: { ar: 'جوهرة التجدد', en: 'Renewal Gem' },
    desc: { ar: 'وصلت إلى مرحلة الالتهام الذاتي', en: 'Reached the autophagy stage' },
  },
]

export const badgeById = (id) => BADGES.find((b) => b.id === id)

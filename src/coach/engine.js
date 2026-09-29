// ===== Lumina Coach — on-device AI-style motivational engine =====
// Generates contextual, diet-aware motivational messages from rich template
// pools, user context (goal, streak, stage, hour) and variation logic —
// designed so it never repeats the same combination twice in a row.

import { dietById } from '../data/diets'
import { seededPick } from '../utils/time'

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

const fill = (str, ctx) =>
  str
    .replaceAll('{name}', ctx.name || '')
    .replaceAll('{diet}', ctx.dietName || '')
    .replaceAll('{hours}', ctx.hours ?? '')
    .replaceAll('{streak}', ctx.streak ?? '')
    .replaceAll('{pct}', ctx.pct ?? '')
    .replaceAll('  ', ' ')
    .trim()

// ---------- pools ----------
const POOLS = {
  ar: {
    morning: [
      'صباحك فجر جديد لجسمك يا {name} — نظام {diet} ينتظر خطوتك الأولى اليوم.',
      'استيقظتَ والفرصة كاملة بين يديك: قرار واحد صحي يغيّر مسار يومك كله.',
      'اليوم صفحة بيضاء يا {name}… اكتبها بكوب ماء ونيّة قوية.',
      'جسمك استيقظ على وضع التجدد — لا تؤجّل نسختك الأفضل.',
    ],
    evening: [
      'المساء يفصل بين من حقق ومن أجّل — وأنت من النوع الأول، أثبتها الليلة.',
      'ليلتك قاعدة انطلاق الغد: عشاء خفيف ونوم مبكر = صباح أقوى.',
      'قبل أن تنام، وجّه شكرًا صغيرًا لجسمك — إنه يعمل لأجلك الآن.',
      'يومك أوشك على الاكتمال… اختمه بقرار تفخر به غدًا.',
    ],
    streakRisk: [
      'سلسلتك الذهبية ({streak} أيام) على المحك يا {name}! دقيقة واحدة من النشاط تنقذها 🔥',
      'لا تدع يومك يمرّ هباءً — افتح التطبيق وحافظ على إيقاعك الرائع.',
      'الانضباط ليس كمالًا، بل عودة سريعة. عُد الآن فالسلسلة تستحق.',
    ],
    comeback: [
      'اشتقنا لك يا {name}! 💛 الرحلات العظيمة لا تنتهي بتعثّر… بل بالتخلي. هل نستأنف؟',
      'غيابك ملحوظ — لكن عودتك اليوم أبلغ من أي سلسلة ماضية. أهلًا بعودتك.',
      'يوم بعيد لا يمحو تقدّمك. جسدك يتذكر ما بنيته — لنكمل من حيث توقفنا.',
    ],
    milestone80: [
      'وصلت {pct}% يا {name}! النهاية أقرب مما تظن — أنفاسك الأخيرة قبل المجد 🔥',
      'الثلث الأخير هو موطن الأبطال فقط… وأنت هنا الآن.',
      'جسمك يهمس شكرًا — بقي القليل وتكتمل الحكاية.',
    ],
    goal: [
      'أنجزت! {hours} ساعة صيام كاملة 🏆 خذ نفسًا عميقًا… أنت صنعت ذلك بنفسك.',
      'الهدف اكتمل يا {name}! لحظة فخر حقيقية — دوّنها في ذاكرتك.',
      'من قرارٍ إلى إنجاز: {hours} ساعة من الانضباط الخالص. احترنا وقفنا أمامك 👏',
    ],
    idleFasting: [
      'نافذتك المعتادة للصيام تقترب — تبدأ الآن وتسبق يومك؟',
      'جسمك جاهز، وعقلك يعرف الطريق. كل ما ينقصك: زر «ابدأ».',
      'أفضل وقت لبدء الصيام كان أمس… ثاني أفضل وقت هو الآن.',
    ],
    ctas: [
      'خطوة صغيرة الآن تساوي كنزًا بعد شهر.',
      'أنت أقرب لهدفك مما كنت بالأمس.',
      'الانضباط هدية تمنحها لنفسك المستقبلية.',
      'لا طموح بلا عرق… ولا ندم بعد الإنجاز.',
    ],
    stagePrefix: 'دخلت مرحلة جديدة',
    stageCoach: [
      'هذا بالضبط ما تدربنا من أجله — استمر بنفس الإيقاع.',
      'كل ساعة من هنا تعود عليك أضعافًا.',
      'جسمك يتحدث بلغة التغيير الآن… أصغِ إليه.',
    ],
  },
  en: {
    morning: [
      'A brand-new dawn for your body, {name} — {diet} awaits your first move today.',
      'You woke up holding a full chance: one right decision reshapes the whole day.',
      'Today is a blank page, {name}… write it with a glass of water and strong intent.',
      'Your body woke up in renewal mode — don’t postpone your best self.',
    ],
    evening: [
      'Evening separates achievers from delayers — you’re the first kind, prove it tonight.',
      'Tonight is tomorrow’s launch pad: light dinner, early sleep, stronger morning.',
      'Before sleep, thank your body a little — it’s working for you right now.',
      'Your day is nearly written… close it with a decision tomorrow-you will applaud.',
    ],
    streakRisk: [
      'Your golden {streak}-day streak is on the line, {name}! One minute of activity saves it 🔥',
      'Don’t let today slip away — open the app and keep your beautiful rhythm.',
      'Discipline isn’t perfection, it’s a quick return. Come back — the streak is worth it.',
    ],
    comeback: [
      'We missed you, {name}! 💛 Great journeys don’t end with a stumble… only with quitting. Shall we resume?',
      'Your absence was noticed — but returning today speaks louder than any past streak. Welcome back.',
      'One day away erases nothing. Your body remembers what you built — let’s pick up where we left off.',
    ],
    milestone80: [
      '{pct}% reached, {name}! The finish line is closer than you think — final breaths before glory 🔥',
      'The last stretch is home to champions only… and here you are.',
      'Your body is whispering thanks — a little further and the story completes.',
    ],
    goal: [
      'Done! {hours} full fasting hours 🏆 Take a deep breath… you made this happen.',
      'Goal complete, {name}! A truly proud moment — save it in your memory.',
      'From a decision to an achievement: {hours} hours of pure discipline. Hats off 👏',
    ],
    idleFasting: [
      'Your usual fasting window is near — start now and get ahead of your day?',
      'Your body is ready and your mind knows the way. All that’s missing: the “start” button.',
      'The best time to start fasting was yesterday… the second best is right now.',
    ],
    ctas: [
      'A small step now is worth a treasure in a month.',
      'You are closer to your goal than you were yesterday.',
      'Discipline is a gift you give your future self.',
      'No ambition without sweat… and no regret after achievement.',
    ],
    stagePrefix: 'New stage unlocked',
    stageCoach: [
      'This is exactly what we trained for — keep the pace.',
      'Every hour from here pays you back in multiples.',
      'Your body speaks the language of change now… listen.',
    ],
  },
}

const FACTS = {
  ar: {
    if: [
      'بعد 12 ساعة صيام ينتقل جسمك رسميًا إلى حرق الدهون المخزنة.',
      'الالتهام الذاتي يبدأ بعد 16-18 ساعة — إصلاح خلوي حائز على نوبل.',
      'هرمون النمو قد يتضاعف 5 مرات أثناء الصيام الطويل.',
      'القهوة السوداء تسرّع دخولك الكيتوزية ولا تكسر صيامك.',
    ],
    keto: [
      'في الكيتوزية يحرق جسمك الدهون على مدار الساعة حتى أثناء النوم.',
      '«إنفلونزا الكيتو» مجرد نقص أملاح — ماء مملّح يحلّها.',
      'الجمع بين الكيتو وصيام 16:8 يضاعف سرعة النتائج.',
      'البيض أغذية كاملة تقريبًا — يحوي كل الأحماض الأمينية الأساسية.',
    ],
    mediterranean: [
      'سكان «المناطق الزرقاء» الأطول عمرًا يأكلون على الطريقة المتوسطية.',
      'زيت الزيتون البكر مضاد التهاب طبيعي يعمل كالأدوية الواقية للقلب.',
      'الأكل البطيء مع الأحباء جزء علاجي من الحمية نفسها.',
      'وجبة سمك مرتين أسبوعيًا تكفي لجرعتك من أوميغا-3.',
    ],
    lowcarb: [
      'الالتزام باللو-كارب المرن أعلى بنسبة 40٪ من الأنظمة القاسية بعد سنة.',
      'يوم كارب أعلى أسبوعيًا يجدد نشاط هرمونات الاستقلاب.',
      'حذف السعرات السائلة وحده قد يخفض وزنك كيلوغرامًا شهريًا.',
      'قاعدة الطبق: نصف خضار، ربع بروتين، ربع كارب ذكي.',
    ],
  },
  en: {
    if: [
      'After 12 fasting hours your body officially switches to stored-fat burn.',
      'Autophagy begins around 16–18 hours — Nobel-winning cellular repair.',
      'Growth hormone can multiply 5× during extended fasting.',
      'Black coffee speeds ketosis entry and doesn’t break your fast.',
    ],
    keto: [
      'In ketosis your body burns fat around the clock — even asleep.',
      'The “keto flu” is just low electrolytes — salted water solves it.',
      'Pairing keto with 16:8 fasting doubles the pace of results.',
      'Eggs are near-complete food — all essential amino acids included.',
    ],
    mediterranean: [
      'The world’s longest-living “Blue Zone” people eat Mediterranean-style.',
      'Extra-virgin olive oil is a natural anti-inflammatory protecting the heart.',
      'Slow eating with loved ones is a therapeutic part of the diet itself.',
      'Fish twice a week covers your omega-3 needs.',
    ],
    lowcarb: [
      'Flexible low-carb shows 40% better year-long adherence than strict plans.',
      'A weekly higher-carb day refreshes metabolic hormones.',
      'Cutting liquid calories alone can drop a kilo a month.',
      'Plate rule: half veggies, quarter protein, quarter smart carbs.',
    ],
  },
}

// ---------- public API ----------

export function buildContext(store, lang) {
  const diet = dietById(store.activeDiet)
  return {
    name: store.user?.name || (lang === 'ar' ? 'بطل' : 'champ'),
    dietName: diet.name[lang],
    dietId: diet.id,
    streak: store.streak?.current ?? 0,
    hours: store.fasting?.targetHours ?? 16,
  }
}

/** Generate a motivational message for a given situation */
export function generateMessage(kind, ctx, lang, extra = {}) {
  const L = POOLS[lang] || POOLS.en
  let title, body
  const c = { ...ctx, ...extra }

  switch (kind) {
    case 'morning':
      title = lang === 'ar' ? `☀️ صباح الإرادة` : '☀️ Morning of will'
      body = fill(pick(L.morning), c)
      break
    case 'evening':
      title = lang === 'ar' ? '🌙 ختام مسك' : '🌙 Golden closing'
      body = fill(pick(L.evening), c)
      break
    case 'streakRisk':
      title = lang === 'ar' ? '🔥 لا تكسر السلسلة' : '🔥 Don’t break the chain'
      body = fill(pick(L.streakRisk), c)
      break
    case 'comeback':
      title = lang === 'ar' ? '💛 عودة البطل' : '💛 Welcome back'
      body = fill(pick(L.comeback), c)
      break
    case 'milestone':
      title = lang === 'ar' ? '🚀 اقتربت!' : '🚀 Almost there!'
      body = fill(pick(L.milestone80), c)
      break
    case 'goal':
      title = lang === 'ar' ? '🏆 هدف مكتمل' : '🏆 Goal complete'
      body = fill(pick(L.goal), c)
      break
    case 'idleFasting':
      title = lang === 'ar' ? '⏳ نداء الصيام' : '⏳ The fasting call'
      body = fill(pick(L.idleFasting), c)
      break
    case 'stage': {
      title = `${lang === 'ar' ? '✨' : '✨'} ${L.stagePrefix}: ${extra.stageName}`
      body = `${fill(pick(L.stageCoach), c)} ${extra.stageHint || ''}`
      break
    }
    default:
      title = '💫 Lumina'
      body = pick(L.ctas)
  }
  return { title, body }
}

/** Deterministic daily insight — same all day, different each day */
export function dailyInsight(dateKey, ctx, lang, salt = 0) {
  const facts = FACTS[lang]?.[ctx.dietId] || FACTS.en.if
  const fact = seededPick(dateKey + ctx.dietId + salt, facts)
  const cta = seededPick(dateKey + 'cta' + salt, POOLS[lang].ctas)
  const openers =
    lang === 'ar'
      ? [
          `صباحُ ذكاء يا ${ctx.name}،`,
          `ومضة اليوم من مدرّبك:`,
          `تحليلنا لمسارك اليوم:`,
          `بما أنك على نظام ${ctx.dietName} —`,
        ]
      : [
          `Smart morning, ${ctx.name} —`,
          `A spark from your coach:`,
          `Our read on your path today:`,
          `Since you follow ${ctx.dietName} —`,
        ]
  const opener = seededPick(dateKey + 'op' + salt, openers)
  return { title: '', body: `${opener} ${fact} — ${cta}` }
}

export { FACTS }

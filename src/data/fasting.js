// ===== Intermittent fasting protocols & body stages (bilingual) =====

export const PROTOCOLS = [
  {
    id: '12-12',
    fast: 12,
    eat: 12,
    level: { ar: 'مبتدئ', en: 'Beginner' },
    tag: null,
    name: { ar: '12:12 البداية اللطيفة', en: '12:12 Gentle Start' },
    desc: {
      ar: 'توقف عن الأكل بعد العشاء ونَم جيدًا — أبسط أبواب الصيام وألطفها على الجسم.',
      en: 'Stop eating after dinner and sleep well — the gentlest door into fasting.',
    },
  },
  {
    id: '14-10',
    fast: 14,
    eat: 10,
    level: { ar: 'سهل', en: 'Easy' },
    tag: null,
    name: { ar: '14:10 التوازن اليومي', en: '14:10 Daily Balance' },
    desc: {
      ar: 'خطوة أعمق نحو حرق الدهون دون ضغط — مثالية كروتين مستدام.',
      en: 'A deeper step into fat burning without pressure — ideal as a sustainable routine.',
    },
  },
  {
    id: '16-8',
    fast: 16,
    eat: 8,
    level: { ar: 'متوازن', en: 'Balanced' },
    tag: 'popular',
    name: { ar: '16:8 الأشهر عالميًا', en: '16:8 World Favorite' },
    desc: {
      ar: 'النظام الذهبي: حرق دهون حقيقي، كيتوزية خفيفة، وحياة اجتماعية مريحة.',
      en: 'The golden standard: real fat burn, light ketosis, and a comfortable social life.',
    },
  },
  {
    id: '18-6',
    fast: 18,
    eat: 6,
    level: { ar: 'متقدم', en: 'Advanced' },
    tag: 'recommended',
    name: { ar: '18:6 بوابة التجدد', en: '18:6 Renewal Gate' },
    desc: {
      ar: 'تلمس عتبة الالتهام الذاتي — تنظيف خلوي عميق مع نتائج أسرع.',
      en: 'Touch the autophagy threshold — deep cellular cleanup with faster results.',
    },
  },
  {
    id: '20-4',
    fast: 20,
    eat: 4,
    level: { ar: 'محارب', en: 'Warrior' },
    tag: null,
    name: { ar: '20:4 حمية المحارب', en: '20:4 Warrior Diet' },
    desc: {
      ar: 'لمن أتقن الصيام: التهام ذاتي واضح وكيتوزية قوية في نافذة قصيرة.',
      en: 'For the seasoned: clear autophagy and strong ketosis in a short window.',
    },
  },
  {
    id: 'omad',
    fast: 23,
    eat: 1,
    level: { ar: 'نخبة', en: 'Elite' },
    tag: null,
    name: { ar: '23:1 وجبة واحدة (OMAD)', en: '23:1 One Meal a Day' },
    desc: {
      ar: 'أقصى درجات الانضباط — وجبة واحدة غنية يوميًا. لأصحاب الخبرة فقط.',
      en: 'Peak discipline — one rich meal daily. For experienced fasters only.',
    },
  },
]

// Physiological stages — each "process" gets a logo that ignites as its hour passes
export const STAGES = [
  {
    id: 'fed',
    h: 0,
    icon: 'UtensilsCrossed',
    hue: '#f5a623',
    name: { ar: 'الشبع والهضم', en: 'Fed & Digesting' },
    short: { ar: 'جسمك يعالج آخر وجبة', en: 'Processing your last meal' },
    happens: {
      ar: [
        'يرتفع سكر الدم تدريجيًا بعد الوجبة ويفرز البنكرياس الأنسولين.',
        'الطاقة تُخزَّن أولًا في الكبد والعضلات على شكل جليكوجين.',
        'جسمك في «وضع التخزين» — لا يُحرق الدهون في هذه المرحلة.',
      ],
      en: [
        'Blood sugar rises gradually after the meal and insulin is released.',
        'Energy is stored first in the liver and muscles as glycogen.',
        'Your body is in “storage mode” — no fat is burned yet.',
      ],
    },
    gains: {
      ar: ['امتصاص كامل للعناصر الغذائية', 'طاقة جاهزة للعضلات والدماغ'],
      en: ['Full nutrient absorption', 'Ready energy for muscles and brain'],
    },
    coachNote: {
      ar: 'اشرب كوب ماء كبير الآن — الترطيب المبكر يجعل كل المراحل القادمة أسهل.',
      en: 'Drink a big glass of water now — early hydration makes every coming stage easier.',
    },
  },
  {
    id: 'insulin',
    h: 3,
    icon: 'TrendingDown',
    hue: '#4ecdc4',
    name: { ar: 'هبوط الأنسولين', en: 'Insulin Drop' },
    short: { ar: 'التبديل من التخزين إلى الحرق', en: 'Switching from storing to burning' },
    happens: {
      ar: [
        'ينخفض الأنسولين تدريجيًا مع انتهاء الهضم.',
        'يبدأ الجسم بسحب الطاقة من مخازن الجليكوجين.',
        'قد تشعر بجوع خفيف — إنه مجرد هرمون الجريلين يودّعك.',
      ],
      en: [
        'Insulin gradually falls as digestion completes.',
        'The body starts pulling energy from glycogen stores.',
        'You may feel light hunger — it’s just the ghrelin hormone waving goodbye.',
      ],
    },
    gains: {
      ar: ['حساسية أفضل للأنسولين', 'بداية استقرار سكر الدم'],
      en: ['Better insulin sensitivity', 'Blood sugar starts stabilizing'],
    },
    coachNote: {
      ar: 'الجوع هنا موجة تمرّ خلال 10 دقائق — كوب شاي أعشاب دون سكر يُسكتها.',
      en: 'Hunger here is a wave that passes in 10 minutes — a cup of unsweetened herbal tea silences it.',
    },
  },
  {
    id: 'glycogen',
    h: 8,
    icon: 'BatteryCharging',
    hue: '#8b7bff',
    name: { ar: 'استنزاف الجليكوجين', en: 'Glycogen Depletion' },
    short: { ar: 'المخازن السريعة تفرغ', en: 'Quick stores running out' },
    happens: {
      ar: [
        'مخازن الجليكوجين في الكبد أوشكت على النفاد.',
        'يبدأ الجسم بتهيئة «محرك الدهون» البديل.',
        'الدماغ يستعد لاستقبال وقود جديد: الكيتونات.',
      ],
      en: [
        'Liver glycogen stores are nearly empty.',
        'The body begins priming its backup “fat engine”.',
        'Your brain prepares to receive a new fuel: ketones.',
      ],
    },
    gains: {
      ar: ['تنشيط إنزيمات حرق الدهون', 'نوم أعمق إن صمت مساءً'],
      en: ['Fat-burning enzymes activated', 'Deeper sleep if fasting overnight'],
    },
    coachNote: {
      ar: 'مشي خفيف الآن يفرغ الجليكوجين أسرع ويوصلك لمرحلة الحرق قبل موعدها.',
      en: 'A light walk now empties glycogen faster and pushes you into fat-burn ahead of schedule.',
    },
  },
  {
    id: 'fatburn',
    h: 12,
    icon: 'Flame',
    hue: '#ff6b2d',
    name: { ar: 'إشعال حرق الدهون', en: 'Fat-Burn Ignition' },
    short: { ar: 'الدهون تصبح وقودك الأساسي', en: 'Fat becomes your main fuel' },
    happens: {
      ar: [
        'ينتقل الجسم رسميًا إلى حرق الدهون المخزنة للطاقة.',
        'ترتفع أكسدة الأحماض الدهنية ويبدأ إنتاج الكيتونات.',
        'تستقر الطاقة ويخفّ الجوع بشكل ملحوظ.',
      ],
      en: [
        'The body officially switches to burning stored fat for energy.',
        'Fatty-acid oxidation rises and ketone production begins.',
        'Energy stabilizes and hunger noticeably fades.',
      ],
    },
    gains: {
      ar: ['خسارة دهون فعلية تبدأ هنا', 'طاقة مستقرة بلا هبوط سكر'],
      en: ['Real fat loss starts here', 'Steady energy without sugar crashes'],
    },
    coachNote: {
      ar: 'أنت الآن في المنطقة الذهبية — كل ساعة من هنا تُحسب ضعفًا لصالحك.',
      en: 'You are in the golden zone now — every hour from here counts double in your favor.',
    },
  },
  {
    id: 'ketolight',
    h: 14,
    icon: 'Zap',
    hue: '#ffd166',
    name: { ar: 'دخول الكيتوزية', en: 'Entering Ketosis' },
    short: { ar: 'دماغك يتذوق وقوده الجديد', en: 'Your brain tastes its new fuel' },
    happens: {
      ar: [
        'مستوى الكيتونات يرتفع في الدم وتتجاوز العتبة الأولى.',
        'الدماغ يبدأ التحول من الجلوكوز إلى الكيتونات.',
        'يسري إحساس صفاء ذهني خفيف عند كثير من الناس.',
      ],
      en: [
        'Blood ketone levels rise past the first threshold.',
        'The brain starts shifting from glucose to ketones.',
        'A light sense of mental clarity often appears.',
      ],
    },
    gains: {
      ar: ['صفاء ذهني أوضح', 'شهية أهدأ وتركيز أعلى'],
      en: ['Clearer mental focus', 'Calmer appetite, higher focus'],
    },
    coachNote: {
      ar: 'هذه اللحظة المفضلة لدى الرياضيين — تمرين خفيف الآن يرفع الكيتونات بسرعة.',
      en: 'Athletes love this moment — light exercise now spikes ketones fast.',
    },
  },
  {
    id: 'keto',
    h: 16,
    icon: 'Brain',
    hue: '#ff5e8a',
    name: { ar: 'كيتوزية عميقة', en: 'Deep Ketosis' },
    short: { ar: 'أقصى كفاءة لحرق الدهون', en: 'Peak fat-burn efficiency' },
    happens: {
      ar: [
        'الكيتونات أصبحت الوقود الرئيسي للدماغ والجسم.',
        'يرتفع هرمون النمو للحفاظ على العضلات أثناء الحرق.',
        'الالتهابات الخفيفة في الجسم تبدأ بالانحسار.',
      ],
      en: [
        'Ketones are now the main fuel for brain and body.',
        'Growth hormone rises to protect muscle while burning fat.',
        'Low-grade inflammation begins to subside.',
      ],
    },
    gains: {
      ar: ['حرق دهون بأقصى كفاءة', 'حماية العضلات', 'هدوء التهابي داخلي'],
      en: ['Maximum fat-burn efficiency', 'Muscle protection', 'Internal anti-inflammatory calm'],
    },
    coachNote: {
      ar: 'أكملت 16 ساعة؟ هذا هو البروتوكول الذهبي — إن شعرت بقوة، امضِ نحو الالتهام الذاتي.',
      en: '16 hours done? That’s the golden protocol — if you feel strong, push on toward autophagy.',
    },
  },
  {
    id: 'autophagy',
    h: 18,
    icon: 'Recycle',
    hue: '#39d0c0',
    name: { ar: 'الالتهام الذاتي', en: 'Autophagy' },
    short: { ar: 'ورشة تنظيف خلوية عميقة', en: 'Deep cellular cleanup crew' },
    happens: {
      ar: [
        'تُفعَّل عملية الالتهام الذاتي الحائزة على نوبل 2016.',
        'الخلايا «تلتهم» بقاياها التالفة وتعيد تدويرها إلى طاقة ومواد بناء.',
        'تتحلل البروتينات المعطوبة والميتوكوندريا المتهالكة وتُستبدل بجديدة.',
      ],
      en: [
        'Autophagy — the Nobel-winning process of 2016 — switches on.',
        'Cells “eat” their damaged parts and recycle them into energy and building blocks.',
        'Broken proteins and worn-out mitochondria are dismantled and replaced.',
      ],
    },
    gains: {
      ar: ['تجديد خلوي حقيقي', 'دعم المناعة', 'إبطاء مسارات الشيخوخة'],
      en: ['True cellular renewal', 'Immune support', 'Slowing aging pathways'],
    },
    coachNote: {
      ar: 'منطقة النُخبة: قلة من الناس يصلونها يوميًا. تنفّس بعمق واستمتع بالتجدد.',
      en: 'Elite territory: few people reach it daily. Breathe deep and enjoy the renewal.',
    },
  },
  {
    id: 'renewal',
    h: 24,
    icon: 'Dna',
    hue: '#b8f35e',
    name: { ar: 'التجديد العميق', en: 'Deep Renewal' },
    short: { ar: 'هرمون النمو في ذروته', en: 'Growth hormone at its peak' },
    happens: {
      ar: [
        'هرمون النمو قد يرتفع حتى 5 أضعاف مستواه الطبيعي.',
        'إنتاج خلايا جذعية جديدة وإصلاح شامل للأنسجة.',
        'الكيتونات في أعلى مستوياتها — وقود نقيّ للدماغ.',
      ],
      en: [
        'Growth hormone may rise up to 5× its normal level.',
        'New stem-cell production and full tissue repair.',
        'Ketones at their highest — pure fuel for the brain.',
      ],
    },
    gains: {
      ar: ['إصلاح أنسجة شامل', 'دفعة قوية لهرمون النمو', 'ذهن حاد بشكل استثنائي'],
      en: ['Full tissue repair', 'Strong growth-hormone surge', 'Exceptionally sharp mind'],
    },
    coachNote: {
      ar: 'أنجزت ما يعجز عنه معظم الناس. اكسر صيامك بوجبة لطيفة غنية بالبروتين.',
      en: 'You’ve achieved what most people can’t. Break your fast with a gentle protein-rich meal.',
    },
  },
]

export const stageForElapsed = (elapsedH) => {
  let current = STAGES[0]
  for (const s of STAGES) if (elapsedH >= s.h) current = s
  return current
}

export const nextStageFor = (elapsedH) => STAGES.find((s) => s.h > elapsedH) || null

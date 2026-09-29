// ===== The four proven diets — full bilingual documentation =====

export const DIETS = [
  {
    id: 'if',
    icon: 'Timer',
    gradient: ['#8b7bff', '#39d0c0'],
    level: { ar: 'يلائم الجميع', en: 'For everyone' },
    name: { ar: 'الصيام المتقطع', en: 'Intermittent Fasting' },
    tagline: {
      ar: 'ليس ماذا تأكل… بل متى تأكل',
      en: 'Not what you eat… but when you eat',
    },
    intro: {
      ar: 'نمط أكل يتنقل بين نوافذ صيام وأكل. لا يحرمك من طعامك المفضل، بل يعيد تنظيم توقيته ليتحول جسمك إلى ماكينة حرق ذكية تعمل حتى وأنت نائم.',
      en: 'An eating pattern that cycles between fasting and eating windows. It doesn’t ban your favorite food — it re-times it, turning your body into a smart fat-burning engine that works even while you sleep.',
    },
    howIt: {
      ar: [
        'اختر بروتوكولك (مثل 16:8) والتزم بنافذة أكل ثابتة يوميًا.',
        'أثناء الصيام: ماء، قهوة سوداء، وشاي غير محلّى فقط — صفر سعرات.',
        'اكسر صيامك بوجبة متوازنة: بروتين + خضار + دهون صحية.',
        'كرر يوميًا ودَع جسمك يتدرج عبر مراحل الحرق حتى الالتهام الذاتي.',
      ],
      en: [
        'Pick a protocol (like 16:8) and keep a consistent daily eating window.',
        'During fasting: water, black coffee and unsweetened tea only — zero calories.',
        'Break your fast with a balanced plate: protein + vegetables + healthy fats.',
        'Repeat daily and let your body climb the stages up to autophagy.',
      ],
    },
    benefits: [
      {
        icon: 'Flame',
        t: { ar: 'حرق دهون مثبت', en: 'Proven fat burn' },
        d: { ar: 'يجبر الجسم على استهلاك مخزون الدهون كوقود أساسي.', en: 'Forces the body to burn stored fat as primary fuel.' },
      },
      {
        icon: 'Recycle',
        t: { ar: 'التجديد الخلوي', en: 'Cellular renewal' },
        d: { ar: 'يفعّل الالتهام الذاتي بعد 16-18 ساعة صيام.', en: 'Triggers autophagy after 16–18 fasting hours.' },
      },
      {
        icon: 'Brain',
        t: { ar: 'صفاء ذهني', en: 'Mental clarity' },
        d: { ar: 'الكيتونات وقود نظيف يمنح تركيزًا أعمق.', en: 'Ketones are clean fuel for deeper focus.' },
      },
      {
        icon: 'HeartPulse',
        t: { ar: 'قلب أوثق', en: 'Stronger heart' },
        d: { ar: 'يحسّن حساسية الأنسولين وضغط الدم والكولسترول.', en: 'Improves insulin sensitivity, blood pressure and cholesterol.' },
      },
      {
        icon: 'Sparkles',
        t: { ar: 'بساطة حرة', en: 'Liberating simplicity' },
        d: { ar: 'لا حساب سعرات ولا حرمان — فقط توقيت.', en: 'No calorie counting, no deprivation — just timing.' },
      },
    ],
    allowed: [
      { icon: 'Droplets', label: { ar: 'الماء والمكملات المعدنية', en: 'Water & minerals' }, note: { ar: 'أساس نجاح كل مرحلة', en: 'The base of every stage' } },
      { icon: 'Coffee', label: { ar: 'قهوة سوداء', en: 'Black coffee' }, note: { ar: 'تُسكت الجوع وترفع الحرق', en: 'Silences hunger, boosts burn' } },
      { icon: 'Leaf', label: { ar: 'شاي وأعشاب غير محلّاة', en: 'Unsweetened tea & herbs' }, note: { ar: 'دافئة ومريحة للمعدة', en: 'Warm and stomach-friendly' } },
      { icon: 'Salad', label: { ar: 'وجبات متوازنة في النافذة', en: 'Balanced meals in window' }, note: { ar: 'بروتين + ألياف + دهون صحية', en: 'Protein + fiber + healthy fats' } },
      { icon: 'Beef', label: { ar: 'بروتين كافٍ', en: 'Adequate protein' }, note: { ar: 'يحمي عضلاتك أثناء الحرق', en: 'Protects muscle while burning' } },
      { icon: 'Apple', label: { ar: 'فواكه كاملة', en: 'Whole fruits' }, note: { ar: 'داخل النافذة، باعتدال', en: 'Inside the window, in moderation' } },
    ],
    avoid: [
      { icon: 'CupSoda', label: { ar: 'السعرات أثناء الصيام', en: 'Calories while fasting' }, why: { ar: 'حتى رشفة عصير تكسر المراحل', en: 'Even a sip of juice breaks the stages' } },
      { icon: 'Candy', label: { ar: 'المحليات الصناعية', en: 'Artificial sweeteners' }, why: { ar: 'قد ترفع الأنسولين عند البعض', en: 'May spike insulin in some people' } },
      { icon: 'Donut', label: { ar: 'كسر الصيام بالسكريات', en: 'Breaking fast with sugar' }, why: { ar: 'صدمة أنسولين تُضيّع جهدك', en: 'An insulin shock that wastes your effort' } },
      { icon: 'Milk', label: { ar: 'الحليب في القهوة', en: 'Milk in coffee' }, why: { ar: 'سعرات خفية توقف الصيام', en: 'Hidden calories that stop the fast' } },
    ],
    exercises: [
      { icon: 'Footprints', name: { ar: 'مشي صائمًا صباحًا', en: 'Fasted morning walk' }, desc: { ar: '30-40 دقيقة تستنزف الجليكوجين وتسرّع دخولك في الحرق.', en: '30–40 min drains glycogen and fast-tracks fat burn.' }, freq: { ar: 'يوميًا', en: 'Daily' } },
      { icon: 'Dumbbell', name: { ar: 'تمارين المقاومة', en: 'Resistance training' }, desc: { ar: 'قبل كسر الصيام بساعة لاستغلال ذروة هرمون النمو.', en: 'One hour before breaking fast to ride the growth-hormone peak.' }, freq: { ar: '3 مرات أسبوعيًا', en: '3× weekly' } },
      { icon: 'StretchHorizontal', name: { ar: 'يوغا وإطالات', en: 'Yoga & stretching' }, desc: { ar: 'تهدئ الكورتيزول الذي يبطئ خسارة الوزن.', en: 'Calms cortisol, which slows weight loss.' }, freq: { ar: 'متى شئت', en: 'Anytime' } },
      { icon: 'Bike', name: { ar: 'كارديو متقطع HIIT', en: 'HIIT cardio' }, desc: { ar: 'داخل نافذة الأكل فقط — للمتمرسين.', en: 'Inside the eating window only — for the experienced.' }, freq: { ar: 'مرتان أسبوعيًا', en: '2× weekly' } },
    ],
    tips: [
      { ar: 'ثبّت موعد نومك — الأرق يرفع هرمون الجوع.', en: 'Fix your bedtime — poor sleep raises the hunger hormone.' },
      { ar: 'أضف رشة ملح هملايا لمائك في الصيامات الطويلة.', en: 'Add a pinch of Himalayan salt to your water on long fasts.' },
      { ar: 'لا تكسر صيامك بوجبة ضخمة — ابدأ بشيء لطيف.', en: 'Don’t break your fast with a feast — start gentle.' },
    ],
    fact: {
      ar: 'اكتشاف آلية الالتهام الذاتي فاز بجائزة نوبل في الطب عام 2016 — وجسمك يملكها مجانًا.',
      en: 'The discovery of autophagy won the 2016 Nobel Prize in Medicine — and your body has it for free.',
    },
  },

  {
    id: 'keto',
    icon: 'Flame',
    gradient: ['#10b981', '#84cc16'],
    level: { ar: 'متوسط', en: 'Intermediate' },
    name: { ar: 'الكيتو', en: 'Keto' },
    tagline: {
      ar: 'دهونَ تُشعل… دهونًا',
      en: 'Burn fat with fat',
    },
    intro: {
      ar: 'نظام عالي الدهون، متوسط البروتين، منخفض الكربوهيدرات جدًا (أقل من 50غ يوميًا) يدفع جسمك إلى «الكيتوزية» — حالة يصبح فيها حرق الدهون وضعك الافتراضي طوال اليوم.',
      en: 'A very-low-carb, high-fat, moderate-protein plan (under 50g carbs/day) that pushes your body into ketosis — a state where burning fat becomes your default mode around the clock.',
    },
    howIt: {
      ar: [
        'قلّل الكربوهيدرات إلى أقل من 50غ صافي يوميًا.',
        'استبدلها بدهون صحية: زيت زيتون، أفوكادو، مكسرات، زبدة.',
        'حافظ على بروتين متوسط يحمي عضلاتك.',
        'خلال 3-5 أيام يدخل جسمك الكيتوزية ويستقر حرق الدهون.',
      ],
      en: [
        'Cut carbs to under 50g net per day.',
        'Replace them with healthy fats: olive oil, avocado, nuts, butter.',
        'Keep protein moderate to protect your muscle.',
        'Within 3–5 days your body enters ketosis and steady fat burn begins.',
      ],
    },
    benefits: [
      {
        icon: 'Flame',
        t: { ar: 'خسارة وزن سريعة', en: 'Fast weight loss' },
        d: { ar: 'حرق متواصل للدهون حتى بلا صيام طويل.', en: 'Continuous fat burn even without long fasting.' },
      },
      {
        icon: 'Zap',
        t: { ar: 'شبع طويل', en: 'Long satiety' },
        d: { ar: 'الدهون والبروتين يُسكتان الجوع لساعات.', en: 'Fat and protein silence hunger for hours.' },
      },
      {
        icon: 'Activity',
        t: { ar: 'سكر مستقر', en: 'Stable blood sugar' },
        d: { ar: 'وداعًا لهبوطات الطاقة بعد الوجبات.', en: 'Goodbye post-meal energy crashes.' },
      },
      {
        icon: 'Brain',
        t: { ar: 'تركيز الكيتونات', en: 'Ketone focus' },
        d: { ar: 'وقود دماغي ثابت بلا تشويش.', en: 'Steady brain fuel without fog.' },
      },
    ],
    allowed: [
      { icon: 'Beef', label: { ar: 'لحوم ودواجن', en: 'Meat & poultry' }, note: { ar: 'عشبية التغذية أفضل', en: 'Grass-fed is best' } },
      { icon: 'Fish', label: { ar: 'أسماك دهنية', en: 'Fatty fish' }, note: { ar: 'سلمون وسردين للأوميغا-3', en: 'Salmon & sardines for omega-3' } },
      { icon: 'Egg', label: { ar: 'بيض', en: 'Eggs' }, note: { ar: 'ملك الكيتو بلا منازع', en: 'The undisputed keto king' } },
      { icon: 'Droplets', label: { ar: 'زيت زيتون وزبدة', en: 'Olive oil & butter' }, note: { ar: 'مصدر طاقتك الأساسي', en: 'Your main energy source' } },
      { icon: 'LeafyGreen', label: { ar: 'خضار ورقية', en: 'Leafy greens' }, note: { ar: 'سبانخ، جرجير، بروكلي', en: 'Spinach, arugula, broccoli' } },
      { icon: 'Nut', label: { ar: 'مكسرات وأفوكادو', en: 'Nuts & avocado' }, note: { ar: 'دهون ذكية بين الوجبات', en: 'Smart fats between meals' } },
      { icon: 'Milk', label: { ar: 'أجبان كاملة الدسم', en: 'Full-fat cheese' }, note: { ar: 'باعتدال', en: 'In moderation' } },
    ],
    avoid: [
      { icon: 'Wheat', label: { ar: 'الخبز والأرز والمعكرونة', en: 'Bread, rice & pasta' }, why: { ar: 'كربوهيدرات تخرجك من الكيتوزية', en: 'Carbs that kick you out of ketosis' } },
      { icon: 'Candy', label: { ar: 'السكر بكل أشكاله', en: 'Sugar in all forms' }, why: { ar: 'العدو الأول للكيتوزية', en: 'Ketosis enemy #1' } },
      { icon: 'Banana', label: { ar: 'الفواكه السكرية', en: 'Sugary fruits' }, why: { ar: 'موز، عنب، تمور — عالية الكارب', en: 'Banana, grapes, dates — high carb' } },
      { icon: 'CupSoda', label: { ar: 'العصائر والمشروبات الغازية', en: 'Juices & sodas' }, why: { ar: 'سكر سائل صافي', en: 'Pure liquid sugar' } },
      { icon: 'Carrot', label: { ar: 'الخضار النشوية', en: 'Starchy vegetables' }, why: { ar: 'بطاطس وذرة بكميات كبيرة', en: 'Potatoes & corn in large amounts' } },
    ],
    exercises: [
      { icon: 'Dumbbell', name: { ar: 'رفع الأثقال', en: 'Weight lifting' }, desc: { ar: 'أداء ممتاز مع البروتين الكافي لبناء عضلات صافية.', en: 'Great performance with adequate protein for lean muscle.' }, freq: { ar: '3-4 مرات أسبوعيًا', en: '3–4× weekly' } },
      { icon: 'Footprints', name: { ar: 'مشي وكارديو خفيف', en: 'Walking & light cardio' }, desc: { ar: 'الكيتوزية تجعل الحرق في الكارديو الهادئ أعمق.', en: 'Ketosis deepens fat burn in low-intensity cardio.' }, freq: { ar: 'يوميًا', en: 'Daily' } },
      { icon: 'Waves', name: { ar: 'سباحة', en: 'Swimming' }, desc: { ar: 'كامل الجسم بلا ضغط على المفاصل.', en: 'Full body, zero joint stress.' }, freq: { ar: 'مرتان أسبوعيًا', en: '2× weekly' } },
    ],
    tips: [
      { ar: 'أول أسبوع قد تشعر بـ«إنفلونزا الكيتو» — أكثِر من الماء والملح وستمر.', en: 'Week one may bring the “keto flu” — extra water and salt fixes it.' },
      { ar: 'اقرأ الملصقات — السكر يختبئ في الصلصات.', en: 'Read labels — sugar hides in sauces.' },
      { ar: 'اجمعه مع صيام 16:8 لتضاعف النتائج.', en: 'Pair it with 16:8 fasting to double the results.' },
    ],
    fact: {
      ar: 'الكيتو طُوّر طبيًا في عشرينيات القرن الماضي لعلاج الصرع قبل أن يصبح نظام رشاقة عالمي.',
      en: 'Keto was developed medically in the 1920s to treat epilepsy — long before becoming a global fitness plan.',
    },
  },

  {
    id: 'mediterranean',
    icon: 'Fish',
    gradient: ['#0ea5e9', '#34d399'],
    level: { ar: 'سهل ومستدام', en: 'Easy & sustainable' },
    name: { ar: 'حمية البحر المتوسط', en: 'Mediterranean' },
    tagline: {
      ar: 'أسلوب حياة… لا حمية',
      en: 'A lifestyle… not a diet',
    },
    intro: {
      ar: 'النظام الأول عالميًا في تقييمات خبراء التغذية لسنوات متتالية: خضار، زيت زيتون، أسماك، حبوب كاملة وبقوليات — مع متعة الأكل الحقيقي وطول العمر.',
      en: 'Ranked #1 by nutrition experts for years running: vegetables, olive oil, fish, whole grains and legumes — with real food joy and longevity.',
    },
    howIt: {
      ar: [
        'اجعل الخضار وزيت الزيتون قاعدة كل وجبة.',
        'سمكان أو أكثر أسبوعيًا، وبقوليات يوميًا تقريبًا.',
        'لحوم حمراء قليلًا، وحلويات في المناسبات فقط.',
        'شارك وجباتك — الحمية ثقافة إجتماعية لا حسابات.',
      ],
      en: [
        'Make vegetables and olive oil the base of every meal.',
        'Fish 2+ times weekly, legumes almost daily.',
        'Little red meat; sweets on occasions only.',
        'Share your meals — this diet is a social culture, not arithmetic.',
      ],
    },
    benefits: [
      {
        icon: 'HeartPulse',
        t: { ar: 'أفضل صديق للقلب', en: 'Heart’s best friend' },
        d: { ar: 'تخفض أمراض القلب بنسب مثبتة علميًا.', en: 'Cuts heart-disease risk by science-proven margins.' },
      },
      {
        icon: 'Dna',
        t: { ar: 'طول عمر', en: 'Longevity' },
        d: { ar: 'حمية «المناطق الزرقاء» الأطول عمرًا في العالم.', en: 'The diet of the world’s longest-living “Blue Zones”.' },
      },
      {
        icon: 'Brain',
        t: { ar: 'دماغ شاب', en: 'Young brain' },
        d: { ar: 'مرتبطة بانخفاض خطر الزهايمر والاكتئاب.', en: 'Linked to lower Alzheimer’s and depression risk.' },
      },
      {
        icon: 'Smile',
        t: { ar: 'بلا حرمان', en: 'Zero deprivation' },
        d: { ar: 'تنوع يجعلها الأسهل استمرارًا مدى الحياة.', en: 'Variety makes it the easiest to keep for life.' },
      },
    ],
    allowed: [
      { icon: 'Droplets', label: { ar: 'زيت الزيتون البكر', en: 'Extra-virgin olive oil' }, note: { ar: 'ذهب الحمية السائل', en: 'The liquid gold of this diet' } },
      { icon: 'Fish', label: { ar: 'أسماك البحر', en: 'Sea fish' }, note: { ar: 'مرتان أسبوعيًا على الأقل', en: 'At least twice weekly' } },
      { icon: 'Salad', label: { ar: 'خضار وفواكه موسمية', en: 'Seasonal veggies & fruits' }, note: { ar: 'نصف طبقك دائمًا', en: 'Always half your plate' } },
      { icon: 'Wheat', label: { ar: 'حبوب كاملة', en: 'Whole grains' }, note: { ar: 'برغل، شوفان، خبز أسمر', en: 'Bulgur, oats, dark bread' } },
      { icon: 'Nut', label: { ar: 'مكسرات وبقوليات', en: 'Nuts & legumes' }, note: { ar: 'حمص، عدس، فول يوميًا', en: 'Hummus, lentils, beans daily' } },
      { icon: 'Wine', label: { ar: 'عصير عنب طبيعي', en: 'Natural grape juice' }, note: { ar: 'بدلًا عن النبيذ التقليدي', en: 'Instead of traditional wine' } },
    ],
    avoid: [
      { icon: 'Pizza', label: { ar: 'المعجنات المصنعة', en: 'Processed pastries' }, why: { ar: 'دقيق أبيض وزيوت مهدرجة', en: 'White flour and hydrogenated oils' } },
      { icon: 'Popcorn', label: { ar: 'السناكس المعلبة', en: 'Packaged snacks' }, why: { ar: 'مقلية ومحمّلة بالملح', en: 'Fried and salt-loaded' } },
      { icon: 'Beef', label: { ar: 'إفراط اللحوم الحمراء', en: 'Excess red meat' }, why: { ar: 'مرة أسبوعيًا كحد أقصى', en: 'Once a week at most' } },
      { icon: 'Candy', label: { ar: 'الحلويات اليومية', en: 'Daily sweets' }, why: { ar: 'للمناسبات فقط', en: 'Special occasions only' } },
    ],
    exercises: [
      { icon: 'Footprints', name: { ar: 'مشي بعد العشاء', en: 'Post-dinner walks' }, desc: { ar: 'عادة متوسطية أصيلة تُحسّن الهضم وسكر الدم.', en: 'An authentic Mediterranean habit improving digestion and blood sugar.' }, freq: { ar: 'يوميًا', en: 'Daily' } },
      { icon: 'Waves', name: { ar: 'سباحة بحرية', en: 'Sea swimming' }, desc: { ar: 'رياضة سكان المتوسط المصحوبة بفيتامين د.', en: 'The Mediterranean peoples’ sport, vitamin D included.' }, freq: { ar: 'أسبوعيًا', en: 'Weekly' } },
      { icon: 'Bike', name: { ar: 'دراجة هوائية', en: 'Cycling' }, desc: { ar: 'كارديو ممتع يناسب روح الحمية الاجتماعية.', en: 'Fun cardio matching the diet’s social spirit.' }, freq: { ar: '3 مرات أسبوعيًا', en: '3× weekly' } },
    ],
    tips: [
      { ar: 'استبدل السمن والزبدة بزيت الزيتون في كل شيء.', en: 'Swap ghee and butter for olive oil in everything.' },
      { ar: 'ابدأ وجبتك بالسلطة — شبع مبكر بسعرات أقل.', en: 'Start meals with salad — early satiety, fewer calories.' },
      { ar: 'كل ببطء ومع أحبابك — الأكل المتأني جزء من العلاج.', en: 'Eat slowly with loved ones — unhurried eating is part of the cure.' },
    ],
    fact: {
      ar: 'جزيرة إيكاريا اليونانية — من عاصمة هذه الحمية — يعيش ثلث سكانها فوق التسعين بصحة جيدة.',
      en: 'On Greece’s Ikaria island — a capital of this diet — one in three people lives past 90 in good health.',
    },
  },

  {
    id: 'lowcarb',
    icon: 'Salad',
    gradient: ['#f59e0b', '#ef4444'],
    level: { ar: 'سهل', en: 'Easy' },
    name: { ar: 'اللو-كارب', en: 'Low Carb' },
    tagline: {
      ar: 'كيتو بروح مرنة',
      en: 'Keto’s flexible sibling',
    },
    intro: {
      ar: 'تقليل ذكي للكربوهيدرات (50-130غ يوميًا) دون تشدد الكيتو: مساحة للفواكه والبقوليات والمناسبات الاجتماعية، مع نتائج وزن قوية ومستدامة.',
      en: 'Smart carb reduction (50–130g/day) without keto’s strictness: room for fruits, legumes and social occasions — with strong, sustainable weight results.',
    },
    howIt: {
      ar: [
        'احذف الكربوهيدرات المكررة أولًا: سكر، دقيق أبيض، مشروبات.',
        'احتفظ بالكربوهيدرات الذكية: شوفان، بقوليات، فواكه كاملة.',
        'املأ الفراغ ببروتين وخضار ودهون صحية.',
        'لا حاجة لعدّ الكيتونات — فقط وعي بالمقادير.',
      ],
      en: [
        'Remove refined carbs first: sugar, white flour, sodas.',
        'Keep smart carbs: oats, legumes, whole fruits.',
        'Fill the gap with protein, vegetables and healthy fats.',
        'No ketone tracking needed — just portion awareness.',
      ],
    },
    benefits: [
      {
        icon: 'TrendingDown',
        t: { ar: 'وزن ينزل بثبات', en: 'Steady weight loss' },
        d: { ar: 'نتائج قوية دون قسوة الحرمان الكامل.', en: 'Strong results without full deprivation.' },
      },
      {
        icon: 'Smile',
        t: { ar: 'مرونة اجتماعية', en: 'Social flexibility' },
        d: { ar: 'تناول قطعة فاكهة بلا خوف من «كسر النظام».', en: 'Enjoy a piece of fruit without “breaking the diet”.' },
      },
      {
        icon: 'Activity',
        t: { ar: 'مقاومة أنسولين أقل', en: 'Less insulin resistance' },
        d: { ar: 'خيار ممتاز لمقدمات السكري.', en: 'An excellent choice for prediabetes.' },
      },
      {
        icon: 'Zap',
        t: { ar: 'طاقة متوازنة', en: 'Balanced energy' },
        d: { ar: 'بلا صعود وهبوط السكر، وبلا كيتو-فلو.', en: 'No sugar rollercoaster, no keto flu.' },
      },
    ],
    allowed: [
      { icon: 'Drumstick', label: { ar: 'بروتينات متنوعة', en: 'Varied proteins' }, note: { ar: 'دجاج، سمك، لحم، بيض', en: 'Chicken, fish, meat, eggs' } },
      { icon: 'LeafyGreen', label: { ar: 'خضار غير نشوية', en: 'Non-starchy veggies' }, note: { ar: 'بلا حدود تقريبًا', en: 'Almost unlimited' } },
      { icon: 'Apple', label: { ar: 'فواكه منخفضة السكر', en: 'Low-sugar fruits' }, note: { ar: 'توت، تفاح، برتقال', en: 'Berries, apple, orange' } },
      { icon: 'Wheat', label: { ar: 'نشويات ذكية باعتدال', en: 'Smart carbs, moderated' }, note: { ar: 'شوفان، كينوا، بطاطا حلوة', en: 'Oats, quinoa, sweet potato' } },
      { icon: 'Nut', label: { ar: 'مكسرات وبذور', en: 'Nuts & seeds' }, note: { ar: 'سناك مثالي', en: 'The perfect snack' } },
      { icon: 'Milk', label: { ar: 'زبادي يوناني', en: 'Greek yogurt' }, note: { ar: 'بروتين وروبيوم', en: 'Protein and probiotics' } },
    ],
    avoid: [
      { icon: 'Croissant', label: { ar: 'الدقيق الأبيض', en: 'White flour' }, why: { ar: 'يرفع السكر بنفس سرعة الحلوى', en: 'Spikes sugar as fast as candy' } },
      { icon: 'CupSoda', label: { ar: 'مشروبات محلّاة', en: 'Sweetened drinks' }, why: { ar: 'كارب سائل بلا شبع', en: 'Liquid carbs with no satiety' } },
      { icon: 'Cake', label: { ar: 'حلويات مصنعة', en: 'Processed desserts' }, why: { ar: 'سكر + دقيق أبيض معًا', en: 'Sugar and white flour combined' } },
      { icon: 'Pizza', label: { ar: 'الوجبات السريعة', en: 'Fast food' }, why: { ar: 'كربوهيدرات مكررة وزيوت رديئة', en: 'Refined carbs and poor oils' } },
    ],
    exercises: [
      { icon: 'Dumbbell', name: { ar: 'حديد + كارديو متوازن', en: 'Balanced lifting + cardio' }, desc: { ar: 'وفرة كربوهيدرات معقولة = طاقة كافية للتمارين القوية.', en: 'Reasonable carbs = enough fuel for strong workouts.' }, freq: { ar: '4 مرات أسبوعيًا', en: '4× weekly' } },
      { icon: 'Footprints', name: { ar: 'مشي سريع', en: 'Brisk walking' }, desc: { ar: '8000-10000 خطوة تُحدث فرقًا مرئيًا مع اللو-كارب.', en: '8–10k steps make a visible difference with low-carb.' }, freq: { ar: 'يوميًا', en: 'Daily' } },
      { icon: 'Activity', name: { ar: 'تمارين لياقة جماعية', en: 'Group fitness classes' }, desc: { ar: 'حماس جماعي يناسب روح النظام المرنة.', en: 'Group energy matching the plan’s flexible spirit.' }, freq: { ar: '2-3 أسبوعيًا', en: '2–3× weekly' } },
    ],
    tips: [
      { ar: 'قاعدة الطبق: نصف خضار، ربع بروتين، ربع كارب ذكي.', en: 'Plate rule: half veggies, quarter protein, quarter smart carbs.' },
      { ar: 'لا تشرب سعراتك — الماء والقهوة والشاي فحسب.', en: 'Don’t drink your calories — water, coffee and tea only.' },
      { ar: 'يوم «كارب أعلى» أسبوعيًا يجدد نشاط الاستقلاب.', en: 'One higher-carb day weekly refreshes your metabolism.' },
    ],
    fact: {
      ar: 'دراسات كبرى وجدت أن اللو-كارب المرن يحقق التزامًا أعلى بنسبة 40٪ بعد سنة مقارنة بالأنظمة القاسية.',
      en: 'Major studies found flexible low-carb achieves 40% higher adherence after one year versus stricter plans.',
    },
  },
]

export const dietById = (id) => DIETS.find((d) => d.id === id) || DIETS[0]

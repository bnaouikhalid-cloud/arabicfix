import { ToolDefinition } from '../types';

export const TOOLS: ToolDefinition[] = [
  {
    slug: 'remove-tashkeel',
    id: 'remove-tashkeel',
    name: {
      ar: 'حذف التشكيل والحركات',
      en: 'Remove Tashkeel',
    },
    shortDescription: {
      ar: 'إزالة الفتحة، الضمة، الكسرة، التنوين، السكون، والشدة من النص العربي بدقة.',
      en: 'Strip Arabic diacritics including Fatha, Damma, Kasra, Tanween, Sukun, and Shadda cleanly.',
    },
    fullDescription: {
      ar: 'أداة مجانية وسريعة لحذف جميع علامات التشكيل والحركات القرآنية من النص العربي مع الحفاظ التام على الحروف الأصلية.',
      en: 'Fast, free browser utility to strip all Arabic diacritical marks, vowels, and Harakat while preserving the original letters.',
    },
    category: 'cleaning',
    isPopular: true,
    iconName: 'Eraser',
    seo: {
      title: {
        ar: 'حذف التشكيل من النص العربي أونلاين مجاناً | ArabicFix',
        en: 'Remove Arabic Tashkeel Online – Free Arabic Diacritics Remover | ArabicFix',
      },
      metaDescription: {
        ar: 'أداة مجانية وسريعة لحذف الحركات والتشكيل والتنوين من النصوص العربية مباشرة في المتصفح بخصوصية تامة وبدون تسجيل.',
        en: 'Remove Arabic diacritics and Tashkeel instantly online. Free, private, and fast Arabic text cleaner with no signup required.',
      },
      ogTitle: {
        ar: 'حذف التشكيل من النص العربي أونلاين مجاناً',
        en: 'Remove Arabic Tashkeel Online – Free Diacritics Remover',
      },
      ogDescription: {
        ar: 'أزل جميع الحركات والتشكيل وعلامات التنوين من النص العربي بنقرة واحدة.',
        en: 'Strip all Arabic diacritical marks, Harakat, and vowels in one click.',
      },
      keywords: ['حذف التشكيل', 'ازالة الحركات', 'remove tashkeel', 'arabic diacritics remover', 'harakat removal'],
    },
    howItWorks: {
      ar: [
        'يقوم النظام بمسح النص البرمجي بحثاً عن كودات يونيكود الخاصة بالحركات العربية (U+064B حتى U+065F و U+0670).',
        'يتم استئصال علامات الفتح، الضم، الكسر، التنوين، والسكون دون المساس بالحروف الأبجدية.',
        'يمكنك اختيار الإبقاء على الشدة إن كنت بحاجة لتمييز الحرف المشدد.',
      ],
      en: [
        'Scans Unicode code points specifically representing Arabic diacritics (U+064B through U+065F and U+0670).',
        'Strips vowels, tanween marks, and sukun while keeping the core alphabet letters 100% intact.',
        'Optionally allows keeping the Shadda mark if semantic consonant doubling is required.',
      ],
    },
    whyUse: {
      ar: [
        'تحسين نتائج البحث وقواعد البيانات التي تتطلب نصوصاً غير مشكولة.',
        'تسهيل المقارنة بين النصوص والتدقيق الإملائي.',
        'تجهيز النصوص للطباعة أو النماذج الرقمية الموحدة.',
      ],
      en: [
        'Optimize search indexing and databases that require unvocalized Arabic.',
        'Facilitate text matching, diffs, and proofreading algorithms.',
        'Standardize typography across digital publications and reports.',
      ],
    },
    defaultInput: 'مَرْحَبًا بِكُمْ فِي عَالَمِ التِّكْنُولُوجْيَا وَالْمَعْرِفَةِ. اَللُّغَةُ الْعَرَبِيَّةُ لُغَةٌ جَمِيلَةٌ وَعَرِيقَةٌ.',
    examples: [
      {
        title: { ar: 'تحية ترحيبية', en: 'Greeting sample' },
        input: 'مَرْحَبًا بِالْعَالَمِ! كَيْفَ حَالُكُمْ؟',
        output: 'مرحبا بالعالم! كيف حالكم؟',
      },
      {
        title: { ar: 'بيت شعر مشكول', en: 'Poetry with diacritics' },
        input: 'وَإِذَا الْعِنَايَةُ لَاحَظَتْكَ عُيُونُهَا ... نَمْ فَالْمَخَاوِفُ كُلُّهُنَّ أَمَانُ',
        output: 'وإذا العناية لاحظتك عيونها ... نم فالمخاوف كلهن أمان',
      },
    ],
    faqs: [
      {
        question: { ar: 'هل تُحذف حروف العلة أو الهمزات؟', en: 'Does this delete weak letters or Hamza?' },
        answer: {
          ar: 'لا مطلقاً، الأداة تحذف فقط الحركات الفوقية والتحتية دون المساس بالألف أو الواو أو الياء أو الهمزة.',
          en: 'Not at all. The tool only targets suprasegmental vowel marks and diacritics, keeping all letters safe.',
        },
      },
      {
        question: { ar: 'هل يمكنني الإبقاء على الشدة؟', en: 'Can I keep the Shadda?' },
        answer: {
          ar: 'نعم، يوفر المحرر خياراً للإبقاء على علامة الشدة ( ّ ) مع حذف بقية الحركات.',
          en: 'Yes, simply toggle the "Keep Shadda" checkbox in the tool options.',
        },
      },
    ],
    relatedToolSlugs: ['arabic-text-cleaner', 'remove-tatweel', 'normalize-arabic-text'],
    liveProcessingDefault: true,
  },
  {
    slug: 'remove-tatweel',
    id: 'remove-tatweel',
    name: {
      ar: 'حذف التطويل والكشيدة',
      en: 'Remove Tatweel',
    },
    shortDescription: {
      ar: 'إزالة علامة التطويل (الكشيدة ـ) من بين الحروف لتوحيد مظهر النص العربي.',
      en: 'Strip Arabic Tatweel / Kashida elongation lines between letters.',
    },
    fullDescription: {
      ar: 'احذف شرطات المد والتطويل المستخدمة لتجميل الخطوط العربية بضغطة زر، مما يعيد الكلمات لشكلها القياسي المضغوط.',
      en: 'Remove typographic elongation strokes (Kashida) inserted into Arabic text, restoring words to clean standard proportions.',
    },
    category: 'cleaning',
    isPopular: true,
    iconName: 'Minus',
    seo: {
      title: {
        ar: 'حذف التطويل والكشيدة من النص العربي أونلاين | ArabicFix',
        en: 'Remove Arabic Tatweel Online – Strip Kashida Characters | ArabicFix',
      },
      metaDescription: {
        ar: 'أداة سريعة لحذف الكشيدة والتطويل (ـ) من الكلمات العربية لتسهيل البحث وتنسيق المقالات.',
        en: 'Quickly remove Arabic Tatweel (Kashida) characters between letters online. Fast and private.',
      },
      ogTitle: {
        ar: 'حذف التطويل والكشيدة من الكلمات العربية',
        en: 'Remove Arabic Tatweel & Kashida Lines',
      },
      ogDescription: {
        ar: 'تخلص من تطويل الحروف الزائد في الكلمات العربية بنقرة واحدة.',
        en: 'Clean extended Arabic text and remove elongation dashes instantly.',
      },
      keywords: ['حذف التطويل', 'ازالة الكشيدة', 'remove tatweel', 'kashida remover', 'arabic elongation'],
    },
    howItWorks: {
      ar: [
        'يتم فحص النص بحثاً عن رمز التطويل العربي المحدد برمز اليونيكود U+0640 (ـ).',
        'تُزال كافة تكرارات هذا الرمز مع الحفاظ على اتصال الحروف السليم.',
      ],
      en: [
        'Searches for all occurrences of Arabic Tatweel Unicode code point U+0640 (ـ).',
        'Safely removes elongation strokes while preserving cursive character connections.',
      ],
    },
    whyUse: {
      ar: [
        'الكشيدة المفرطة تسبب أخطاء في محركات البحث والمطابقة الحرفية.',
        'توحيد مقاسات الخطوط في تصاميم واجهات المستخدم والمنشورات.',
        'تنظيف النصوص المنقولة من وثائق PDF أو برامج التصميم القديمة.',
      ],
      en: [
        'Excessive Kashida hinders text search and keyword matching in search engines.',
        'Standardizes font rendering across UI components, mobile screens, and e-books.',
        'Cleans copy extracted from PDFs or legacy desktop publishing files.',
      ],
    },
    defaultInput: 'مــــرحــــبــــاً بــــكــــم فــــي مــــنــــصــــة أربــــيــــك فــــكــــس!',
    examples: [
      {
        title: { ar: 'كلمة مطولة', en: 'Elongated word' },
        input: 'الــــســــلام عــــلــــيــــكــــم',
        output: 'السلام عليكم',
      },
    ],
    faqs: [
      {
        question: { ar: 'ما هو رمز التطويل (الكشيدة)؟', en: 'What is Arabic Tatweel / Kashida?' },
        answer: {
          ar: 'الكشيدة (ـ) هي امتداد أفقي يستخدم في الخط العربي لتسوية حواف الأسطر أو للتزيين.',
          en: 'Tatweel is a horizontal connecting line historically used by calligraphers to justify margins.',
        },
      },
    ],
    relatedToolSlugs: ['remove-tashkeel', 'arabic-text-cleaner', 'normalize-arabic-text'],
    liveProcessingDefault: true,
  },
  {
    slug: 'arabic-text-cleaner',
    id: 'arabic-text-cleaner',
    name: {
      ar: 'تنظيف النص العربي الشامل',
      en: 'Arabic Text Cleaner',
    },
    shortDescription: {
      ar: 'أداة متكاملة لتنظيف الفراغات المزدوجة، الأسطر الفارغة، الرموز الخفية، والتشكيل مع خيارات مخصصة.',
      en: 'All-in-one cleaner for extra spaces, blank lines, hidden unicode, tatweel, and diacritics.',
    },
    fullDescription: {
      ar: 'قم بتنقية أي نص عربي منسوق أو منسوخ من فوضى التنسيق، المسافات الزائدة، الأسطر المتكررة، والتطويل في مكان واحد.',
      en: 'Comprehensive utility to clean messy pasted Arabic text: collapse redundant spaces, eliminate blank lines, and strip artifacts.',
    },
    category: 'cleaning',
    isPopular: true,
    iconName: 'Sparkles',
    seo: {
      title: {
        ar: 'تنظيف النص العربي أونلاين – إزالة الفراغات والأسطر الزائدة | ArabicFix',
        en: 'Arabic Text Cleaner Online – Strip Extra Spaces & Format Text | ArabicFix',
      },
      metaDescription: {
        ar: 'نظف نصوصك العربية من المسافات الزائدة والأسطر الفارغة والتطويل والرموز الخفية بسرعة وأمان في المتصفح.',
        en: 'Clean, format, and optimize Arabic text online. Remove duplicate spaces, empty lines, and hidden characters instantly.',
      },
      ogTitle: {
        ar: 'تنظيف النص العربي الشامل أونلاين',
        en: 'All-in-One Arabic Text Cleaner',
      },
      ogDescription: {
        ar: 'أداة احترافية لتنظيف النصوص العربية المنسوخة مع خيارات تحكم دقيقة.',
        en: 'Professional Arabic text sanitizer with customizable cleanup rules.',
      },
      keywords: ['تنظيف النص العربي', 'ازالة المسافات الزائدة', 'arabic text cleaner', 'format arabic text'],
    },
    howItWorks: {
      ar: [
        'يقوم المحرك بدمج عدة خوارزميات لمعالجة الفراغات والأسطر حسب الخيارات المحددة.',
        'يزيل المسافات البيضاء المتكررة ويقلص الأسطر الفارغة المتعددة إلى سطر واحد منسق.',
        'يفحص النص بحثاً عن رموز التحكم الخفية وعلامات اليونيكود غير المرئية.',
      ],
      en: [
        'Executes pipeline of whitespace normalizers and structural cleaners based on user toggles.',
        'Collapses multiple inline spaces to a single space and caps consecutive linebreaks at two.',
        'Detects and strips zero-width and invisible control codes safely.',
      ],
    },
    whyUse: {
      ar: [
        'إصلاح النصوص المنقولة من تطبيقات المراسلة أو مستندات PDF المشوشة.',
        'تجهيز المقالات للنشر في أنظمة إدارة المحتوى (WordPress وغيرها).',
        'توفير ساعات من التعديل اليدوي للنصوص الطويلة.',
      ],
      en: [
        'Repair malformed text pasted from chat apps, scanned PDFs, or word processors.',
        'Prepare clean copy for CMS publishing (WordPress, Notion, etc.).',
        'Save hours of tedious manual formatting on lengthy articles.',
      ],
    },
    defaultInput: `   هذا   نص   عـــربـــي   يحتوي    على    فراغات     متباعدة جداً.  


وهنا أسطر      فارغة      كثيرة     ومتكررة.  
مــع   تــطــويــل   وزيــادات   غير   مرغوبة.    `,
    examples: [
      {
        title: { ar: 'نص عشوائي الفراغات', en: 'Messy whitespace' },
        input: 'مرحبا    بكم    في     الموقع   \n\n\n\nشكرا   لكم',
        output: 'مرحبا بكم في الموقع\n\nشكرا لكم',
      },
    ],
    faqs: [
      {
        question: { ar: 'هل يمكنني تعطيل حذف التشكيل؟', en: 'Can I disable Tashkeel removal?' },
        answer: {
          ar: 'نعم، جميع الخيارات (التشكيل، التطويل، المسافات، الأسطر) قابلة للتشغيل والإيقاف حسب رغبتك.',
          en: 'Yes, every cleanup rule has an independent toggle switch right in the editor panel.',
        },
      },
    ],
    relatedToolSlugs: ['remove-tashkeel', 'remove-tatweel', 'remove-invisible-characters', 'arabic-punctuation-fixer'],
    liveProcessingDefault: true,
  },
  {
    slug: 'arabic-number-converter',
    id: 'arabic-number-converter',
    name: {
      ar: 'تحويل الأرقام العربية والإنجليزية',
      en: 'Arabic Number Converter',
    },
    shortDescription: {
      ar: 'تحويل الأرقام بين الإنجليزية (123) والمشرقية (١٢٣) والفارسية (۱۲۳) بكل دقة.',
      en: 'Convert between Western (123), Arabic-Indic (١٢٣), and Eastern Persian (۱۲۳) numerals.',
    },
    fullDescription: {
      ar: 'محول أرقام ثنائي الاتجاه وسريع لنصوصك العربية. حوّل الأرقام الغربية إلى أرقام هندية عربية أو العكس مع الحفاظ على النص المحيط.',
      en: 'Bidirectional digit converter. Transform digits between Western standard (0-9) and Arabic-Indic (٠-٩) without disturbing surrounding Arabic text.',
    },
    category: 'conversion',
    isPopular: true,
    iconName: 'Hash',
    seo: {
      title: {
        ar: 'تحويل الأرقام العربية إلى إنجليزية والعكس أونلاين | ArabicFix',
        en: 'Arabic Number Converter – Convert Arabic & English Digits | ArabicFix',
      },
      metaDescription: {
        ar: 'حوّل الأرقام من إنجليزية 123 إلى أرقام عربية مشرقية ١٢٣ أو العكس داخل نصوصك بسرعة وسهولة.',
        en: 'Convert Western numbers to Arabic-Indic digits and vice versa. Free online bidirectional digit converter.',
      },
      ogTitle: {
        ar: 'تحويل الأرقام العربية والإنجليزية أونلاين',
        en: 'Bidirectional Arabic Number Converter',
      },
      ogDescription: {
        ar: 'تحويل فوري بين الأرقام الإنجليزية والأرقام العربية المشرقية.',
        en: 'Instant conversion between Western digits and Arabic-Indic digits.',
      },
      keywords: ['تحويل الارقام', 'ارقام عربية', 'ارقام هندية', 'arabic numbers converter', 'western to arabic numerals'],
    },
    howItWorks: {
      ar: [
        'يقوم المحول بالتعرف على خانات الأرقام فقط داخل النص دون التأثير على الحروف أو علامات الترقيم.',
        'يستبدل كل رقم بالخانة المقابلة له في نظام الترقيم المحدد.',
      ],
      en: [
        'Identifies digit character codes in the text stream, ignoring letters and punctuation.',
        'Performs precise 1-to-1 Unicode mapping according to selected direction.',
      ],
    },
    whyUse: {
      ar: [
        'توحيد نمط الأرقام في المستندات الرسمية والبحوث الجامعية.',
        'مطابقة المعايير الحكومية المتبعة في دول الخليج والمشرق العربي.',
        'تصحيح خلط الأرقام الناتج عن نسخ الجداول والتقارير المالية.',
      ],
      en: [
        'Standardize typography in formal reports, academic papers, and government documents.',
        'Comply with official regional publishing standards in the Middle East.',
        'Harmonize mixed numerical tables and financial records.',
      ],
    },
    defaultInput: 'تاريخ اليوم هو 15 يناير 2025، وعدد الحاضرين في القاعة هو 450 شخصاً برسم اشتراك 99 دولاراً.',
    examples: [
      {
        title: { ar: 'أرقام غربية إلى مشرقية', en: 'Western to Indic' },
        input: 'العام 2024 - الهاتف: 0501234567',
        output: 'العام ٢٠٢٤ - الهاتف: ٠٥٠١٢٣٤٥٦٧',
      },
    ],
    faqs: [
      {
        question: { ar: 'هل يدعم الأرقام الفارسية؟', en: 'Does it support Persian digits?' },
        answer: {
          ar: 'نعم، يدعم الأرقام الفارسية (۴، ۵، ۶) من وإلى الأرقام المشرقية والغربية.',
          en: 'Yes, full support for Persian digits (Eastern Arabic-Indic) is included.',
        },
      },
    ],
    relatedToolSlugs: ['arabic-text-cleaner', 'normalize-arabic-text', 'extract-arabic-text'],
    supportsSwap: true,
    liveProcessingDefault: true,
  },
  {
    slug: 'fix-reversed-arabic',
    id: 'fix-reversed-arabic',
    name: {
      ar: 'إصلاح النص العربي المقلوب',
      en: 'Fix Reversed Arabic',
    },
    shortDescription: {
      ar: 'إصلاح النصوص المقلوبة والمتقطعة الناتجة عن النسخ من ملفات PDF وبرامج التصميم.',
      en: 'Repair reversed Arabic characters and disconnected letters copied from PDFs or legacy CAD/Photoshop.',
    },
    fullDescription: {
      ar: 'حل فعال لمشكلة انعكاس الحروف العربية وعكس اتجاه الأسطر عند النسخ من ملفات PDF، البرامج القديمة، وتطبيقات تحرير الفيديو.',
      en: 'Dedicated fixer for backward Arabic text and broken character shaping caused by PDF copy-pasting or legacy graphic software.',
    },
    category: 'utilities',
    isPopular: true,
    iconName: 'RotateCcw',
    seo: {
      title: {
        ar: 'إصلاح النص العربي المقلوب والمعكوس من PDF أونلاين | ArabicFix',
        en: 'Fix Reversed Arabic Text Online – Repair PDF Copy Paste | ArabicFix',
      },
      metaDescription: {
        ar: 'أصلح الحروف العربية المعكوسة والمقلوبة الناتجة عن نسخ ملفات PDF أو فوتوشوب بضغطة واحدة أونلاين مجاناً.',
        en: 'Fix backward and reversed Arabic letters copied from PDFs, Illustrator, or AutoCAD instantly online.',
      },
      ogTitle: {
        ar: 'حل مشكلة الكتابة العربية المقلوبة والمعكوسة',
        en: 'Fix Backward & Disconnected Arabic Text',
      },
      ogDescription: {
        ar: 'أداة مجانية لتعديل اتجاه الحروف العربية المعكوسة من برامج التصميم وملفات PDF.',
        en: 'Repair mirrored and disconnected Arabic characters from legacy design suites.',
      },
      keywords: ['عكس النص العربي', 'نص عربي مقلوب', 'fix reversed arabic', 'arabic pdf copy paste', 'arabic backward text'],
    },
    howItWorks: {
      ar: [
        'يقوم بتحويل أشكال الحروف المفصولة (Arabic Presentation Forms) إلى حروف عربية قياسية متصلة.',
        'يوفر أنماط متعددة للعكس: عكس كل سطر على حدة، عكس النص بالكامل، أو عكس ترتيب الأسطر.',
      ],
      en: [
        'Decodes isolated Arabic presentation forms back into standard connectable Unicode glyphs.',
        'Offers multiple correction modes: reverse characters per line, full string inversion, or line order swap.',
      ],
    },
    whyUse: {
      ar: [
        'معالجة النصوص المستخرجة من ملفات PDF بدون دعم BiDi.',
        'تصحيح العناوين في تصاميم برامج المونتاج القديمة (Premiere, After Effects).',
        'إصلاح ترجمات الأفلام التي تعرض الحروف من اليسار لليمين.',
      ],
      en: [
        'Rescue text extracted from PDFs lacking proper bidirectional (BiDi) encoding metadata.',
        'Fix titles for legacy video editing and CAD suites without native RTL support.',
        'Repair broken subtitle files that display Arabic letters from left to right.',
      ],
    },
    defaultInput: 'م ك ب ا ح ر م\nم ك ي ل ع م ا ل س ل ا',
    examples: [
      {
        title: { ar: 'كلمات مقلوبة حرفياً', en: 'Character-inverted line' },
        input: 'ملعلاب ابحرم',
        output: 'مرحبا بالعلم',
      },
    ],
    faqs: [
      {
        question: { ar: 'لماذا تظهر النصوص العربية مقلوبة في الـ PDF؟', en: 'Why do Arabic PDFs produce reversed text?' },
        answer: {
          ar: 'بسبب تخزين الحروف داخل ملف الـ PDF كرموز رسومية بصرية مجردة دون معلومات الاتجاه الصحيحة (RTL).',
          en: 'Some PDF printers embed glyphs visually from left-to-right rather than maintaining logical Unicode order.',
        },
      },
    ],
    relatedToolSlugs: ['arabic-keyboard-fixer', 'arabic-text-cleaner', 'remove-invisible-characters'],
    liveProcessingDefault: true,
  },
  {
    slug: 'arabic-word-counter',
    id: 'arabic-word-counter',
    name: {
      ar: 'عداد الكلمات والحروف العربية',
      en: 'Arabic Word Counter',
    },
    shortDescription: {
      ar: 'إحصائيات فورية مفصلة: الكلمات العربية، الكلمات اللاتينية، الحروف، الأسطر، ووقت القراءة.',
      en: 'Live detailed statistics: Arabic words, Latin words, characters, sentences, and estimated reading time.',
    },
    fullDescription: {
      ar: 'عداد احترافي مصمم خصيصاً لخصائص النص العربي. يميز بدقة بين الكلمات العربية والأجنبية والأرقام ويقدم تحليلاً شاملاً للنص.',
      en: 'Detailed text analyzer tailored for Arabic typography. Distinguishes Arabic words, Latin tokens, digits, and calculates reading velocity.',
    },
    category: 'writing',
    isPopular: false,
    iconName: 'BarChart3',
    seo: {
      title: {
        ar: 'عداد الكلمات والحروف للنص العربي أونلاين مجاناً | ArabicFix',
        en: 'Arabic Word Counter & Character Count Online | ArabicFix',
      },
      metaDescription: {
        ar: 'احسب عدد الكلمات والحروف العربية والإنجليزية والأسطر ووقت القراءة بدقة مع هذا العداد المجاني والسريع.',
        en: 'Free online Arabic word and character counter. Calculate words, characters, sentences, and reading duration in real-time.',
      },
      ogTitle: {
        ar: 'عداد الكلمات والحروف للنص العربي',
        en: 'Arabic Word & Character Counter Tool',
      },
      ogDescription: {
        ar: 'إحصائيات حية ودقيقة للنصوص العربية والإنجليزية مع تقدير وقت القراءة.',
        en: 'Real-time text stats distinguishing Arabic and Latin vocabularies.',
      },
      keywords: ['عداد الكلمات', 'حساب عدد الحروف', 'arabic word counter', 'arabic character counter'],
    },
    howItWorks: {
      ar: [
        'يقوم بتحليل السلاسل النصية باستخدام تعبيرات يونيكود قياسية للتمييز بين النطاقات اللغوية.',
        'يحسب الكلمات الصافية باستبعاد علامات الترقيم، ويقدر زمن القراءة بناء على معدل 180 كلمة/دقيقة.',
      ],
      en: [
        'Tokenizes text with localized regex patterns matching distinct script blocks.',
        'Computes net metrics ignoring punctuation, estimating reading duration at ~180 words/min.',
      ],
    },
    whyUse: {
      ar: [
        'كتابة المقالات وفق معايير السيو (SEO) المطلوبة لمحركات البحث.',
        'التأكد من التزام المنشورات بعدد الحروف المسموح في منصات التواصل مثل X.',
        'حساب تكلفة الترجمة بالكلمة بدقة للمترجمين المستقلين.',
      ],
      en: [
        'Ensure blog posts fulfill ideal SEO article length requirements.',
        'Validate post character limits on platforms like X (Twitter), LinkedIn, and Instagram.',
        'Compute accurate translation costs per source word for freelance linguists.',
      ],
    },
    defaultInput: 'تعتبر اللغة العربية واحدة من أكثر لغات العالم انتشاراً وتنوعاً في مفرداتها وغناها الدلالي. يقدر عدد المتحدثين بها بأكثر من 400 مليون شخص حول العالم.',
    examples: [
      {
        title: { ar: 'نص مختلط لغتين', en: 'Bilingual text' },
        input: 'المشروع الجديد اسمه ArabicFix ويحتوي على 12 أداة مجانية للجميع.',
        output: '',
      },
    ],
    faqs: [
      {
        question: { ar: 'هل يُحسب التشكيل كحروف مستقلة؟', en: 'Are diacritics counted as characters?' },
        answer: {
          ar: 'في عداد الحروف الكلي يُحسب كل رمز يونيكود، بينما يُظهر لك العداد أيضاً الكلمات المكتملة بدقة.',
          en: 'The standard character counter measures raw Unicode code points while cleanly isolating word units.',
        },
      },
    ],
    relatedToolSlugs: ['arabic-text-cleaner', 'extract-arabic-text', 'normalize-arabic-text'],
    liveProcessingDefault: true,
  },
  {
    slug: 'remove-invisible-characters',
    id: 'remove-invisible-characters',
    name: {
      ar: 'إزالة الرموز والمحارف غير المرئية',
      en: 'Remove Invisible Characters',
    },
    shortDescription: {
      ar: 'كشف وإزالة محارف المسافة الصفرية (ZWSP)، ورموز التوجيه، والمحارف المخفية التي تعطل التنسيق.',
      en: 'Detect and purge zero-width spaces, directional marks, and hidden Unicode breakages.',
    },
    fullDescription: {
      ar: 'اكشف المحارف الخبيثة وغير المرئية التي تسبب أعطالاً في البرمجة، والبحث، وتنسيق الخط العربي، مع خياري التنظيف الآمن والقوي.',
      en: 'Scan and eliminate invisible Unicode gremlins (Zero-Width Space, directional override marks, hidden BOMs) that break code and typography.',
    },
    category: 'cleaning',
    isPopular: false,
    iconName: 'EyeOff',
    seo: {
      title: {
        ar: 'كشف وإزالة الحروف والرموز غير المرئية أونلاين | ArabicFix',
        en: 'Remove Invisible Characters & Zero-Width Spaces Online | ArabicFix',
      },
      metaDescription: {
        ar: 'أداة لكشف وحذف المسافات الصفرية والرموز الخفية من النصوص العربية والبرمجية لحل مشاكل التنسيق.',
        en: 'Detect and remove invisible Unicode characters, zero-width spaces, and directional marks online safely.',
      },
      ogTitle: {
        ar: 'كشف وحذف الحروف غير المرئية في النص',
        en: 'Remove Invisible Unicode Characters',
      },
      ogDescription: {
        ar: 'نظف نصوصك من رموز اليونيكود المخفية التي تسبب أخطاء غير مفهومة.',
        en: 'Sanitize hidden zero-width spaces and formatting markers from your text.',
      },
      keywords: ['حذف الرموز الخفية', 'مسافة صفرية', 'zero width space remover', 'invisible characters detector'],
    },
    howItWorks: {
      ar: [
        'يفحص النص بدقة رمزاً برمز لمطابقة رموز اليونيكود غير القابلة للطباعة.',
        'يعرض لك كشفاً تفصيلياً بأنواع وعدد الرموز الخفية المكتشفة قبل حذفها.',
        'يوفر وضع التنظيف الآمن (Safe) للحفاظ على خصائص اتصال الخط، ووضع التنظيف الشامل (Aggressive).',
      ],
      en: [
        'Inspects each character code against Unicode unprintable character blocks.',
        'Tallies and visualizes specific hidden codepoints found inside your text.',
        'Provides both "Safe Clean" (retains contextual cursive joiners) and "Aggressive Clean".',
      ],
    },
    whyUse: {
      ar: [
        'حل مشاكل فشل البحث ومطابقة الكلمات في قواعد البيانات ومحركات البحث.',
        'تنظيف الكود البرمجي والملفات النصية الحساسة كملفات JSON و YAML.',
        'منع حظر الحسابات أو مشاكل التحقق في المنصات الصارمة.',
      ],
      en: [
        'Fix mysterious search matching failures in databases and search engines.',
        'Clean invisible bug-inducing characters from JSON, YAML, and source code.',
        'Avoid input validation errors on strict online forms.',
      ],
    },
    defaultInput: 'مرحبا\u200Bبكم\u200E في\uFEFF هذا\u00A0المثال التجريبي\u202A لاختبار\u200B المحارف.',
    examples: [
      {
        title: { ar: 'مسافات صفرية مخفية', en: 'Zero-width space demo' },
        input: 'نص\u200Bيحتوي\u200Bعلى\u200Bفراغات\u200Bخفية',
        output: 'نصيحتويعلىفراغاتخفية',
      },
    ],
    faqs: [
      {
        question: { ar: 'ما الفرق بين التنظيف الآمن والشامل؟', en: 'Difference between Safe and Aggressive clean?' },
        answer: {
          ar: 'التنظيف الآمن يزيل المسافات الصفرية ورموز التوجيه مع الحفاظ على الفواصل الضرورية للرسم العثماني أو الكلمات المركبة، بينما الشامل يزيل كل شيء بلا استثناء.',
          en: 'Safe Clean leaves ZWNJ/ZWJ intact where needed for Arabic cursive rules, while Aggressive clean purges all non-printable codes.',
        },
      },
    ],
    relatedToolSlugs: ['arabic-text-cleaner', 'normalize-arabic-text', 'fix-reversed-arabic'],
    liveProcessingDefault: true,
  },
  {
    slug: 'arabic-keyboard-fixer',
    id: 'arabic-keyboard-fixer',
    name: {
      ar: 'تصحيح لغة لوحة المفاتيح',
      en: 'Arabic Keyboard Fixer',
    },
    shortDescription: {
      ar: 'إصلاح النصوص المكتوبة بالخطأ بحروف إنجليزية (مثل lvpfh إلى مرحبا) والعكس.',
      en: 'Convert accidental English typing into Arabic (e.g., "lvpfh" → "مرحبا") and vice versa.',
    },
    fullDescription: {
      ar: 'هل كتبت جملة طويلة لتكتشف أنك كنت تكتب باللغة الإنجليزية بالخطأ؟ حوّل تلك الحروف فوراً إلى الكلمات العربية المقابلة لها دون إعادة الكتابة.',
      en: 'Instantly convert text mistakenly typed on an English keyboard layout into its intended Arabic equivalent and vice versa.',
    },
    category: 'conversion',
    isPopular: true,
    iconName: 'Keyboard',
    seo: {
      title: {
        ar: 'تصحيح الكتابة بالخطأ باللغة الإنجليزية إلى عربية أونلاين | ArabicFix',
        en: 'Arabic Keyboard Layout Fixer – Convert Accidental English to Arabic | ArabicFix',
      },
      metaDescription: {
        ar: 'أصلح النصوص التي كتبتها بالإنجليزية بالخطأ وأنت تظن أنك تكتب بالعربية فوراً بضغطة زر وبدون إعادة الكتابة.',
        en: 'Convert accidentally typed keystrokes between Arabic 101 and English QWERTY keyboard layouts instantly.',
      },
      ogTitle: {
        ar: 'تصحيح لغة لوحة المفاتيح المكتوبة بالخطأ',
        en: 'Fix Wrong Keyboard Layout Arabic Text',
      },
      ogDescription: {
        ar: 'حوّل النصوص المكتوبة بلوحة المفاتيح الخاطئة إلى اللغة العربية الصحيحة فوراً.',
        en: 'Fix text typed while the wrong language layout was active on your keyboard.',
      },
      keywords: ['تصحيح الكيبورد', 'كتابة عربي بالغلط', 'keyboard layout fixer', 'accidental english to arabic', 'lvpfh to مرحبا'],
    },
    howItWorks: {
      ar: [
        'تعتمد الأداة على خريطة لوحة المفاتيح القياسية Arabic 101 / 102 QWERTY.',
        'تطابق كل زر إنجليزي ومفتاح Shift بالحرف العربي المقابل له في نفس الموقع.',
        'تدعم التبديل في كلا الاتجاهين بنقرة زر واحدة.',
      ],
      en: [
        'Maps physical key placements according to standard Arabic 101/102 QWERTY keyboard specifications.',
        'Matches each Latin key stroke and Shift modifier with its identical physical Arabic counterpart.',
        'Supports instant bidirectional swap with a single click.',
      ],
    },
    whyUse: {
      ar: [
        'توفير وقت إعادة كتابة الفقرات الطويلة المكتوبة باللغة الخاطئة.',
        'فهم الرسائل المشفرة الواردة من زملاء كتبوا بسرعة دون الانتباه للكيبورد.',
        'تصحيح الكلمات الفردية وعناوين الروابط الملتبسة.',
      ],
      en: [
        'Save time and frustration having to retype long sentences typed in the wrong layout.',
        'Decode incomprehensible messages sent by friends or colleagues who forgot to switch languages.',
        'Effortlessly swap between Arabic and English keyboard mappings.',
      ],
    },
    defaultInput: 'hgsghl ugd;l! ;dt phg;l hgd,l?',
    examples: [
      {
        title: { ar: 'تحية السلام', en: 'Greeting sample' },
        input: 'lvpfh fhguwhlm',
        output: 'مرحبا بالعالم',
      },
      {
        title: { ar: 'كيف حالك', en: 'How are you' },
        input: ';dt phg;',
        output: 'كيف حالك',
      },
    ],
    faqs: [
      {
        question: { ar: 'هل يدعم مفتاح Shift والحركات؟', en: 'Does it support Shift keys and Tashkeel?' },
        answer: {
          ar: 'نعم، يدعم الحروف مع Shift مثل علامات التشكيل والهمزات (مثال: Q -> َ فَتْحَة، H -> أ).',
          en: 'Yes, full Shift-key mappings including vowels and hamzas are mapped accurately.',
        },
      },
    ],
    relatedToolSlugs: ['arabizi-to-arabic', 'arabic-text-cleaner', 'arabic-punctuation-fixer'],
    supportsSwap: true,
    liveProcessingDefault: true,
  },
  {
    slug: 'arabic-punctuation-fixer',
    id: 'arabic-punctuation-fixer',
    name: {
      ar: 'تنسيق علامات الترقيم العربية',
      en: 'Arabic Punctuation Fixer',
    },
    shortDescription: {
      ar: 'تصحيح المسافات حول الفواصل العربية (،)، علامات الاستفهام (؟)، النقطتين، والأقواس.',
      en: 'Format spacing around Arabic commas (،), question marks (؟), colons, and brackets.',
    },
    fullDescription: {
      ar: 'أداة لتنسيق وتصحيح مواضع علامات الترقيم العربية. تلتصق العلامة بالكلمة التي قبلها مع ترك مسافة واحدة بعدها تلقائياً.',
      en: 'Format Arabic punctuation according to professional typographic standards. Removes ugly gaps before commas and ensures clean spacing after.',
    },
    category: 'formatting',
    isPopular: false,
    iconName: 'Quote',
    seo: {
      title: {
        ar: 'تنسيق علامات الترقيم العربية أونلاين مجاناً | ArabicFix',
        en: 'Arabic Punctuation Fixer – Format Commas & Quotes | ArabicFix',
      },
      metaDescription: {
        ar: 'أصلح مسافات الفواصل والنقاط وعلامات الاستفهام والأقواس في النص العربي باحترافية وسرعة في متصفحك.',
        en: 'Format Arabic commas, question marks, and punctuation spacing accurately online with zero hassle.',
      },
      ogTitle: {
        ar: 'تنسيق وتصحيح علامات الترقيم العربية',
        en: 'Arabic Punctuation Formatter',
      },
      ogDescription: {
        ar: 'تحسين المسافات حول الفواصل، النقاط، علامات الاستفهام، والأقواس في النصوص العربية.',
        en: 'Professional spacing rules for Arabic typography and punctuation marks.',
      },
      keywords: ['علامات الترقيم العربية', 'الفاصلة العربية', 'تنسيق النصوص', 'arabic punctuation fixer', 'format arabic typography'],
    },
    howItWorks: {
      ar: [
        'يقوم بإزالة أي مسافة سابقة لعلامات الترقيم: ( ، ؛ ؟ : . ! ).',
        'يضيف مسافة مفردة بعد علامة الترقيم إذا كان يتبعها حرف أو كلمة عربية.',
        'ينسق الأقواس وعلامات التنصيص بحيث لا تحتوي على فراغات داخلية زائدة.',
      ],
      en: [
        'Eliminates illegal spaces preceding punctuation marks (، ؛ ؟ : . !).',
        'Ensures exactly one space follows the mark if followed by words.',
        'Tightens brackets and quotes to avoid internal whitespace gaps.',
      ],
    },
    whyUse: {
      ar: [
        'اتباع المعايير الإملائية والطباعية المعتمدة في مجمع اللغة العربية.',
        'إضفاء مظهر احترافي وأنيق على الأبحاث والكتب والمقالات.',
        'تجنب النزول غير المنضبط لعلامة الترقيم في أول السطر التالي.',
      ],
      en: [
        'Adhere to modern Arabic editorial standards and academic publishing rules.',
        'Give a polished, professional aesthetic to reports, books, and articles.',
        'Prevent awkward line-wrapping where a comma drops alone onto a new line.',
      ],
    },
    defaultInput: 'مرحبا ،كيف حالك اليوم ؟أنا بخير ،والحمد لله ( كل الأمور على ما يرام ) .',
    examples: [
      {
        title: { ar: 'فواصل غير منسقة', en: 'Ugly spaced commas' },
        input: 'القراءة ، والكتابة ، والبحث .',
        output: 'القراءة، والكتابة، والبحث.',
      },
    ],
    faqs: [
      {
        question: { ar: 'هل الأداة تُغير محتوى الكلام؟', en: 'Does this change my text content?' },
        answer: {
          ar: 'كلا، الأداة مخصصة حصراً للتنسيق وضبط المسافات دون أي تعديل على المعنى أو المفردات.',
          en: 'No, this is strictly a spacing and formatting engine, not an AI rewriting tool.',
        },
      },
    ],
    relatedToolSlugs: ['arabic-text-cleaner', 'normalize-arabic-text', 'remove-tashkeel'],
    liveProcessingDefault: true,
  },
  {
    slug: 'normalize-arabic-text',
    id: 'normalize-arabic-text',
    name: {
      ar: 'توحيد ومعايرة الحروف العربية',
      en: 'Normalize Arabic Text',
    },
    shortDescription: {
      ar: 'توحيد أشكال الألف (أ إ آ إلى ا) والياء المقصورة، وتصحيح الياء والكاف الفارسية.',
      en: 'Normalize varied forms of Alef (أ إ آ to ا), Alif Maqsura, and replace Persian Ye/Kaf.',
    },
    fullDescription: {
      ar: 'معايرة قياسية للحروف العربية لحل مشاكل البحث والمطابقة في قواعد البيانات. يمكنك التحكم بخيارات توحيد الألفات والهمزات والتاء المربوطة.',
      en: 'Standardize irregular Arabic characters for search indexing and database harmonization. Granularly choose which normalizations apply.',
    },
    category: 'formatting',
    isPopular: false,
    iconName: 'FileCheck',
    seo: {
      title: {
        ar: 'توحيد ومعايرة الحروف العربية أونلاين | ArabicFix',
        en: 'Normalize Arabic Text Online – Standardize Alef & Ya | ArabicFix',
      },
      metaDescription: {
        ar: 'وحّد أشكال الألف والياء والهمزات في النصوص العربية لتسهيل الفهرسة والبحث والمقارنة بدقة وسرعة.',
        en: 'Normalize Arabic characters, convert Persian letters, and harmonize orthography online free.',
      },
      ogTitle: {
        ar: 'توحيد ومعايرة الحروف العربية',
        en: 'Normalize Arabic Orthography',
      },
      ogDescription: {
        ar: 'أداة متقدمة لمعايرة النص العربي وتوحيد الألفات والهمزات للبحث وقواعد البيانات.',
        en: 'Clean and standardize Arabic letters for indexing and NLP preprocessing.',
      },
      keywords: ['توحيد الحروف العربية', 'معايرة النص', 'normalize arabic text', 'arabic nlp preprocessing', 'alef normalization'],
    },
    howItWorks: {
      ar: [
        'يقوم بتوحيد أشكال الألف المختلفة (أ، إ، آ، ٱ) إلى ألف مجردة (ا).',
        'يحول الألف المقصورة (ى) إلى ياء (ي) عند اختيار ذلك.',
        'يحول الياء الفارسية (ی) والكاف الفارسية (ک) إلى الحروف العربية القياسية المقابلة.',
      ],
      en: [
        'Unifies multiple Alef variants (أ, إ, آ, ٱ) into a bare Alef (ا).',
        'Optionally transforms terminal Alif Maqsura (ى) to Ya (ي).',
        'Corrects Persian-specific code points (ی, ک) back to canonical Arabic Unicode (ي, ك).',
      ],
    },
    whyUse: {
      ar: [
        'معالجة النصوص قبل تدريب نماذج الذكاء الاصطناعي ومعالجة اللغات الطبيعية (NLP).',
        'تحسين نتائج البحث في المواقع والتطبيقات بحيث يجد المستخدم الكلمة بغض النظر عن طريقة كتابة الهمزة.',
        'تصحيح خلط الحروف الفارسية والعربية الشائع في لوحات المفاتيح المتنقلة.',
      ],
      en: [
        'Preprocessing step for Arabic NLP pipelines and tokenization.',
        'Improve search accuracy so queries match regardless of Hamza typing discrepancies.',
        'Fix accidental Persian letters injected by non-Arabic system keyboards.',
      ],
    },
    defaultInput: 'إنَّ الإِنسانَ فِي هَذَا العَالَمِ يَسْعَى إِلَى النَّجَاحِ. أَحْمَد وَإِبْرَاهِيم فِي مصر.',
    examples: [
      {
        title: { ar: 'معايرة الألفات والهمزات', en: 'Alef normalization' },
        input: 'أحمد وإبراهيم وآمنة',
        output: 'احمد وابراهيم وامنة',
      },
    ],
    faqs: [
      {
        question: { ar: 'لماذا خيار التاء المربوطة (ة -> ه) معطل افتراضياً؟', en: 'Why is Ta Marbuta (ة -> ه) off by default?' },
        answer: {
          ar: 'لأن تحويل التاء المربوطة إلى هاء يغير المعنى اللغوي والإعرابي، لذلك تركناه كخيار يدوي صريح فقط لمن يحتاجه.',
          en: 'Because turning ة into ه alters semantic spelling and grammar. It is available only if explicitly enabled.',
        },
      },
    ],
    relatedToolSlugs: ['arabic-text-cleaner', 'remove-tashkeel', 'arabic-punctuation-fixer'],
    liveProcessingDefault: true,
  },
  {
    slug: 'extract-arabic-text',
    id: 'extract-arabic-text',
    name: {
      ar: 'استخراج النص العربي من النصوص المختلطة',
      en: 'Extract Arabic Text',
    },
    shortDescription: {
      ar: 'عزل واستخراج الكلمات العربية فقط، أو اللاتينية فقط، أو الأرقام من النصوص المختلطة والشيفرات.',
      en: 'Filter and extract Arabic words, English words, or numbers from mixed documents and code.',
    },
    fullDescription: {
      ar: 'استخرج النصوص العربية النقية من ملفات البرمجة، والبيانات المزدوجة، والنصوص متعددة اللغات دون إضاعة الوقت في الحذف اليدوي.',
      en: 'Extract pure Arabic text from bilingual documents, logs, mixed spreadsheets, and codebases automatically.',
    },
    category: 'utilities',
    isPopular: false,
    iconName: 'Scissors',
    seo: {
      title: {
        ar: 'استخراج وفلترة النص العربي من النصوص المختلطة أونلاين | ArabicFix',
        en: 'Extract Arabic Text Online – Filter Arabic Words from Mixed Content | ArabicFix',
      },
      metaDescription: {
        ar: 'استخرج الكلمات العربية أو الإنجليزية أو الأرقام فقط من النصوص المختلطة بنقرة واحدة مباشرة من متصفحك.',
        en: 'Isolate and extract Arabic characters, Latin text, or numerical digits from mixed strings and logs easily.',
      },
      ogTitle: {
        ar: 'استخراج الكلمات العربية من النصوص المختلطة',
        en: 'Extract Arabic Words from Mixed Strings',
      },
      ogDescription: {
        ar: 'أداة لفرز وعزل المحتوى العربي من النصوص متعددة اللغات وقواعد البيانات.',
        en: 'Separate Arabic, English, and numbers from complex mixed content.',
      },
      keywords: ['استخراج النص العربي', 'عزل الكلمات العربية', 'extract arabic text', 'filter arabic words', 'regex arabic extractor'],
    },
    howItWorks: {
      ar: [
        'يقوم المحرك بفرز الحروف حسب فئات اليونيكود الخاصة بكل لغة ونظام أرقام.',
        'يمكنك اختيار استخراج: العربي فقط، الإنجليزي فقط، الأرقام فقط، أو العربي مع الأرقام.',
        'يوفر خيار الحفاظ على تقسيم الأسطر الأصلية لسهولة مطابقة الجداول.',
      ],
      en: [
        'Splits characters based on Unicode script block boundaries.',
        'Supports filtering modes: Arabic only, Latin only, Numbers only, or Arabic + Numbers.',
        'Preserves line structure so multi-line inputs remain well-organized.',
      ],
    },
    whyUse: {
      ar: [
        'استخراج الترجمات العربية من ملفات لغات البرمجة (JSON, PO, XML).',
        'تنظيف البيانات المستوردة من ملفات Excel متعددة الأعمدة واللغات.',
        'استخراج أرقام الهواتف أو التواريخ المعزولة في مستندات طويلة.',
      ],
      en: [
        'Extract translated Arabic strings from localization files (JSON, PO, XML).',
        'Clean mixed multi-language records exported from spreadsheets.',
        'Isolate Arabic customer comments or phone lists from log files.',
      ],
    },
    defaultInput: 'Product #4820: شاشة حاسوب عالية الدقة (Ultra HD Monitor) بسعر 299 USD فقط مع كفالة سنتين 2 years warranty.',
    examples: [
      {
        title: { ar: 'مزيج إنجليزي وعربي', en: 'Mixed English and Arabic' },
        input: 'Hello مرحبا world كيف الحال 123',
        output: 'مرحبا كيف الحال',
      },
    ],
    faqs: [
      {
        question: { ar: 'هل يحافظ على ترتيب الكلمات؟', en: 'Does it preserve word sequence?' },
        answer: {
          ar: 'نعم، يتم استخراج الكلمات العربية متتالية بنفس ترتيب ظهورها الأصلي في النص.',
          en: 'Yes, extracted tokens maintain their original sequential order in the document.',
        },
      },
    ],
    relatedToolSlugs: ['arabic-word-counter', 'arabic-text-cleaner', 'arabic-number-converter'],
    liveProcessingDefault: true,
  },
  {
    slug: 'arabizi-to-arabic',
    id: 'arabizi-to-arabic',
    name: {
      ar: 'تحويل لغة الشات والفرانكو (عربيزي) إلى عربية',
      en: 'Arabizi to Arabic',
    },
    shortDescription: {
      ar: 'تحويل كلمات الفرانكو/العربيزي وأرقام الشات (3 = ع، 7 = ح) إلى نصوص عربية مقروءة.',
      en: 'Transliterate Franco-Arabic / Arabizi chat slang (3=ع, 7=ح) into standard Arabic script.',
    },
    fullDescription: {
      ar: 'أداة فورية لتحويل لغة الشات والأرقام اللاتينية (Arabizi / Franco) إلى كلمات عربية صحيحة مع دعم الأرقام المشهورة مثل 2, 3, 5, 7, 8, 9 والتركيبات الصوتية.',
      en: 'Transliteration tool converting Arabizi / Franco-Arabic chat text and number substitutions (3 for Ain, 7 for Haa, 5 for Khaa) into readable Arabic.',
    },
    category: 'conversion',
    isPopular: true,
    iconName: 'Languages',
    seo: {
      title: {
        ar: 'تحويل الفرانكو عرب إلى عربي أونلاين مجاناً | Arabizi to Arabic | ArabicFix',
        en: 'Arabizi to Arabic Converter – Transliterate Franco Arabic Online | ArabicFix',
      },
      metaDescription: {
        ar: 'حوّل نصوص الفرانكو عرب ولغة الشات إلى لغة عربية سليمة ومقروءة أونلاين بدون تسجيل وبكل سهولة.',
        en: 'Convert Franco-Arabic (Arabizi) numbers and Latin letters to real Arabic script instantly online.',
      },
      ogTitle: {
        ar: 'تحويل لغة الفرانكو والعربيزي إلى عربي',
        en: 'Arabizi to Arabic Transliteration Tool',
      },
      ogDescription: {
        ar: 'أداة مجانية وسريعة لتحويل رسائل الشات بالأرقام إلى كتابة عربية واضحة.',
        en: 'Instantly decode Arabizi chat messages into clean Arabic words.',
      },
      keywords: ['تحويل الفرانكو الى عربي', 'عربيزي الى عربي', 'arabizi to arabic', 'franco arabic converter', 'chat arabic translator'],
    },
    howItWorks: {
      ar: [
        'يقارن الكلمات بقاموس الكلمات الشائعة أولاً (marhaba -> مرحبا، shukran -> شكرا).',
        'يحول الحروف المزدوجة والأصوات المركبة: sh -> ش، gh -> غ، kh -> خ، th -> ث.',
        'يستبدل أرقام الفرانكو الصوتية: 3 -> ع، 7 -> ح، 5 -> خ، 6 -> ط، 8 -> ق، 9 -> ص.',
        'ملاحظة: التحويل هو تقريب صوتي وقد يتطلب تدقيقاً يدوياً لبعض الكلمات المحلية.',
      ],
      en: [
        'Matches terms against a dictionary of frequent vernacular expressions.',
        'Resolves consonant digraphs (sh, gh, kh, th, dh).',
        'Substitutes numerical phonemes (3 for ع, 7 for ح, 5 for خ, 6 for ط, 8 for ق, 9 for ص).',
        'Note: Arabizi transliteration is approximate and may require minor manual touch-ups.',
      ],
    },
    whyUse: {
      ar: [
        'قراءة الرسائل الواردة المكتوبة بلغة الفرانكو بسرعة وسهولة.',
        'تحويل تعليقات العملاء في وسائل التواصل الاجتماعي إلى نصوص عربية قابلة للأرشفة.',
        'مساعدة غير المعتادين على قراءة لغة الشات والأرقام.',
      ],
      en: [
        'Decipher chat messages typed in Franco-Arabic with numeric phonetic markers.',
        'Transcribe social media customer feedback into standard Arabic for CRM archiving.',
        'Help users who struggle to read Latin-script colloquial Arabic dialects.',
      ],
    },
    defaultInput: 'salam kifak ya habibi? inshallah kul shi تمام. shukran bzaf 3la mosa3ada!',
    examples: [
      {
        title: { ar: 'رسالة ترحيبية', en: 'Greeting sample' },
        input: 'mar7aba keefak 3amel eh?',
        output: 'مرحبا كيفك عامل ايه؟',
      },
    ],
    faqs: [
      {
        question: { ar: 'هل تحويل العربيزي دقيق 100%؟', en: 'Is Arabizi conversion 100% accurate?' },
        answer: {
          ar: 'نظراً لأن لغة الفرانكو تعتمد على لهجات متعددة وليس لها قواعد إملاء رسمية، فإن التحويل تقريبي ودقيق لأغلب الكلمات المتداولة، مع إمكانية تعديل النتيجة يدوياً بسهولة.',
          en: 'Because Arabizi represents varied regional dialects without official orthography, conversion is an approximate phonetic mapping that is quick to refine.',
        },
      },
    ],
    relatedToolSlugs: ['arabic-keyboard-fixer', 'arabic-text-cleaner', 'arabic-punctuation-fixer'],
    liveProcessingDefault: true,
  },
];

export const TOOL_CATEGORIES = [
  { id: 'all', name: { ar: 'جميع الأدوات', en: 'All Tools' } },
  { id: 'cleaning', name: { ar: 'التنظيف والتنقية', en: 'Cleaning' } },
  { id: 'formatting', name: { ar: 'التنسيق والضبط', en: 'Formatting' } },
  { id: 'conversion', name: { ar: 'التحويل والترجمة', en: 'Conversion' } },
  { id: 'writing', name: { ar: 'الكتابة والإحصاء', en: 'Writing' } },
  { id: 'utilities', name: { ar: 'أدوات مساعدة', en: 'Utilities' } },
] as const;

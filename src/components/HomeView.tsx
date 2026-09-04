import React, { useState, useMemo } from 'react';
import {
  Search,
  Shield,
  Zap,
  Gift,
  Languages,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  X,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { Language, ToolDefinition } from '../types';
import { TOOLS, TOOL_CATEGORIES } from '../data/tools';
import { ToolCard } from './ToolCard';

interface HomeViewProps {
  currentLang: Language;
  onSelectTool: (slug: string) => void;
  onNavigateAbout: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ currentLang, onSelectTool, onNavigateAbout }) => {
  const isAr = currentLang === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Filter tools by search query and category
  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;

      if (!searchQuery.trim()) {
        return matchesCategory;
      }

      const q = searchQuery.toLowerCase().trim();
      const matchesNameAr = tool.name.ar.toLowerCase().includes(q);
      const matchesNameEn = tool.name.en.toLowerCase().includes(q);
      const matchesDescAr = tool.shortDescription.ar.toLowerCase().includes(q);
      const matchesDescEn = tool.shortDescription.en.toLowerCase().includes(q);
      const matchesKeywords = tool.seo.keywords.some((k) => k.toLowerCase().includes(q));

      return matchesCategory && (matchesNameAr || matchesNameEn || matchesDescAr || matchesDescEn || matchesKeywords);
    });
  }, [searchQuery, selectedCategory]);

  const popularShortcuts = [
    { slug: 'remove-tashkeel', label: { ar: 'حذف التشكيل', en: 'Remove Tashkeel' } },
    { slug: 'fix-reversed-arabic', label: { ar: 'إصلاح العربي المقلوب', en: 'Fix Reversed Arabic' } },
    { slug: 'arabic-number-converter', label: { ar: 'تحويل الأرقام', en: 'Arabic Numbers' } },
    { slug: 'arabic-text-cleaner', label: { ar: 'تنظيف النص', en: 'Clean Text' } },
    { slug: 'arabic-keyboard-fixer', label: { ar: 'تصحيح الكيبورد', en: 'Keyboard Fixer' } },
    { slug: 'arabizi-to-arabic', label: { ar: 'عربيزي إلى عربي', en: 'Arabizi to Arabic' } },
  ];

  const homepageFaqs = [
    {
      q: {
        ar: 'هل منصة ArabicFix مجانية بالكامل؟',
        en: 'Is ArabicFix completely free?',
      },
      a: {
        ar: 'نعم، 100% مجانية دون أي رسوم خفية أو قيود على عدد الكلمات، ولا يتطلب استخدامها تسجيل حساب.',
        en: 'Yes, completely free with no hidden charges, no word limits, and no account registration required.',
      },
    },
    {
      q: {
        ar: 'هل تُرفع نصوصي أو تُحفظ على خوادم المنصة؟',
        en: 'Is my text uploaded or stored on your servers?',
      },
      a: {
        ar: 'كلا على الإطلاق. تتم معالجة النصوص محلياً وفورياً داخل متصفحك عبر لغة JavaScript. نصوصك لا تغادر جهازك أبداً.',
        en: 'Never. All processing runs entirely client-side in your browser via JavaScript. Your text never leaves your device memory.',
      },
    },
    {
      q: {
        ar: 'كيف أصلح مشكلة الحروف المعكوسة من ملفات الـ PDF؟',
        en: 'How do I repair reversed Arabic text from PDFs?',
      },
      a: {
        ar: 'استخدم أداة "إصلاح النص العربي المقلوب". الصق النص وسيقوم النظام بتعديل ترتيب الحروف ومعايرة أشكال الحروف المفصولة لتظهر متصلة وقابلة للقراءة.',
        en: 'Use the "Fix Reversed Arabic" tool. Paste your text, and the engine automatically reverses characters per line and normalizes disconnected PDF presentation forms.',
      },
    },
    {
      q: {
        ar: 'هل تعمل الأدوات على أجهزة الهواتف الذكية؟',
        en: 'Do the tools work on mobile smartphones?',
      },
      a: {
        ar: 'نعم، تم تصميم المنصة بالكامل لتكون متجاوبة وخفيفة وسريعة على كافة مقاسات الشاشات والهواتف الذكية.',
        en: 'Yes, ArabicFix is responsive, lightweight, and optimized for iPhone, Android, and desktop screens.',
      },
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* HERO SECTION - Bold Typography styling */}
      <section className="bg-white border-b border-[#E2E8F0] px-4 sm:px-8 py-10 sm:py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Sub-badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#EFF6FF] text-[#2563EB] border border-blue-100 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
            <span>
              {isAr
                ? 'أدوات بسيطة لإصلاح وتنظيف وتحويل النص العربي'
                : 'Arabic text tools that should have existed years ago'}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 tracking-tight leading-tight text-[#111827]">
            {isAr ? (
              <>
                صلّح النص العربي في <span className="text-[#2563EB]">ثوانٍ.</span>
              </>
            ) : (
              <>
                Fix Arabic text in <span className="text-[#2563EB]">seconds.</span>
              </>
            )}
          </h1>

          {/* Supporting Copy */}
          <p className="text-[#64748B] text-base sm:text-lg mb-8 font-medium max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? 'نظّف، وحوّل، ونسّق، وأصلح النص العربي مباشرة داخل متصفحك. معالجة فورية ومجانية بخصوصية 100% وبدون تسجيل.'
              : 'Clean, convert, format, and repair Arabic text directly in your browser.'}
          </p>

          {/* Search Box */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <div className="relative flex items-center">
              <div className={`absolute top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none ${isAr ? 'right-4' : 'left-4'}`}>
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <input
                type="text"
                id="home-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isAr
                    ? 'ماذا تريد أن تصلح في النص؟ (مثلاً: حذف التشكيل، إصلاح الأرقام، العربي المقلوب...)'
                    : 'What do you want to fix? (e.g. remove tashkeel, fix numbers, reversed text...)'
                }
                className={`w-full py-3.5 sm:py-4 rounded-xl border border-[#E2E8F0] shadow-sm focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none text-base sm:text-lg text-[#111827] placeholder:text-[#94A3B8] transition-all ${
                  isAr ? 'pr-12 pl-10' : 'pl-12 pr-10'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className={`absolute top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer ${
                    isAr ? 'left-4' : 'right-4'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Popular Tool Shortcuts */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              {isAr ? 'الأكثر طلباً:' : 'Popular:'}
            </span>
            {popularShortcuts.map((item) => (
              <button
                key={item.slug}
                onClick={() => onSelectTool(item.slug)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-semibold text-[#111827] cursor-pointer transition-colors"
              >
                {item.label[currentLang]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN BENTO / SIDEBAR & TOOL GRID SECTION */}
      <section id="tools-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ASIDE / CATEGORIES SIDEBAR */}
          <aside className="lg:col-span-3 space-y-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-widest">
                {isAr ? 'التصنيفات' : 'Categories'}
              </h3>
              <span className="text-xs font-semibold text-[#94A3B8]">
                {TOOLS.length} {isAr ? 'أداة' : 'tools'}
              </span>
            </div>

            {/* Category Buttons List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
              {TOOL_CATEGORIES.map((cat) => {
                const count = cat.id === 'all' ? TOOLS.length : TOOLS.filter((t) => t.category === cat.id).length;
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    id={`cat-${cat.id}`}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border border-[#2563EB] shadow-xs text-[#2563EB]'
                        : 'bg-white border border-[#E2E8F0] hover:border-slate-300 text-[#64748B] hover:text-[#111827]'
                    }`}
                  >
                    <span className="truncate">{cat.name[currentLang]}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        isSelected ? 'bg-blue-50 text-[#2563EB]' : 'bg-slate-100 text-[#64748B]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Distinctive Privacy Banner Card (matching Design HTML) */}
            <div className="mt-6 p-4 bg-[#2563EB] rounded-2xl text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase opacity-80 mb-1 tracking-wider">
                  {isAr ? 'الخصوصية أولاً' : 'Privacy First'}
                </p>
                <p className="text-sm leading-snug font-medium">
                  {isAr
                    ? 'لا يتم حفظ أي بيانات. جميع المعالجات تجري محلياً داخل متصفحك.'
                    : 'No data is stored. All processing happens in your browser.'}
                </p>
              </div>
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
            </div>
          </aside>

          {/* MAIN TOOLS CONTENT (COL-SPAN-9) */}
          <div className="lg:col-span-9 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <h2 className="text-lg font-bold text-[#111827] tracking-tight">
                {selectedCategory === 'all'
                  ? isAr
                    ? 'جميع الأدوات'
                    : 'All Utilities'
                  : TOOL_CATEGORIES.find((c) => c.id === selectedCategory)?.name[currentLang]}
              </h2>
              <span className="text-xs font-semibold text-[#64748B]">
                {isAr
                  ? `عرض ${filteredTools.length} من أصل ${TOOLS.length} أداة`
                  : `Showing ${filteredTools.length} of ${TOOLS.length} tools`}
              </span>
            </div>

            {/* Empty search state */}
            {filteredTools.length === 0 ? (
              <div className="text-center py-16 bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-xs">
                <Search className="w-10 h-10 text-[#94A3B8] mx-auto mb-3" />
                <h3 className="text-base font-bold text-[#111827] mb-1">
                  {isAr ? 'لم يتم العثور على أداة مطابقة' : 'No tools matched your search'}
                </h3>
                <p className="text-xs text-[#64748B] mb-4">
                  {isAr ? 'جرب البحث بكلمات أخرى أو اختر فئة مختلفة' : 'Try searching with different keywords or reset filters.'}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="text-xs font-bold text-[#2563EB] hover:underline underline-offset-4 cursor-pointer"
                >
                  {isAr ? 'إعادة ضبط البحث' : 'Reset search filter'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 auto-rows-min">
                {filteredTools.map((tool) => (
                  <ToolCard
                    key={tool.slug}
                    tool={tool}
                    currentLang={currentLang}
                    onSelect={onSelectTool}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WHY ARABICFIX? VALUE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight mb-2">
            {isAr ? 'لماذا تختار ArabicFix؟' : 'Why ArabicFix?'}
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] font-medium">
            {isAr
              ? 'صممت المنصة لتوفر تجربة سريعة وخالية من التعقيد، تماماً كما يجب أن تكون أدوات الويب.'
              : 'Engineered to be fast, honest, and clutter-free, exactly how web utilities should be.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Private */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-100">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111827] mb-1.5">
                {isAr ? 'خصوصية تامة' : '100% Private'}
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                {isAr
                  ? 'معالجة النصوص تتم مباشرة في متصفحك ولا تُرسل أو تُحفظ على خوادمنا.'
                  : 'Text is processed locally in your browser memory and never uploaded to any server.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              {isAr ? 'بدون سيرفرات خارجية' : 'Zero Server Uploads'}
            </div>
          </div>

          {/* Card 2: Fast */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4 border border-blue-100">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111827] mb-1.5">
                {isAr ? 'سرعة فائقة' : 'Instant Processing'}
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                {isAr
                  ? 'معالجة لحظية وتلقائية أثناء الكتابة دون الحاجة لانتظار تحميل صفحات الخادم.'
                  : 'Real-time transforms update as you type without waiting for server network hops.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
              {isAr ? 'معالجة في أجزاء من الثانية' : 'Sub-millisecond Speed'}
            </div>
          </div>

          {/* Card 3: Free */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 border border-purple-100">
                <Gift className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111827] mb-1.5">
                {isAr ? 'مجاني بدون تسجيل' : 'Free Without Signup'}
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                {isAr
                  ? 'لا توجد أي نوافذ تسجيل دخول أو اشتراكات شهرية، افتح الأداة واستخدمها فوراً.'
                  : 'Zero paywalls, no forced registrations, and no email newsletter lockouts.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] font-bold text-purple-700 uppercase tracking-wider">
              {isAr ? 'أدوات مفتوحة للجميع' : 'Unlimited Free Use'}
            </div>
          </div>

          {/* Card 4: Arabic-First */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-100">
                <Languages className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111827] mb-1.5">
                {isAr ? 'مصمم خصيصاً للعربية' : 'Arabic-First Design'}
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                {isAr
                  ? 'مبني وفق خصائص الخط وقواعد الإملاء وتطبيقات اليونيكود الخاصة بالنص العربي.'
                  : 'Tailored specifically for Arabic typography, BiDi rules, and Unicode character sets.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] font-bold text-amber-700 uppercase tracking-wider">
              {isAr ? 'دعم كامل للكشيدة والتشكيل' : 'Complete Harakat & BiDi Support'}
            </div>
          </div>
        </div>
      </section>

      {/* HOMEPAGE FAQS SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-[#2563EB] bg-[#EFF6FF] px-3 py-1 rounded-full mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isAr ? 'الأسئلة المتكررة' : 'Common Questions'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">
            {isAr ? 'كل ما تود معرفته عن المنصة' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="space-y-3">
          {homepageFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-xs">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-start bg-white hover:bg-slate-50 transition-colors flex items-center justify-between text-sm sm:text-base font-bold text-[#111827] cursor-pointer"
                >
                  <span>{faq.q[currentLang]}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#64748B] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#64748B] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 py-4 text-sm text-[#64748B] leading-relaxed border-t border-[#E2E8F0] bg-[#F8FAFC]">
                    {faq.a[currentLang]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* BOTTOM ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2563EB] text-white rounded-3xl p-8 sm:p-12 shadow-lg shadow-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-start">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {isAr ? 'جاهز لتنظيف وتنسيق نصوصك؟' : 'Ready to repair your Arabic text?'}
            </h2>
            <p className="text-blue-100 text-sm sm:text-base max-w-xl font-medium">
              {isAr
                ? 'اختر أداة من الأدوات أعلاه، والصق النص وابدأ الآن مجاناً وبدون أي تسجيل.'
                : 'Pick a tool above, paste your text, and get instant results with zero hassle.'}
            </p>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('tools-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="shrink-0 bg-white hover:bg-slate-100 text-[#2563EB] font-bold px-6 py-3.5 rounded-xl text-sm sm:text-base shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>{isAr ? 'تصفح الـ 12 أداة الآن' : 'Browse All 12 Tools'}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </section>
    </div>
  );
};

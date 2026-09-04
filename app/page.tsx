import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield,
  Zap,
  Gift,
  Languages,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { TOOLS } from '../data/tools';
import { HomeToolsExplorer } from '../components/HomeToolsExplorer';
import { SITE_URL, SITE_NAME } from '../lib/site-config';

export const metadata: Metadata = {
  title: 'ArabicFix | أدوات بسيطة لإصلاح وتنظيف وتحويل النص العربي',
  description:
    'أدوات مجانية وسريعة وخاصة لإصلاح النص العربي، حذف التشكيل، إزالة الكشيدة، تحويل الأرقام، معالجة العربي المقلوب، وتصحيح لوحة المفاتيح مباشرة في المتصفح.',
  alternates: {
    canonical: `${SITE_URL}/`,
  },
};

const HOMEPAGE_FAQS = [
  {
    q: 'هل تحفظ المنصة نصوصي أو تنقلها لأي خادم؟',
    a: 'لا نهائياً. جميع خوارزميات المعالجة (حذف التشكيل، إصلاح العربي المقلوب، تحويل الأرقام، إزالة الرموز الخفية، إلخ) تعمل محلياً 100% داخل ذاكرة متصفحك عبر لغة JavaScript. لا نرفع أو نسجل أو نشارك أي كلمة تكتبها.',
  },
  {
    q: 'هل أحتاج لإنشاء حساب أو دفع أي رسوم؟',
    a: 'ArabicFix منصة مجانية بالكامل ومفتوحة للجميع دون أي قيود، وبدون الحاجة لإنشاء حساب، وبدون بطاقات ائتمان أو باقات اشتراك.',
  },
  {
    q: 'كيف يمكنني حل مشكلة النص العربي المقلوب من ملفات PDF؟',
    a: 'افتح أداة "إصلاح العربي المقلوب"، والصق النص المنسوخ من ملف الـ PDF. ستقوم الأداة فوراً بعكس ترتيب الحروف وإعادة وصل الحروف المتقطعة لتصبح صالحة للقراءة والاستخدام.',
  },
  {
    q: 'هل تعمل الأدوات بدون اتصال بالإنترنت (Offline)؟',
    a: 'نعم، بمجرد تحميل الصفحة في متصفحك، يمكنك فصل الإنترنت وستستمر جميع أدوات التنسيق والتنظيف بالعمل بكفاءة تامة لأن المعالجة تتم بجهازك.',
  },
];

export default function HomePage() {
  // Schema.org WebSite structured data
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'أدوات بسيطة لإصلاح وتنظيف وتحويل النص العربي مباشرة في المتصفح.',
    inLanguage: 'ar',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/#tools-section`,
      'query-input': 'required name=search_term_string',
    },
  };

  // Schema.org FAQPage structured data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOMEPAGE_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Structured Data Scripts */}
      <script
        id="website-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main H1 */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#111827] tracking-tight leading-[1.1] mb-6">
            صلّح النص العربي في ثوانٍ.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#64748B] max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
            مجموعة أدوات مجانية وسريعة وخاصة لحذف التشكيل، إزالة الكشيدة، تحويل الأرقام،
            إصلاح العربي المقلوب، وتصحيح الكيبورد مباشرة في متصفحك.
          </p>

          {/* Tools Explorer with Search and Grid */}
          <div id="tools-section">
            <HomeToolsExplorer tools={TOOLS} />
          </div>
        </div>
      </section>

      {/* WHY ARABICFIX? VALUE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight mb-2">
            لماذا تختار ArabicFix؟
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] font-medium">
            صممت المنصة لتوفر تجربة سريعة وخالية من التعقيد، تماماً كما يجب أن تكون أدوات الويب.
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
                خصوصية تامة 100%
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                معالجة النصوص تتم مباشرة في متصفحك ولا تُرسل أو تُحفظ على خوادمنا أبداً.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              بدون سيرفرات خارجية
            </div>
          </div>

          {/* Card 2: Fast */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4 border border-blue-100">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111827] mb-1.5">
                سرعة فائقة ولحظية
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                معالجة لحظية وتلقائية أثناء الكتابة دون الحاجة لانتظار تحميل صفحات الخادم.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
              معالجة في أجزاء من الثانية
            </div>
          </div>

          {/* Card 3: Free */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 border border-purple-100">
                <Gift className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111827] mb-1.5">
                مجاني بدون تسجيل
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                لا توجد أي نوافذ تسجيل دخول أو اشتراكات شهرية، افتح الأداة واستخدمها فوراً.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] font-bold text-purple-700 uppercase tracking-wider">
              أدوات مفتوحة للجميع
            </div>
          </div>

          {/* Card 4: Arabic-First */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-100">
                <Languages className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111827] mb-1.5">
                مصمم خصيصاً للعربية
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                مبني وفق خصائص الخط وقواعد الإملاء وتطبيقات اليونيكود الخاصة بالنص العربي.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] font-bold text-amber-700 uppercase tracking-wider">
              دعم كامل للكشيدة والتشكيل
            </div>
          </div>
        </div>
      </section>

      {/* HOMEPAGE FAQS SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-[#2563EB] bg-[#EFF6FF] px-3 py-1 rounded-full mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>الأسئلة المتكررة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">
            كل ما تود معرفته عن المنصة
          </h2>
        </div>

        <div className="space-y-3">
          {HOMEPAGE_FAQS.map((faq, idx) => (
            <details
              key={idx}
              className="group bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-xs"
            >
              <summary className="w-full px-5 py-4 text-start bg-white hover:bg-slate-50 transition-colors flex items-center justify-between text-sm sm:text-base font-bold text-[#111827] cursor-pointer list-none">
                <span>{faq.q}</span>
                <ChevronDown className="w-4 h-4 text-[#64748B] shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="px-5 py-4 text-sm text-[#64748B] leading-relaxed border-t border-[#E2E8F0] bg-[#F8FAFC]">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* BOTTOM ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2563EB] text-white rounded-3xl p-8 sm:p-12 shadow-lg shadow-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-start">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              جاهز لتنظيف وتنسيق نصوصك؟
            </h2>
            <p className="text-blue-100 text-sm sm:text-base max-w-xl font-medium">
              اختر أداة من الأدوات أعلاه، والصق النص وابدأ الآن مجاناً وبدون أي تسجيل.
            </p>
          </div>

          <Link
            href="/#tools-section"
            className="shrink-0 bg-white hover:bg-slate-100 text-[#2563EB] font-bold px-6 py-3.5 rounded-xl text-sm sm:text-base shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>تصفح الـ 12 أداة الآن</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

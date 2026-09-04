import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Shield,
  Sparkles,
  Info,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { TOOLS } from '../../../data/tools';
import { ToolWorkbench } from '../../../components/ToolWorkbench';
import { ToolExampleButton } from '../../../components/ToolExampleButton';
import { ToolCard } from '../../../components/ToolCard';
import { SITE_URL, SITE_NAME } from '../../../lib/site-config';

type Props = {
  params: Promise<{ slug: string }>;
};

// 1. Static Generation for all 12 tools
export async function generateStaticParams() {
  return TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

// 2. Dynamic SEO Metadata for every tool
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);

  if (!tool) {
    return {
      title: 'الأداة غير موجودة | ArabicFix',
      description: 'عذراً، الأداة المطلوبة غير متوفرة في ArabicFix.',
    };
  }

  const canonicalUrl = `${SITE_URL}/tools/${tool.slug}`;

  return {
    title: tool.seo.title.ar,
    description: tool.seo.metaDescription.ar,
    keywords: tool.seo.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'ar_AR',
      alternateLocale: 'en_US',
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: tool.seo.ogTitle.ar,
      description: tool.seo.ogDescription.ar,
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.seo.ogTitle.ar,
      description: tool.seo.ogDescription.ar,
    },
  };
}

// 3. Server-Rendered Tool Page Component
export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = TOOLS.filter((t) => tool.relatedToolSlugs.includes(t.slug));

  // Schema.org WebApplication
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name.ar,
    description: tool.fullDescription.ar,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    url: `${SITE_URL}/tools/${tool.slug}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  // Schema.org FAQPage
  const faqSchema =
    tool.faqs && tool.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: tool.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question.ar,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer.ar,
            },
          })),
        }
      : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Structured Data JSON-LD */}
      <script
        id="webapp-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      {faqSchema && (
        <script
          id="tool-faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Header breadcrumbs & Title (Server-rendered HTML) */}
      <div className="mb-6">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-[#64748B] mb-3">
          <Link href="/" className="hover:text-[#2563EB] font-semibold">
            الرئيسية
          </Link>
          <span>/</span>
          <Link href="/#tools-section" className="hover:text-[#2563EB] text-[#94A3B8]">
            الأدوات
          </Link>
          <span>/</span>
          <span className="text-[#111827] font-bold">{tool.name.ar}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            {/* Clear Single H1 */}
            <h1 className="text-2xl sm:text-4xl font-black text-[#111827] tracking-tight">
              {tool.name.ar}
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-[#64748B] max-w-3xl leading-relaxed font-medium">
              {tool.fullDescription.ar}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/80 font-semibold">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>معالجة محلية 100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Client-Side Interactive Workbench (Options, Editor Textareas, Stats) */}
      <ToolWorkbench tool={tool} />

      {/* SEO & Educational Sections (100% Server-rendered HTML before JS) */}
      <div className="mt-16 space-y-10">
        {/* How it works & Why use this tool */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* How it works */}
          <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
            <h2 className="text-lg font-black text-[#111827] tracking-tight mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#2563EB]" />
              <span>كيف تعمل هذه الأداة؟</span>
            </h2>
            <ul className="space-y-2.5 text-sm text-[#64748B] leading-relaxed list-disc list-inside">
              {tool.howItWorks.ar.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </section>

          {/* Why use this tool */}
          <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
            <h2 className="text-lg font-black text-[#111827] tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#2563EB]" />
              <span>لماذا تستخدم هذه الأداة؟</span>
            </h2>
            <ul className="space-y-2.5 text-sm text-[#64748B] leading-relaxed list-disc list-inside">
              {tool.whyUse.ar.map((reason, idx) => (
                <li key={idx}>{reason}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Real-World Examples */}
        {tool.examples && tool.examples.length > 0 && (
          <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
            <h2 className="text-lg font-black text-[#111827] tracking-tight mb-4">
              أمثلة واقعية سريعة
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tool.examples.map((example, idx) => (
                <div key={idx} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2563EB]">{example.title.ar}</span>
                    <ToolExampleButton sampleText={example.input} label="تجربة هذا المثال" />
                  </div>
                  <div className="text-xs text-[#64748B] font-semibold">قبل المعالجة:</div>
                  <div className="text-xs font-mono bg-white p-2.5 rounded-lg border border-[#E2E8F0] text-[#111827] break-all">
                    {example.input}
                  </div>
                  {example.output && (
                    <>
                      <div className="text-xs text-[#64748B] font-semibold">بعد المعالجة:</div>
                      <div className="text-xs font-mono bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200 text-emerald-950 break-all font-medium">
                        {example.output}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Privacy Guarantee Banner */}
        <div className="bg-[#2563EB] text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 relative z-10">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm text-white shrink-0 mt-0.5">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight">
                نصوصك في أمان تام ولا تغادر جهازك
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 mt-1 leading-relaxed max-w-2xl font-medium">
                جميع العمليات الحسابية وتعديل النصوص تتم فورياً عبر محرك الجافاسكريبت الداخلي في متصفحك. لا نقوم بحفظ أو إرسال النصوص إلى أي خوادم أو أطراف ثالثة.
              </p>
            </div>
          </div>
          <div className="shrink-0 text-xs font-bold text-[#2563EB] bg-white px-3.5 py-2 rounded-xl shadow-xs relative z-10">
            بدون تسجيل حساب
          </div>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        {/* Frequently Asked Questions */}
        {tool.faqs && tool.faqs.length > 0 && (
          <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
            <h2 className="text-lg font-black text-[#111827] tracking-tight mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#2563EB]" />
              <span>الأسئلة الشائعة حول الأداة</span>
            </h2>
            <div className="space-y-3">
              {tool.faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group border border-[#E2E8F0] rounded-xl overflow-hidden bg-white"
                >
                  <summary className="w-full px-4 py-3.5 text-start bg-white hover:bg-slate-50 transition-colors flex items-center justify-between text-sm font-bold text-[#111827] cursor-pointer list-none">
                    <span>{faq.question.ar}</span>
                    <ChevronDown className="w-4 h-4 text-[#64748B] shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="px-4 py-3.5 bg-[#F8FAFC] text-sm text-[#64748B] leading-relaxed border-t border-[#E2E8F0]">
                    {faq.answer.ar}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-[#111827] tracking-tight">
                أدوات أخرى ذات صلة
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedTools.map((relTool) => (
                <ToolCard key={relTool.slug} tool={relTool} currentLang="ar" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

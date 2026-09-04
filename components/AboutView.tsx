'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Sparkles, Zap, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export const AboutView: React.FC = () => {
  const { lang, isAr } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--icon-bg)] text-[var(--icon-text)] border border-[var(--icon-text)]/20 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[var(--icon-text)]" />
          <span>{isAr ? 'من نحن ورؤيتنا' : 'About & Mission'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[var(--foreground)] tracking-tight mb-4">
          {isAr ? 'أدوات النص العربي التي كان ينبغي أن توجد منذ سنوات' : 'Arabic text tools that should have existed years ago'}
        </h1>
        <p className="text-base sm:text-lg text-[var(--secondary-foreground)] leading-relaxed max-w-2xl mx-auto font-medium">
          {isAr
            ? 'ArabicFix منصة مجانية وسريعة متخصصة في حل مشاكل الحروف والخطوط والنصوص العربية اليومية مباشرة من متصفحك دون تسجيل أو تعقيد.'
            : 'ArabicFix is a free, lightning-fast utility platform focused entirely on solving daily Arabic typography and text formatting challenges directly in your browser.'}
        </p>
      </div>

      {/* Story & Philosophy */}
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 mb-10">
        <div>
          <h2 className="text-xl font-black text-[var(--foreground)] tracking-tight mb-3">
            {isAr ? 'لماذا أنشأنا ArabicFix؟' : 'Why We Created ArabicFix?'}
          </h2>
          <p className="text-sm sm:text-base text-[var(--secondary-foreground)] leading-relaxed font-medium">
            {isAr
              ? 'كل كاتب، ومطور، وباحث يتعامل مع اللغة العربية واجه مراراً مشاكل مزعجة: نسخ نصوص مقلوبة من ملفات PDF، مسافات صفرية غير مرئية تعطل محركات البحث، كلمات مشكولة يصعب فهرستها، أو فقرات طويلة كُتبت بالإنجليزية بالخطأ بسبب نسيان تبديل لغة لوحة المفاتيح.'
              : 'Every writer, developer, and translator working with Arabic has repeatedly bumped into painful bottlenecks: reversed letters from PDFs, invisible zero-width bugs corrupting database indexes, heavily vocalized texts breaking search queries, or long paragraphs typed mistakenly in the English layout.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border)]">
          <div className="bg-[var(--card-bg)] p-4 rounded-xl border border-[var(--border)]">
            <div className="w-8 h-8 rounded-lg bg-[var(--icon-bg)] text-[var(--icon-text)] flex items-center justify-center mb-2 font-black border border-[var(--icon-text)]/10">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[var(--foreground)] mb-1">{isAr ? 'فوري وسريع' : 'Instant Speed'}</h3>
            <p className="text-xs text-[var(--secondary-foreground)] font-medium">
              {isAr ? 'معالجة مباشرة أثناء الكتابة بدون أي تأخير.' : 'Live processing as you type with zero lag.'}
            </p>
          </div>

          <div className="bg-[var(--card-bg)] p-4 rounded-xl border border-[var(--border)]">
            <div className="w-8 h-8 rounded-lg bg-[var(--icon-bg)] text-[var(--icon-text)] flex items-center justify-center mb-2 font-black border border-[var(--icon-text)]/10">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[var(--foreground)] mb-1">{isAr ? 'أمان وخصوصية 100%' : '100% Private'}</h3>
            <p className="text-xs text-[var(--secondary-foreground)] font-medium">
              {isAr ? 'نصوصك لا ترفع إلى خادم وتتم المعالجة في المتصفح.' : 'Your text never leaves your device memory.'}
            </p>
          </div>

          <div className="bg-[var(--card-bg)] p-4 rounded-xl border border-[var(--border)]">
            <div className="w-8 h-8 rounded-lg bg-[var(--icon-bg)] text-[var(--icon-text)] flex items-center justify-center mb-2 font-black border border-[var(--icon-text)]/10">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[var(--foreground)] mb-1">{isAr ? 'مجاني بدون تسجيل' : 'No Account Needed'}</h3>
            <p className="text-xs text-[var(--secondary-foreground)] font-medium">
              {isAr ? 'افتح الأداة، الصق النص، انسخ النتيجة، وانتهى الأمر.' : 'Open tool, paste text, copy result, and leave.'}
            </p>
          </div>
        </div>
      </div>

      {/* CTA to browse tools */}
      <div className="text-center">
        <Link
          href="/#tools-section"
          className="inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] font-bold px-7 py-3.5 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer text-sm"
        >
          <span>{isAr ? 'تصفح جميع الأدوات الآن' : 'Explore All Tools Now'}</span>
          {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </Link>
      </div>
    </div>
  );
};
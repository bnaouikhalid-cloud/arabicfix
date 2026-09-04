'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, ShieldCheck, Scale, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export const TermsView: React.FC = () => {
  const { isAr } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#2563EB] border border-blue-200/60 mb-4">
          <Scale className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>{isAr ? 'شروط الخدمة والاستخدام' : 'Terms of Service'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tight mb-4">
          {isAr ? 'شروط استخدام بسيطة وشفافة' : 'Simple and Transparent Terms'}
        </h1>
        <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto font-medium">
          {isAr
            ? 'ArabicFix منصة أدوات مجانية ومفتوحة للجميع. هذه الشروط توضح حقوقك وكيفية استخدام الخدمة بأمان.'
            : 'ArabicFix is a free, open utility platform. These terms explain your rights and how to use the service safely.'}
        </p>
      </div>

      {/* Content */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
        <div>
          <h2 className="text-lg font-black text-[#111827] tracking-tight mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#2563EB]" />
            <span>{isAr ? '1. الاستخدام المجاني والمفتوح' : '1. Free and Open Use'}</span>
          </h2>
          <p className="text-sm text-[#64748B] leading-relaxed font-medium">
            {isAr
              ? 'تتيح منصة ArabicFix استخدام كافة أدوات معالجة النصوص مجاناً لأي غرض شخصي، أو أكاديمي، أو تجاري دون الحاجة لأي تسجيل حساب أو دفع رسوم اشتراك.'
              : 'ArabicFix grants free access to all text processing utilities for personal, academic, and commercial purposes without subscriptions or registration.'}
          </p>
        </div>

        <div className="pt-6 border-t border-[#E2E8F0]">
          <h2 className="text-lg font-black text-[#111827] tracking-tight mb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{isAr ? '2. ملكية النصوص وسريتها' : '2. Text Ownership and Confidentiality'}</span>
          </h2>
          <p className="text-sm text-[#64748B] leading-relaxed font-medium">
            {isAr
              ? 'أنت المالك الحصري لأي نصوص تدخلها في أدواتنا. نظراً لأن جميع المعالجات تجري محلياً داخل متصفحك، فإن ArabicFix لا تطالب بأي حقوق ملكية فكرية ولا تطلع على نصوصك إطلاقاً.'
              : 'You retain full ownership of all text processed using our utilities. Because processing runs in your browser, ArabicFix claims no rights and never inspects your content.'}
          </p>
        </div>

        <div className="pt-6 border-t border-[#E2E8F0]">
          <h2 className="text-lg font-black text-[#111827] tracking-tight mb-2">
            {isAr ? '3. إخلاء المسؤولية ("كما هي")' : '3. Disclaimer of Warranties'}
          </h2>
          <p className="text-sm text-[#64748B] leading-relaxed font-medium">
            {isAr
              ? 'تُقدم الأدوات "كما هي" دون ضمانات صريحة أو ضمنية لسلامة النتائج بنسبة 100% في جميع الحالات الشاذة. يُنصح دائماً بالتحقق من النصوص الحساسة أو المستندات الرسمية قبل اعتمادها.'
              : 'Our utilities are provided on an "as-is" basis without warranties. Users are encouraged to review critical documents before final publication.'}
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/#tools-section"
          className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-7 py-3.5 rounded-xl shadow-xs transition-all text-sm"
        >
          <span>{isAr ? 'العودة إلى الأدوات' : 'Back to Tools'}</span>
          {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </Link>
      </div>
    </div>
  );
};

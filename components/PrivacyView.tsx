'use client';

import React from 'react';
import { Shield, Lock, EyeOff, ServerOff, DatabaseZap } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export const PrivacyView: React.FC = () => {
  const { lang, isAr } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 mb-4">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span>{isAr ? 'التزام الخصوصية المطلق' : 'Privacy Guarantee'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tight mb-4">
          {isAr ? 'نصوصك تبقى ملكك وتحت سيطرتك الكاملة' : 'Your text stays private. Always.'}
        </h1>
        <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto font-medium">
          {isAr
            ? 'نحن لا نطلب منك إنشاء حساب، ولا نرفع نصوصك إلى أي خادم، ولا نستخدم بياناتك لتدريب نماذج الذكاء الاصطناعي.'
            : 'We do not ask for signups, we never upload your text to any server, and we never use your words to train AI models.'}
        </p>
      </div>

      {/* Privacy Pillars */}
      <div className="space-y-6">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row gap-5 items-start">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <ServerOff className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-[#111827] tracking-tight mb-2">
              {isAr ? '1. معالجة محلية بالكامل داخل المتصفح' : '1. 100% In-Browser Local Processing'}
            </h2>
            <p className="text-sm text-[#64748B] leading-relaxed font-medium">
              {isAr
                ? 'تعمل كافة أدوات المنصة (حذف التشكيل، تصحيح الكيبورد، تنظيف الأسطر، تحويل الأرقام، فحص الرموز الخفية، إلخ) بواسطة شيفرات JavaScript المنفذة داخل متصفحك مباشرة. بمجرد تحميل الصفحة، يمكنك فصل اتصال الإنترنت وستستمر الأدوات بالعمل بكفاءة.'
                : 'All utility algorithms execute inside your local browser runtime via JavaScript. Once loaded, you can even disconnect your internet connection and the tools will continue functioning perfectly.'}
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row gap-5 items-start">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0 border border-blue-100">
            <DatabaseZap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-[#111827] tracking-tight mb-2">
              {isAr ? '2. انعدام تخزين النصوص في قواعد البيانات' : '2. Zero Text Storage or Database Retention'}
            </h2>
            <p className="text-sm text-[#64748B] leading-relaxed font-medium">
              {isAr
                ? 'لا نمتلك أي خوادم لتسجيل أو أرشفة النصوص المدخلة أو النتائج المستخرجة. عندما تغلق المتصفح أو تمسح الصندوق، تُمحى البيانات فوراً من ذاكرة الوصول العشوائي لجهازك.'
                : 'We operate zero databases for logging, intercepting, or storing user inputs and outputs. Once you close the tab or click Clear, all input data disappears from RAM.'}
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row gap-5 items-start">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
            <EyeOff className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-[#111827] tracking-tight mb-2">
              {isAr ? '3. لا تتبع أو ملفات تعريف ارتباط مزعجة' : '3. No Intrusive Tracking or Cookie Walls'}
            </h2>
            <p className="text-sm text-[#64748B] leading-relaxed font-medium">
              {isAr
                ? 'نحن لا نطلب منك الموافقة على نوافذ ملفات تعريف الارتباط المزعجة ولا نبيع بيانات تصفحك لأي شبكات إعلانية.'
                : 'No annoying cookie banners, tracking walls, or data brokers. ArabicFix is built as a pure, clean utility platform.'}
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row gap-5 items-start">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-[#111827] tracking-tight mb-2">
              {isAr ? '4. اتصالات مشفرة عبر HTTPS' : '4. Secure HTTPS Delivery'}
            </h2>
            <p className="text-sm text-[#64748B] leading-relaxed font-medium">
              {isAr
                ? 'يتم تسليم موقع ArabicFix عبر بروتوكول التشفير الآمن (HTTPS/TLS) لضمان عدم اعتراض أو تعديل الكود أثناء نقله إلى متصفحك.'
                : 'ArabicFix assets are delivered securely over modern encrypted HTTPS/TLS protocols ensuring tamper-free delivery.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

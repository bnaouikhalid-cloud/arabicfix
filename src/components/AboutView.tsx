import React from 'react';
import { Shield, Sparkles, Zap, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface AboutViewProps {
  currentLang: Language;
  onNavigateTools: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ currentLang, onNavigateTools }) => {
  const isAr = currentLang === 'ar';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>{isAr ? 'من نحن ورؤيتنا' : 'About & Mission'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tight mb-4">
          {isAr ? 'أدوات النص العربي التي كان ينبغي أن توجد منذ سنوات' : 'Arabic text tools that should have existed years ago'}
        </h1>
        <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto font-medium">
          {isAr
            ? 'ArabicFix منصة مجانية وسريعة متخصصة في حل مشاكل الحروف والخطوط والنصوص العربية اليومية مباشرة من متصفحك دون تسجيل أو تعقيد.'
            : 'ArabicFix is a free, lightning-fast utility platform focused entirely on solving daily Arabic typography and text formatting challenges directly in your browser.'}
        </p>
      </div>

      {/* Story & Philosophy */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 mb-10">
        <div>
          <h2 className="text-xl font-black text-[#111827] tracking-tight mb-3">
            {isAr ? 'لماذا أنشأنا ArabicFix؟' : 'Why We Created ArabicFix?'}
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed font-medium">
            {isAr
              ? 'كل كاتب، ومطور، وباحث يتعامل مع اللغة العربية واجه مراراً مشاكل مزعجة: نسخ نصوص مقلوبة من ملفات PDF، مسافات صفرية غير مرئية تعطل محركات البحث، كلمات مشكولة يصعب فهرستها، أو فقرات طويلة كُتبت بالإنجليزية بالخطأ بسبب نسيان تبديل لغة لوحة المفاتيح.'
              : 'Every writer, developer, and translator working with Arabic has repeatedly bumped into painful bottlenecks: reversed letters from PDFs, invisible zero-width bugs corrupting database indexes, heavily vocalized texts breaking search queries, or long paragraphs typed mistakenly in the English layout.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E2E8F0]">
          <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center mb-2 font-black border border-blue-100">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#111827] mb-1">{isAr ? 'فوري وسريع' : 'Instant Speed'}</h3>
            <p className="text-xs text-[#64748B] font-medium">
              {isAr ? 'معالجة مباشرة أثناء الكتابة بدون أي تأخير.' : 'Live processing as you type with zero lag.'}
            </p>
          </div>

          <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 font-black border border-emerald-100">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#111827] mb-1">{isAr ? 'أمان وخصوصية 100%' : '100% Private'}</h3>
            <p className="text-xs text-[#64748B] font-medium">
              {isAr ? 'نصوصك لا ترفع إلى خادم وتتم المعالجة في المتصفح.' : 'Your text never leaves your device memory.'}
            </p>
          </div>

          <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2 font-black border border-indigo-100">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#111827] mb-1">{isAr ? 'مجاني بدون تسجيل' : 'No Account Needed'}</h3>
            <p className="text-xs text-[#64748B] font-medium">
              {isAr ? 'افتح الأداة، الصق النص، انسخ النتيجة، وانتهى الأمر.' : 'Open tool, paste text, copy result, and leave.'}
            </p>
          </div>
        </div>
      </div>

      {/* CTA to browse tools */}
      <div className="text-center">
        <button
          onClick={onNavigateTools}
          className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-7 py-3.5 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer text-sm"
        >
          <span>{isAr ? 'تصفح جميع الأدوات الآن' : 'Explore All Tools Now'}</span>
          {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

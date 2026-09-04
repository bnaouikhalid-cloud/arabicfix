import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, Search, FileQuestion } from 'lucide-react';
import { TOOLS } from '../data/tools';
import { ToolCard } from '../components/ToolCard';

export default function NotFound() {
  const popularSlugs = [
    'remove-tashkeel',
    'arabic-text-cleaner',
    'fix-reversed-arabic',
    'arabic-number-converter',
  ];
  const popularTools = TOOLS.filter((t) => popularSlugs.includes(t.slug));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      {/* 404 Badge */}
      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto mb-6 border border-blue-100 shadow-xs">
        <FileQuestion className="w-8 h-8" />
      </div>

      <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 mb-3">
        خطأ 404 • الصفحة غير موجودة
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight mb-4">
        عذراً، لم نتمكن من العثور على هذه الأداة أو الصفحة
      </h1>

      <p className="text-base text-[#64748B] max-w-lg mx-auto mb-8 leading-relaxed font-medium">
        قد يكون الرابط الذي اتبعته غير صحيح أو تم تحديث مسار الأداة. يمكنك العودة للصفحة الرئيسية أو تجربة إحدى الأدوات الأكثر استخداماً أدناه.
      </p>

      {/* Back to Home Button */}
      <div className="mb-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-xs transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>العودة إلى الصفحة الرئيسية</span>
        </Link>
      </div>

      {/* Popular Tools */}
      <div className="text-start">
        <h2 className="text-lg font-black text-[#111827] mb-4">
          أدوات شائعة قد تبحث عنها:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {popularTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} currentLang="ar" />
          ))}
        </div>
      </div>
    </div>
  );
}

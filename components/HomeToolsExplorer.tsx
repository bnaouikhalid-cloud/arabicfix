'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { ToolDefinition } from '../types';
import { TOOL_CATEGORIES } from '../data/tools';
import { ToolCard } from './ToolCard';
import { useLanguage } from './LanguageContext';

interface HomeToolsExplorerProps {
  tools: ToolDefinition[];
}

export const HomeToolsExplorer: React.FC<HomeToolsExplorerProps> = ({ tools }) => {
  const { lang, isAr } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter tools by search query and category
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
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

      // Extra aliases support (e.g. تشكيل, حركات, كيبورد, ارقام, etc.)
      const isSearchTashkeel = (q.includes('تشكيل') || q.includes('حركات') || q.includes('تنوين')) && tool.slug === 'remove-tashkeel';
      const isSearchTatweel = (q.includes('كشيدة') || q.includes('تطويل') || q.includes('مد')) && tool.slug === 'remove-tatweel';
      const isSearchReversed = (q.includes('مقلوب') || q.includes('معكوس') || q.includes('pdf')) && tool.slug === 'fix-reversed-arabic';
      const isSearchKeyboard = (q.includes('كيبورد') || q.includes('لوحة') || q.includes('انجليزي')) && tool.slug === 'arabic-keyboard-fixer';
      const isSearchNumbers = (q.includes('ارقام') || q.includes('أرقام') || q.includes('هندية')) && tool.slug === 'arabic-number-converter';
      const isSearchInvisible = (q.includes('مخفية') || q.includes('صفرية') || q.includes('رموز')) && tool.slug === 'remove-invisible-characters';

      return (
        matchesCategory &&
        (matchesNameAr ||
          matchesNameEn ||
          matchesDescAr ||
          matchesDescEn ||
          matchesKeywords ||
          isSearchTashkeel ||
          isSearchTatweel ||
          isSearchReversed ||
          isSearchKeyboard ||
          isSearchNumbers ||
          isSearchInvisible)
      );
    });
  }, [tools, searchQuery, selectedCategory]);

  const popularShortcuts = [
    { slug: 'remove-tashkeel', label: { ar: 'حذف التشكيل', en: 'Remove Tashkeel' } },
    { slug: 'fix-reversed-arabic', label: { ar: 'إصلاح العربي المقلوب', en: 'Fix Reversed Arabic' } },
    { slug: 'arabic-number-converter', label: { ar: 'تحويل الأرقام', en: 'Arabic Numbers' } },
    { slug: 'arabic-text-cleaner', label: { ar: 'تنظيف النص', en: 'Clean Text' } },
    { slug: 'arabic-keyboard-fixer', label: { ar: 'تصحيح الكيبورد', en: 'Keyboard Fixer' } },
    { slug: 'arabizi-to-arabic', label: { ar: 'عربيزي إلى عربي', en: 'Arabizi to Arabic' } },
  ];

  return (
    <>
      {/* Search Box in Hero */}
      <div className="relative max-w-2xl mx-auto mb-6">
        <div className="relative flex items-center">
          <div
            className={`absolute top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none ${
              isAr ? 'right-4' : 'left-4'
            }`}
          >
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <input
            type="text"
            id="home-search-input"
            aria-label={isAr ? 'البحث في الأدوات' : 'Search tools'}
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
              aria-label={isAr ? 'مسح البحث' : 'Clear search'}
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
          <Link
            key={item.slug}
            href={`/tools/${item.slug}`}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-semibold text-[#111827] transition-colors"
          >
            {item.label[lang]}
          </Link>
        ))}
      </div>

      {/* Bento & Categories / Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-12 sm:mt-16">
        {/* Sidebar categories */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-[#64748B] uppercase tracking-widest">
              {isAr ? 'التصنيفات' : 'Categories'}
            </h2>
            <span className="text-xs font-semibold text-[#94A3B8]">
              {tools.length} {isAr ? 'أداة' : 'tools'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
            {TOOL_CATEGORIES.map((cat) => {
              const count = cat.id === 'all' ? tools.length : tools.filter((t) => t.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  id={`cat-${cat.id}`}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border border-[#2563EB] shadow-xs text-[#2563EB]'
                      : 'bg-white border border-[#E2E8F0] hover:border-slate-300 text-[#64748B] hover:text-[#111827]'
                  }`}
                >
                  <span className="truncate">{cat.name[lang]}</span>
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

          {/* Privacy Banner Card in Sidebar */}
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

        {/* Main Tools Grid */}
        <div className="lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
            <h2 className="text-lg font-bold text-[#111827] tracking-tight">
              {selectedCategory === 'all'
                ? isAr
                  ? 'جميع الأدوات'
                  : 'All Utilities'
                : TOOL_CATEGORIES.find((c) => c.id === selectedCategory)?.name[lang]}
            </h2>
            <span className="text-xs font-semibold text-[#64748B]">
              {isAr
                ? `عرض ${filteredTools.length} من أصل ${tools.length} أداة`
                : `Showing ${filteredTools.length} of ${tools.length} tools`}
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
                type="button"
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
                <ToolCard key={tool.slug} tool={tool} currentLang={lang} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

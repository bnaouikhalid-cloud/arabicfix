import React from 'react';
import { Shield, Sparkles, Heart } from 'lucide-react';
import { Language } from '../types';
import { TOOLS } from '../data/tools';

interface FooterProps {
  currentLang: Language;
  onSelectTool: (slug: string) => void;
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onNavigatePrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onSelectTool,
  onNavigateHome,
  onNavigateAbout,
  onNavigatePrivacy,
}) => {
  const isAr = currentLang === 'ar';

  const popularTools = TOOLS.filter((t) => t.isPopular).slice(0, 5);
  const formattingTools = TOOLS.filter((t) => t.category === 'formatting' || t.category === 'writing').slice(0, 4);

  return (
    <footer className="bg-white border-t border-[#E2E8F0] mt-20 transition-colors">
      {/* Privacy Banner strip */}
      <div className="bg-[#111827] text-slate-100 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2.5 text-center sm:text-start">
            <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
              <Shield className="w-4 h-4" />
            </span>
            <span>
              {isAr
                ? 'أمان مطلق: تتم معالجة النصوص محلياً داخل متصفحك ولا تُرسل أو تُحفظ في أي خادم.'
                : 'Zero-cloud guarantee: Processing happens directly inside your browser. No text is stored or sent to any server.'}
            </span>
          </div>
          <button
            onClick={onNavigatePrivacy}
            className="text-[#2563EB] hover:text-blue-400 underline underline-offset-4 text-xs font-bold cursor-pointer shrink-0"
          >
            {isAr ? 'سياسة الخصوصية الشفافة' : 'Learn about our privacy'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={onNavigateHome}>
              <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center text-white font-black text-base shadow-xs">
                ع<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 -mr-0.5 inline-block"></span>
              </div>
              <span className="font-black text-xl text-[#111827] tracking-tight">ArabicFix</span>
            </div>
            <p className="text-sm text-[#64748B] leading-relaxed font-medium">
              {isAr
                ? 'منصة أدوات مجانية وسريعة وخاصة لمعالجة وتنظيف وتنسيق النصوص والأرقام العربية مباشرة في المتصفح.'
                : 'Free, fast, and private online toolbox for fixing, cleaning, converting, and formatting Arabic text directly in your browser.'}
            </p>
            <div className="text-xs text-[#94A3B8] font-bold tracking-tight">
              {isAr
                ? 'أدوات بسيطة لإصلاح وتنظيف وتحويل النص العربي.'
                : 'Arabic text tools that should have existed years ago.'}
            </div>
          </div>

          {/* Col 2: Popular Tools */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#111827] mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>{isAr ? 'أدوات شائعة' : 'Popular Tools'}</span>
            </h4>
            <ul className="space-y-2 text-sm text-[#64748B] font-medium">
              {popularTools.map((tool) => (
                <li key={tool.slug}>
                  <button
                    onClick={() => onSelectTool(tool.slug)}
                    className="hover:text-[#2563EB] transition-colors text-start cursor-pointer"
                  >
                    {tool.name[currentLang]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Formatting & Utilities */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#111827] mb-3">
              {isAr ? 'التنسيق والتحويل' : 'Formatting & Conversion'}
            </h4>
            <ul className="space-y-2 text-sm text-[#64748B] font-medium">
              {formattingTools.map((tool) => (
                <li key={tool.slug}>
                  <button
                    onClick={() => onSelectTool(tool.slug)}
                    className="hover:text-[#2563EB] transition-colors text-start cursor-pointer"
                  >
                    {tool.name[currentLang]}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onSelectTool('arabizi-to-arabic')}
                  className="hover:text-[#2563EB] transition-colors text-start cursor-pointer"
                >
                  {isAr ? 'عربيزي إلى عربي' : 'Arabizi to Arabic'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: About & Transparency */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#111827] mb-3">
              {isAr ? 'عن المنصة والقانوني' : 'About & Legal'}
            </h4>
            <ul className="space-y-2 text-sm text-[#64748B] font-medium">
              <li>
                <button onClick={onNavigateAbout} className="hover:text-[#2563EB] transition-colors cursor-pointer">
                  {isAr ? 'حول ArabicFix' : 'About ArabicFix'}
                </button>
              </li>
              <li>
                <button onClick={onNavigatePrivacy} className="hover:text-[#2563EB] transition-colors cursor-pointer">
                  {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
                </button>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#2563EB] transition-colors"
                >
                  {isAr ? 'خريطة الموقع (Sitemap)' : 'Sitemap.xml'}
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#2563EB] transition-colors"
                >
                  robots.txt
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 mt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B] font-medium">
          <p>© {new Date().getFullYear()} ArabicFix. {isAr ? 'أدوات بسيطة لنص عربي أفضل.' : 'Simple tools for better Arabic text.'}</p>
          <div className="flex items-center gap-1 text-[#94A3B8]">
            <span>{isAr ? 'صُمم بدقة لأجل المحتوى العربي' : 'Engineered with care for Arabic text'}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { Globe, Menu, X, Shield, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateHome: () => void;
  onNavigateTools: () => void;
  onNavigateAbout: () => void;
  onNavigatePrivacy: () => void;
  currentRoute: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onNavigateHome,
  onNavigateTools,
  onNavigateAbout,
  onNavigatePrivacy,
  currentRoute,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAr = currentLang === 'ar';

  const navItems = [
    {
      id: 'tools',
      label: isAr ? 'جميع الأدوات' : 'All Tools',
      onClick: () => {
        onNavigateTools();
        setMobileMenuOpen(false);
      },
      active: currentRoute === 'tools',
    },
    {
      id: 'about',
      label: isAr ? 'عن المنصة' : 'About',
      onClick: () => {
        onNavigateAbout();
        setMobileMenuOpen(false);
      },
      active: currentRoute === 'about',
    },
    {
      id: 'privacy',
      label: isAr ? 'الخصوصية' : 'Privacy',
      onClick: () => {
        onNavigatePrivacy();
        setMobileMenuOpen(false);
      },
      active: currentRoute === 'privacy',
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0] h-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo matching Bold Typography design */}
          <div className="flex items-center gap-2.5 cursor-pointer select-none" onClick={onNavigateHome} id="brand-logo-btn">
            <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-xs transition-colors hover:bg-[#1D4ED8]">
              <span>أ</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-[#111827]">
                ArabicFix
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-blue-50 text-[#2563EB] rounded-full border border-blue-100 hidden sm:inline-block">
                {isAr ? 'مجاني' : 'FREE'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#64748B]">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={item.onClick}
                className={`transition-colors cursor-pointer ${
                  item.active
                    ? 'text-[#2563EB] font-bold'
                    : 'text-[#64748B] hover:text-[#2563EB]'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Privacy indicator badge */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/70">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold">{isAr ? 'معالجة محلية 100%' : '100% In-Browser'}</span>
            </div>
          </nav>

          {/* Right Controls: Language & CTA */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              id="lang-toggle-btn"
              onClick={() => onLanguageChange(isAr ? 'en' : 'ar')}
              className="text-sm font-semibold text-[#2563EB] bg-[#EFF6FF] hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
              title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>{isAr ? 'English / العربية' : 'العربية / English'}</span>
            </button>

            {/* Main CTA */}
            <button
              id="header-cta-browse"
              onClick={onNavigateTools}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all cursor-pointer"
            >
              <span>{isAr ? 'ابدأ الآن' : 'Get Started'}</span>
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

            {/* Mobile menu trigger */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#64748B] hover:text-[#111827] hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E2E8F0] bg-white px-4 pt-3 pb-6 space-y-3 shadow-md">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`text-start px-3 py-2.5 rounded-lg text-base font-medium ${
                  item.active ? 'bg-[#EFF6FF] text-[#2563EB] font-bold' : 'text-[#111827] hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E2E8F0] flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigateTools();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-2.5 rounded-xl text-sm shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? 'تصفح جميع الأدوات (12 أداة)' : 'Browse All 12 Tools'}</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 py-2 rounded-lg border border-emerald-200/60 font-medium">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>{isAr ? 'نصوصك خاصة ومحمية في متصفحك' : 'No data stored • 100% in browser'}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

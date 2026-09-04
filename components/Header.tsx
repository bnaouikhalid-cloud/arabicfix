'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Menu, X, Shield, Sparkles, ArrowRight, ArrowLeft, Moon, Sun } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useTheme } from '../lib/theme';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, toggleLang, isAr } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname() || '/';

  const navItems = [
    {
      id: 'tools',
      label: isAr ? 'جميع الأدوات' : 'All Tools',
      href: '/#tools-section',
      active: pathname.startsWith('/tools'),
    },
    {
      id: 'about',
      label: isAr ? 'عن المنصة' : 'About',
      href: '/about',
      active: pathname === '/about',
    },
    {
      id: 'privacy',
      label: isAr ? 'الخصوصية' : 'Privacy',
      href: '/privacy',
      active: pathname === '/privacy',
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[var(--background)] border-b border-[var(--border)] h-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo matching Bold Typography design */}
          <Link
            href="/"
            className="flex items-center gap-2.5 select-none"
            id="brand-logo-btn"
          >
            <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center text-[var(--primary-foreground)] font-bold text-xl shadow-xs transition-colors hover:bg-[var(--primary-hover)]">
              <span>أ</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                ArabicFix
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[var(--icon-bg)] text-[var(--icon-text)] rounded-full border border-[var(--icon-text)]/10 hidden sm:inline-block">
                {isAr ? 'مجاني' : 'FREE'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--secondary-foreground)]">
            {navItems.map((item) => (
              <Link
                key={item.id}
                id={`nav-${item.id}`}
                href={item.href}
                className={`transition-colors ${
                  item.active
                    ? 'text-[var(--primary)] font-bold'
                    : 'text-[var(--secondary-foreground)] hover:text-[var(--primary)]'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Privacy indicator badge */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-[var(--success-text)] bg-[var(--success-bg)] px-2.5 py-1 rounded-full border border-[var(--success-border)]">
              <Shield className="w-3.5 h-3.5 text-[var(--success-text)]" />
              <span className="font-semibold">{isAr ? 'معالجة محلية 100%' : '100% In-Browser'}</span>
            </div>
          </nav>

          {/* Right Controls: Language, Theme & CTA */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              id="lang-toggle-btn"
              type="button"
              onClick={toggleLang}
              className="text-sm font-semibold text-[var(--icon-text)] bg-[var(--icon-bg)] hover:bg-[var(--primary)]/10 px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
              title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-[var(--icon-text)]" />
              <span>{isAr ? 'English / العربية' : 'العربية / English'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              type="button"
              className="p-2 rounded-lg text-[var(--secondary-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--primary)]/10 focus:outline-none flex items-center gap-1"
              title={isAr ? 'تبديل الوضع الليلي' : 'Toggle dark mode'}
              aria-label={isAr ? 'تبديل الوضع الليلي' : 'Toggle dark mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Main CTA */}
            <Link
              id="header-cta-browse"
              href="/#tools-section"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all cursor-pointer"
            >
              <span>{isAr ? 'ابدأ الآن' : 'Get Started'}</span>
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>

            {/* Mobile menu trigger */}
            <button
              id="mobile-menu-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[var(--secondary-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--primary)]/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border)] bg-[var(--background)] px-4 pt-3 pb-6 space-y-3 shadow-md">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-start px-3 py-2.5 rounded-lg text-base font-medium ${
                  item.active ? 'bg-[var(--icon-bg)] text-[var(--icon-text)] font-bold' : 'text-[var(--foreground)] hover:bg-[var(--primary)]/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[var(--border)] flex flex-col gap-2">
            <Link
              href="/#tools-section"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] font-semibold py-2.5 rounded-xl text-sm shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? 'تصفح جميع الأدوات (12 أداة)' : 'Browse All 12 Tools'}</span>
            </Link>

            <div className="flex items-center justify-center gap-1.5 text-xs text-[var(--success-text)] bg-[var(--success-bg)] py-2 rounded-lg border border-[var(--success-border)] font-medium">
              <Shield className="w-4 h-4 text-[var(--success-text)]" />
              <span>{isAr ? 'نصوصك خاصة ومحمية في متصفحك' : 'No data stored • 100% in browser'}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ToolLayout } from './components/ToolLayout';
import { AboutView } from './components/AboutView';
import { PrivacyView } from './components/PrivacyView';
import { TOOLS } from './data/tools';
import { Language, ToolDefinition } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('arabicfix_lang');
    return (saved === 'ar' || saved === 'en') ? saved : 'ar';
  });

  // Current route parsed from URL or hash
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
    if (!path || path === '') return 'home';
    if (path.startsWith('tools/')) {
      const slug = path.replace('tools/', '');
      return slug;
    }
    if (path === 'tools') return 'home';
    if (path === 'about') return 'about';
    if (path === 'privacy') return 'privacy';

    // Check if slug matches a tool directly
    const foundTool = TOOLS.find((t) => t.slug === path);
    if (foundTool) return foundTool.slug;

    return 'home';
  });

  // Update language in localStorage & DOM attributes
  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('arabicfix_lang', newLang);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Handle URL history navigation
  const navigateTo = (route: string, pushState = true) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushState) {
      let newPath = '/';
      if (route === 'home') newPath = '/';
      else if (route === 'about') newPath = '/about';
      else if (route === 'privacy') newPath = '/privacy';
      else newPath = `/tools/${route}`;

      window.history.pushState({ route }, '', newPath);
    }
  };

  // Listen to browser popstate (back / forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
      if (!path || path === '' || path === 'tools') {
        setCurrentRoute('home');
      } else if (path === 'about') {
        setCurrentRoute('about');
      } else if (path === 'privacy') {
        setCurrentRoute('privacy');
      } else if (path.startsWith('tools/')) {
        setCurrentRoute(path.replace('tools/', ''));
      } else {
        const found = TOOLS.find((t) => t.slug === path);
        setCurrentRoute(found ? found.slug : 'home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync document title and meta description dynamically based on current route
  useEffect(() => {
    const isAr = lang === 'ar';
    const activeTool = TOOLS.find((t) => t.slug === currentRoute);

    if (activeTool) {
      document.title = activeTool.seo.title[lang];
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', activeTool.seo.metaDescription[lang]);
      }
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', activeTool.seo.ogTitle[lang]);
      }
    } else if (currentRoute === 'about') {
      document.title = isAr ? 'عن المنصة ورسالتنا | ArabicFix' : 'About ArabicFix – Mission & Privacy';
    } else if (currentRoute === 'privacy') {
      document.title = isAr ? 'سياسة الخصوصية وأمان البيانات | ArabicFix' : 'Privacy Policy – Zero Data Retention | ArabicFix';
    } else {
      document.title = isAr
        ? 'ArabicFix – أدوات بسيطة لإصلاح وتنظيف النص العربي'
        : 'ArabicFix – Free Online Arabic Text Utilities & Cleaner';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          isAr
            ? 'ArabicFix: أدوات مجانية وسريعة لتنظيف وتشكيل وتحويل وتنسيق النصوص والأرقام العربية مباشرة في المتصفح بخصوصية تامة.'
            : 'Clean, convert, format, and repair Arabic text directly in your browser. Fast, free, and 100% private.'
        );
      }
    }
  }, [currentRoute, lang]);

  // Find active tool if on a tool route
  const currentTool: ToolDefinition | undefined = TOOLS.find((t) => t.slug === currentRoute);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Top sticky header */}
      <Header
        currentLang={lang}
        onLanguageChange={handleLanguageChange}
        onNavigateHome={() => navigateTo('home')}
        onNavigateTools={() => {
          if (currentRoute === 'home') {
            const el = document.getElementById('tools-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          } else {
            navigateTo('home');
            setTimeout(() => {
              const el = document.getElementById('tools-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        }}
        onNavigateAbout={() => navigateTo('about')}
        onNavigatePrivacy={() => navigateTo('privacy')}
        currentRoute={currentRoute}
      />

      {/* Main content body */}
      <main className="flex-1">
        {currentTool ? (
          <ToolLayout
            tool={currentTool}
            currentLang={lang}
            onSelectTool={(slug) => navigateTo(slug)}
            onNavigateHome={() => navigateTo('home')}
          />
        ) : currentRoute === 'about' ? (
          <AboutView
            currentLang={lang}
            onNavigateTools={() => navigateTo('home')}
          />
        ) : currentRoute === 'privacy' ? (
          <PrivacyView currentLang={lang} />
        ) : (
          <HomeView
            currentLang={lang}
            onSelectTool={(slug) => navigateTo(slug)}
            onNavigateAbout={() => navigateTo('about')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        currentLang={lang}
        onSelectTool={(slug) => navigateTo(slug)}
        onNavigateHome={() => navigateTo('home')}
        onNavigateAbout={() => navigateTo('about')}
        onNavigatePrivacy={() => navigateTo('privacy')}
      />
    </div>
  );
}

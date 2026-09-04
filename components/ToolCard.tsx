'use client';

import React from 'react';
import Link from 'next/link';
import {
  Eraser,
  Minus,
  Sparkles,
  Hash,
  RotateCcw,
  BarChart3,
  EyeOff,
  Keyboard,
  Quote,
  FileCheck,
  Scissors,
  Languages,
  ArrowRight,
  ArrowLeft,
  Flame,
} from 'lucide-react';
import { ToolDefinition, Language } from '../types';

interface ToolCardProps {
  tool: ToolDefinition;
  currentLang?: Language;
}

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  Eraser,
  Minus,
  Sparkles,
  Hash,
  RotateCcw,
  BarChart3,
  EyeOff,
  Keyboard,
  Quote,
  FileCheck,
  Scissors,
  Languages,
};

export const ToolCard: React.FC<ToolCardProps> = ({ tool, currentLang = 'ar' }) => {
  const isAr = currentLang === 'ar';
  const IconComponent = ICONS[tool.iconName] || Sparkles;

  const categoryLabels: Record<string, { ar: string; en: string }> = {
    cleaning: { ar: 'تنظيف', en: 'Cleaning' },
    formatting: { ar: 'تنسيق', en: 'Formatting' },
    conversion: { ar: 'تحويل', en: 'Conversion' },
    writing: { ar: 'كتابة', en: 'Writing' },
    utilities: { ar: 'أدوات', en: 'Utilities' },
  };

  return (
    <Link
      href={`/tools/${tool.slug}`}
      id={`tool-card-${tool.slug}`}
      className="bg-[var(--card-bg)] border border-[var(--border)] p-5 rounded-2xl shadow-xs hover:shadow-md hover:border-[var(--primary)]/50 transition-all duration-200 cursor-pointer relative group flex flex-col justify-between block text-start"
    >
      <div>
        {/* Top bar with Icon & Badges */}
        <div className="flex items-start justify-between mb-3">
          <div className="p-2.5 bg-[var(--icon-bg)] text-[var(--icon-text)] rounded-lg group-hover:bg-[var(--primary)]/10 group-hover:text-[var(--primary-foreground)] transition-colors duration-200">
            <IconComponent className="w-5 h-5 transition-transform duration-200 group-hover:scale-105" />
          </div>

          <div className="flex items-center gap-1.5">
            {tool.isPopular && (
              <span className="px-2 py-0.5 bg-[var(--success-bg)] text-[var(--success-text)] text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                <Flame className="w-3 h-3 text-[var(--success-text)] fill-[var(--success-text)]" />
                <span>{isAr ? 'شائع' : 'Popular'}</span>
              </span>
            )}
            <span className="px-2 py-0.5 bg-[var(--badge-bg)] text-[var(--badge-text)] text-[10px] font-bold rounded-full uppercase tracking-wider">
              {categoryLabels[tool.category]?.[currentLang] || tool.category}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="font-bold text-lg mb-1 text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors tracking-tight line-clamp-1">
          {tool.name[currentLang]}
        </h3>
        <p className="text-sm text-[var(--secondary-foreground)] leading-snug line-clamp-2 mb-2 font-normal">
          {tool.shortDescription[currentLang]}
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="mt-4 pt-3 border-t border-[var(--border)]/60 flex items-center justify-between text-[var(--primary)] font-bold text-xs">
        <span className="group-hover:underline underline-offset-4">{isAr ? 'افتح الأداة' : 'Open Tool'}</span>
        {isAr ? (
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
        ) : (
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        )}
      </div>
    </Link>
  );
};
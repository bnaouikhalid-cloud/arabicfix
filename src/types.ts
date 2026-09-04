export type Language = 'ar' | 'en';

export type ToolCategory = 'cleaning' | 'formatting' | 'conversion' | 'writing' | 'utilities';

export interface ToolSEO {
  title: { ar: string; en: string };
  metaDescription: { ar: string; en: string };
  ogTitle: { ar: string; en: string };
  ogDescription: { ar: string; en: string };
  keywords: string[];
}

export interface ToolExample {
  title: { ar: string; en: string };
  input: string;
  output: string;
  description?: { ar: string; en: string };
}

export interface ToolFAQ {
  question: { ar: string; en: string };
  answer: { ar: string; en: string };
}

export interface ToolDefinition {
  slug: string;
  id: string;
  name: { ar: string; en: string };
  shortDescription: { ar: string; en: string };
  fullDescription: { ar: string; en: string };
  category: ToolCategory;
  isPopular?: boolean;
  iconName: string;
  seo: ToolSEO;
  howItWorks: { ar: string[]; en: string[] };
  whyUse: { ar: string[]; en: string[] };
  defaultInput: string;
  examples: ToolExample[];
  faqs: ToolFAQ[];
  relatedToolSlugs: string[];
  supportsSwap?: boolean;
  liveProcessingDefault?: boolean;
}

export interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  arabicWords: number;
  latinWords: number;
  numbers: number;
  sentences: number;
  lines: number;
  readingTimeMinutes: number;
}

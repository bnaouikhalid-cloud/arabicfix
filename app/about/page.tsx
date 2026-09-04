import React from 'react';
import type { Metadata } from 'next';
import { AboutView } from '../../components/AboutView';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'عن المنصة | أدوات النص العربي التي كان ينبغي أن توجد منذ سنوات',
  description:
    'تعرف على رسالة ArabicFix وفلسفتنا في تقديم أدوات معالجة نصوص عربية سريعة وخاصة ومجانية 100% تعمل مباشرة في المتصفح.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return <AboutView />;
}

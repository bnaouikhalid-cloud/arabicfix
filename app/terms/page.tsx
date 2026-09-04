import React from 'react';
import type { Metadata } from 'next';
import { TermsView } from '../../components/TermsView';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'شروط الخدمة والاستخدام | ArabicFix',
  description:
    'شروط استخدام أدوات ArabicFix البسيطة والمجانية للاستخدام الشخصي، الأكاديمي، والتجاري دون قيود.',
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
};

export default function TermsPage() {
  return <TermsView />;
}

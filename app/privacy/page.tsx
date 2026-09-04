import React from 'react';
import type { Metadata } from 'next';
import { PrivacyView } from '../../components/PrivacyView';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'سياسة الخصوصية وأمان النصوص | ArabicFix',
  description:
    'التزام ArabicFix بالخصوصية: نصوصك لا تُرفع إلى أي خادم ولا تُحفظ في أي قاعدة بيانات، المعالجة تتم محلياً 100% في جهازك.',
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  return <PrivacyView />;
}

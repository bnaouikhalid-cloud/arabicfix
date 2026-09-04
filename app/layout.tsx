import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LanguageProvider } from '../components/LanguageContext';
import { SITE_URL } from '../lib/site-config';

export const viewport: Viewport = {
  themeColor: '#2563EB',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ArabicFix | أدوات بسيطة لإصلاح وتنظيف وتحويل النص العربي',
    template: '%s | ArabicFix',
  },
  description:
    'أدوات مجانية وسريعة وخاصة لإصلاح النص العربي، حذف التشكيل، إزالة الكشيدة، تحويل الأرقام، معالجة العربي المقلوب، وتصحيح لوحة المفاتيح مباشرة في المتصفح دون حفظ أي بيانات.',
  keywords: [
    'أدوات النص العربي',
    'حذف التشكيل',
    'حذف الكشيدة',
    'العربي المقلوب',
    'تحويل الأرقام العربية',
    'تصحيح الكيبورد',
    'تنظيف النص العربي',
    'عد الكلمات العربية',
    'Arabic text tools',
    'Remove Tashkeel',
    'Fix reversed Arabic',
  ],
  authors: [{ name: 'ArabicFix' }],
  creator: 'ArabicFix',
  publisher: 'ArabicFix',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ar_AR',
    alternateLocale: 'en_US',
    url: SITE_URL,
    siteName: 'ArabicFix',
    title: 'ArabicFix | أدوات بسيطة لإصلاح وتنظيف وتحويل النص العربي',
    description:
      'أدوات مجانية وسريعة وخاصة لإصلاح النص العربي مباشرة في المتصفح دون حفظ أي بيانات.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArabicFix | أدوات بسيطة لإصلاح وتنظيف وتحويل النص العربي',
    description:
      'أدوات مجانية وسريعة وخاصة لإصلاح النص العربي مباشرة في المتصفح دون حفظ أي بيانات.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className="bg-[#F8FAFC] text-[#111827] min-h-screen flex flex-col font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

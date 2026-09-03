import React, { useState, useEffect, useCallback, useId } from 'react';
import {
  Copy,
  Check,
  Trash2,
  Download,
  ClipboardPaste,
  ArrowLeftRight,
  Sparkles,
  Shield,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Info,
  SlidersHorizontal,
  FileText,
} from 'lucide-react';
import { ToolDefinition, Language, TextStats } from '../types';
import {
  removeTashkeel,
  removeTatweel,
  cleanArabicText,
  convertNumbers,
  calculateTextStats,
  removeInvisibleCharacters,
  normalizeArabicText,
  fixArabicPunctuation,
  extractText,
  fixReversedArabic,
  convertArabiziToArabic,
  NumberConversionMode,
  CleanerOptions,
  DEFAULT_CLEANER_OPTIONS,
  NormalizerOptions,
  DEFAULT_NORMALIZER_OPTIONS,
  PunctuationFixerOptions,
  ExtractMode,
  ReverseMode,
  InvisibleCharResult,
} from '../lib/arabic-utils';
import { convertArKeyboardToEn, convertEnKeyboardToAr } from '../lib/keyboard-map';
import { ToolCard } from './ToolCard';
import { TOOLS } from '../data/tools';

interface ToolLayoutProps {
  tool: ToolDefinition;
  currentLang: Language;
  onSelectTool: (slug: string) => void;
  onNavigateHome: () => void;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({
  tool,
  currentLang,
  onSelectTool,
  onNavigateHome,
}) => {
  const isAr = currentLang === 'ar';
  const keepShaddaId = useId();
  const preserveLinesId = useId();

  // Primary text states
  const [inputText, setInputText] = useState<string>(tool.defaultInput);
  const [outputText, setOutputText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [liveMode, setLiveMode] = useState<boolean>(tool.liveProcessingDefault ?? true);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  // Tool Specific Options States
  // 1. Tashkeel options
  const [keepShadda, setKeepShadda] = useState(false);

  // 2. Cleaner options
  const [cleanerOpts, setCleanerOpts] = useState<CleanerOptions>(DEFAULT_CLEANER_OPTIONS);

  // 3. Number converter options
  const [numberMode, setNumberMode] = useState<NumberConversionMode>('westernToIndic');

  // 4. Reversed Arabic options
  const [reverseMode, setReverseMode] = useState<ReverseMode>('perLine');

  // 5. Invisible Characters options
  const [invisibleMode, setInvisibleMode] = useState<'safe' | 'aggressive'>('safe');
  const [invisibleStats, setInvisibleStats] = useState<InvisibleCharResult | null>(null);

  // 6. Normalizer options
  const [normalizerOpts, setNormalizerOpts] = useState<NormalizerOptions>(DEFAULT_NORMALIZER_OPTIONS);

  // 7. Punctuation options
  const [punctuationOpts, setPunctuationOpts] = useState<PunctuationFixerOptions>({
    fixSpacing: true,
    fixBrackets: true,
    normalizeCommas: true,
    normalizeQuestionMarks: true,
  });

  // 8. Extract options
  const [extractMode, setExtractMode] = useState<ExtractMode>('arabicOnly');
  const [preserveLines, setPreserveLines] = useState(true);

  // 9. Keyboard fixer options
  const [keyboardDirection, setKeyboardDirection] = useState<'enToAr' | 'arToEn'>('enToAr');

  // Reset when tool changes
  useEffect(() => {
    setInputText(tool.defaultInput);
    setCopied(false);
    setActiveFaqIndex(null);
  }, [tool.slug]);

  // Execute processing logic
  const processText = useCallback(() => {
    if (!inputText) {
      setOutputText('');
      setInvisibleStats(null);
      return;
    }

    let result = '';

    switch (tool.slug) {
      case 'remove-tashkeel':
        result = removeTashkeel(inputText, keepShadda);
        break;

      case 'remove-tatweel':
        result = removeTatweel(inputText);
        break;

      case 'arabic-text-cleaner':
        result = cleanArabicText(inputText, cleanerOpts);
        break;

      case 'arabic-number-converter':
        result = convertNumbers(inputText, numberMode);
        break;

      case 'fix-reversed-arabic':
        result = fixReversedArabic(inputText, reverseMode);
        break;

      case 'arabic-word-counter':
        // Output text is formatted summary, but stats are also visually presented
        result = inputText;
        break;

      case 'remove-invisible-characters': {
        const invResult = removeInvisibleCharacters(inputText, invisibleMode);
        setInvisibleStats(invResult);
        result = invResult.cleanedText;
        break;
      }

      case 'normalize-arabic-text':
        result = normalizeArabicText(inputText, normalizerOpts);
        break;

      case 'arabic-punctuation-fixer':
        result = fixArabicPunctuation(inputText, punctuationOpts);
        break;

      case 'extract-arabic-text':
        result = extractText(inputText, extractMode, preserveLines);
        break;

      case 'arabic-keyboard-fixer':
        result = keyboardDirection === 'enToAr' ? convertEnKeyboardToAr(inputText) : convertArKeyboardToEn(inputText);
        break;

      case 'arabizi-to-arabic':
        result = convertArabiziToArabic(inputText);
        break;

      default:
        result = inputText;
        break;
    }

    setOutputText(result);
  }, [
    tool.slug,
    inputText,
    keepShadda,
    cleanerOpts,
    numberMode,
    reverseMode,
    invisibleMode,
    normalizerOpts,
    punctuationOpts,
    extractMode,
    preserveLines,
    keyboardDirection,
  ]);

  // Live processing listener
  useEffect(() => {
    if (liveMode) {
      processText();
    }
  }, [liveMode, processText]);

  // Keyboard shortcut Ctrl+Enter / Cmd+Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        processText();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [processText]);

  // Copy handler
  const handleCopy = async () => {
    const textToCopy = tool.slug === 'arabic-word-counter' ? inputText : outputText;
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  // Paste handler
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText(text);
      }
    } catch {
      // Browser permission denied or not supported
    }
  };

  // Download .txt
  const handleDownload = () => {
    const textToDownload = tool.slug === 'arabic-word-counter' ? inputText : outputText;
    if (!textToDownload) return;

    const blob = new Blob([textToDownload], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${tool.slug}-result.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Swap handler (Input <-> Output)
  const handleSwap = () => {
    if (tool.slug === 'arabic-keyboard-fixer') {
      setKeyboardDirection((prev) => (prev === 'enToAr' ? 'arToEn' : 'enToAr'));
    } else if (tool.slug === 'arabic-number-converter') {
      if (numberMode === 'westernToIndic') setNumberMode('indicToWestern');
      else if (numberMode === 'indicToWestern') setNumberMode('westernToIndic');
      else if (numberMode === 'westernToPersian') setNumberMode('persianToWestern');
      else if (numberMode === 'persianToWestern') setNumberMode('westernToPersian');
    }
    const temp = inputText;
    setInputText(outputText);
    setOutputText(temp);
  };

  const inputStats: TextStats = calculateTextStats(inputText);
  const outputStats: TextStats = calculateTextStats(outputText);

  // Related tools
  const relatedTools = TOOLS.filter((t) => tool.relatedToolSlugs.includes(t.slug));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header breadcrumb & Title */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B] mb-3">
          <button onClick={onNavigateHome} className="hover:text-[#2563EB] font-semibold cursor-pointer">
            {isAr ? 'الرئيسية' : 'Home'}
          </button>
          <span>/</span>
          <span className="text-[#94A3B8]">{isAr ? 'الأدوات' : 'Tools'}</span>
          <span>/</span>
          <span className="text-[#111827] font-bold">{tool.name[currentLang]}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#111827] tracking-tight flex items-center gap-2.5">
              <span>{tool.name[currentLang]}</span>
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-[#64748B] max-w-3xl leading-relaxed font-medium">
              {tool.fullDescription[currentLang]}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/80 font-semibold">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isAr ? 'معالجة محلية 100%' : '100% In-Browser'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tool-specific Options Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 mb-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#64748B] mb-3">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>{isAr ? 'خيارات الأداة' : 'Tool Settings'}</span>
        </div>

        {/* 1. Remove Tashkeel Options */}
        {tool.slug === 'remove-tashkeel' && (
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-700">
            <label htmlFor={keepShaddaId} className="flex items-center gap-2 cursor-pointer select-none">
              <input
                id={keepShaddaId}
                type="checkbox"
                checked={keepShadda}
                onChange={(e) => setKeepShadda(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span>{isAr ? 'الإبقاء على الشدة ( ّ ) وتفادي حذفها' : 'Keep Shadda ( ّ ) character'}</span>
            </label>
          </div>
        )}

        {/* 2. Arabic Text Cleaner Options */}
        {tool.slug === 'arabic-text-cleaner' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-slate-700">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={cleanerOpts.removeExtraSpaces}
                onChange={(e) => setCleanerOpts({ ...cleanerOpts, removeExtraSpaces: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span>{isAr ? 'دمج المسافات المتكررة' : 'Remove extra spaces'}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={cleanerOpts.removeDuplicateBlankLines}
                onChange={(e) => setCleanerOpts({ ...cleanerOpts, removeDuplicateBlankLines: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span>{isAr ? 'حذف الأسطر الفارغة المكررة' : 'Remove duplicate empty lines'}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={cleanerOpts.removeTatweel}
                onChange={(e) => setCleanerOpts({ ...cleanerOpts, removeTatweel: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span>{isAr ? 'حذف التطويل والكشيدة (ـ)' : 'Remove Tatweel / Kashida'}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={cleanerOpts.removeTashkeel}
                onChange={(e) => setCleanerOpts({ ...cleanerOpts, removeTashkeel: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span>{isAr ? 'حذف الحركات والتشكيل' : 'Remove Tashkeel diacritics'}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={cleanerOpts.removeInvisibleChars}
                onChange={(e) => setCleanerOpts({ ...cleanerOpts, removeInvisibleChars: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span>{isAr ? 'حذف المحارف غير المرئية' : 'Remove invisible characters'}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={cleanerOpts.trimLines}
                onChange={(e) => setCleanerOpts({ ...cleanerOpts, trimLines: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span>{isAr ? 'تقليم بداية ونهاية الأسطر' : 'Trim spaces at line ends'}</span>
            </label>
          </div>
        )}

        {/* 3. Number Converter Options */}
        {tool.slug === 'arabic-number-converter' && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 mr-2">{isAr ? 'اتجاه التحويل:' : 'Direction:'}</span>
            <div className="inline-flex rounded-lg bg-slate-100 p-1 text-xs font-medium border border-slate-200">
              <button
                type="button"
                onClick={() => setNumberMode('westernToIndic')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  numberMode === 'westernToIndic'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                123 → ١٢٣ {isAr ? '(غربي إلى مشرقي)' : '(Western to Indic)'}
              </button>
              <button
                type="button"
                onClick={() => setNumberMode('indicToWestern')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  numberMode === 'indicToWestern'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ١٢٣ → 123 {isAr ? '(مشرقي إلى غربي)' : '(Indic to Western)'}
              </button>
              <button
                type="button"
                onClick={() => setNumberMode('westernToPersian')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  numberMode === 'westernToPersian'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                123 → ۱۲۳ {isAr ? '(غربي إلى فارسي)' : '(Western to Persian)'}
              </button>
              <button
                type="button"
                onClick={() => setNumberMode('persianToWestern')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  numberMode === 'persianToWestern'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ۱۲۳ → 123 {isAr ? '(فارسي إلى غربي)' : '(Persian to Western)'}
              </button>
            </div>
          </div>
        )}

        {/* 4. Reversed Arabic Options */}
        {tool.slug === 'fix-reversed-arabic' && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 mr-2">{isAr ? 'نمط الإصلاح:' : 'Repair Mode:'}</span>
              <div className="inline-flex flex-wrap rounded-lg bg-slate-100 p-1 text-xs font-medium border border-slate-200">
                <button
                  type="button"
                  onClick={() => setReverseMode('perLine')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    reverseMode === 'perLine'
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isAr ? 'عكس الحروف لكل سطر (الأكثر شيوعاً)' : 'Reverse chars per line (Standard)'}
                </button>
                <button
                  type="button"
                  onClick={() => setReverseMode('fullReverse')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    reverseMode === 'fullReverse'
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isAr ? 'عكس النص بالكامل' : 'Reverse full text'}
                </button>
                <button
                  type="button"
                  onClick={() => setReverseMode('reverseLines')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    reverseMode === 'reverseLines'
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isAr ? 'عكس ترتيب الأسطر فقط' : 'Reverse lines order'}
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              {isAr
                ? 'ملاحظة: تقوم الأداة تلقائياً بمعايرة أشكال الحروف المفصولة (Presentation Forms) لتوصيل الحروف بطريقة صحيحة.'
                : 'Note: The utility automatically normalizes disconnected presentation forms from PDFs so letters reconnect.'}
            </p>
          </div>
        )}

        {/* 5. Invisible Characters Options */}
        {tool.slug === 'remove-invisible-characters' && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs text-slate-500">{isAr ? 'مستوى الفحص:' : 'Clean Level:'}</span>
              <div className="inline-flex rounded-lg bg-slate-100 p-1 text-xs font-medium border border-slate-200">
                <button
                  type="button"
                  onClick={() => setInvisibleMode('safe')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    invisibleMode === 'safe'
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isAr ? 'تنظيف آمن (Safe Clean)' : 'Safe Clean'}
                </button>
                <button
                  type="button"
                  onClick={() => setInvisibleMode('aggressive')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    invisibleMode === 'aggressive'
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isAr ? 'تنظيف شامل (Aggressive Clean)' : 'Aggressive Clean'}
                </button>
              </div>
            </div>

            {/* Detection reporting badge */}
            {invisibleStats && (
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold text-slate-700">
                  {isAr ? 'المحارف المكتشفة:' : 'Detected Invisible Codepoints:'}
                </span>
                {invisibleStats.removedCount === 0 ? (
                  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {isAr ? 'لم يُعثر على رموز خفية (النص نظيف)' : 'Zero invisible characters found'}
                  </span>
                ) : (
                  <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-bold">
                    {isAr
                      ? `تمت إزالة ${invisibleStats.removedCount} رمزاً خفياً`
                      : `Removed ${invisibleStats.removedCount} invisible characters`}
                  </span>
                )}
                {invisibleStats.detectedTypes.map((item) => (
                  <span key={item.name} className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                    {item.name} ({item.code}): {item.count}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 6. Normalize Arabic Text Options */}
        {tool.slug === 'normalize-arabic-text' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={normalizerOpts.normalizeAlef}
                  onChange={(e) => setNormalizerOpts({ ...normalizerOpts, normalizeAlef: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span>أ / إ / آ / ٱ → ا</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={normalizerOpts.normalizeYa}
                  onChange={(e) => setNormalizerOpts({ ...normalizerOpts, normalizeYa: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span>ى → ي</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={normalizerOpts.normalizePersianYa}
                  onChange={(e) => setNormalizerOpts({ ...normalizerOpts, normalizePersianYa: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span>{isAr ? 'ياء فارسية ی → ي' : 'Persian Ya ی → ي'}</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={normalizerOpts.normalizePersianKaf}
                  onChange={(e) => setNormalizerOpts({ ...normalizerOpts, normalizePersianKaf: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span>{isAr ? 'كاف فارسية ک → ك' : 'Persian Kaf ک → ك'}</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={normalizerOpts.normalizeHamza}
                  onChange={(e) => setNormalizerOpts({ ...normalizerOpts, normalizeHamza: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span>ؤ / ئ → ء</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={normalizerOpts.removeTatweel}
                  onChange={(e) => setNormalizerOpts({ ...normalizerOpts, removeTatweel: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span>{isAr ? 'حذف التطويل (ـ)' : 'Remove Tatweel'}</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={normalizerOpts.removeTashkeel}
                  onChange={(e) => setNormalizerOpts({ ...normalizerOpts, removeTashkeel: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span>{isAr ? 'حذف التشكيل' : 'Remove Tashkeel'}</span>
              </label>

              {/* Warning label for Ta Marbuta */}
              <label className="flex items-center gap-2 cursor-pointer select-none text-amber-800">
                <input
                  type="checkbox"
                  checked={normalizerOpts.normalizeTaMarbuta}
                  onChange={(e) => setNormalizerOpts({ ...normalizerOpts, normalizeTaMarbuta: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300"
                />
                <span>ة → ه ({isAr ? 'تنبيه: يغير المعنى' : 'Changes semantics'})</span>
              </label>
            </div>
          </div>
        )}

        {/* 7. Punctuation Options */}
        {tool.slug === 'arabic-punctuation-fixer' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-slate-700">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={punctuationOpts.fixSpacing}
                onChange={(e) => setPunctuationOpts({ ...punctuationOpts, fixSpacing: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span>{isAr ? 'إلغاء الفراغ قبل العلامة ووضعه بعدها' : 'Space after, not before'}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={punctuationOpts.fixBrackets}
                onChange={(e) => setPunctuationOpts({ ...punctuationOpts, fixBrackets: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span>{isAr ? 'تنسيق فراغات الأقواس ( ) و « »' : 'Tighten brackets and quotes'}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={punctuationOpts.normalizeCommas}
                onChange={(e) => setPunctuationOpts({ ...punctuationOpts, normalizeCommas: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span>{isAr ? 'تحويل الفاصلة الإنجليزية إلى عربية (،)' : 'English comma to Arabic (،)'}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={punctuationOpts.normalizeQuestionMarks}
                onChange={(e) => setPunctuationOpts({ ...punctuationOpts, normalizeQuestionMarks: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span>{isAr ? 'تحويل علامة الاستفهام إلى عربية (؟)' : 'English ? to Arabic (؟)'}</span>
            </label>
          </div>
        )}

        {/* 8. Extract Text Options */}
        {tool.slug === 'extract-arabic-text' && (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 mr-2">{isAr ? 'نوع الاستخراج:' : 'Extract Target:'}</span>
              <div className="inline-flex rounded-lg bg-slate-100 p-1 text-xs font-medium border border-slate-200">
                <button
                  type="button"
                  onClick={() => setExtractMode('arabicOnly')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    extractMode === 'arabicOnly'
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isAr ? 'النص العربي فقط' : 'Arabic only'}
                </button>
                <button
                  type="button"
                  onClick={() => setExtractMode('latinOnly')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    extractMode === 'latinOnly'
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isAr ? 'النص اللاتيني فقط' : 'Latin text only'}
                </button>
                <button
                  type="button"
                  onClick={() => setExtractMode('numbersOnly')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    extractMode === 'numbersOnly'
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isAr ? 'الأرقام فقط' : 'Numbers only'}
                </button>
                <button
                  type="button"
                  onClick={() => setExtractMode('arabicAndNumbers')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    extractMode === 'arabicAndNumbers'
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isAr ? 'عربي + أرقام' : 'Arabic + Numbers'}
                </button>
              </div>
            </div>

            <label htmlFor={preserveLinesId} className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                id={preserveLinesId}
                type="checkbox"
                checked={preserveLines}
                onChange={(e) => setPreserveLines(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span>{isAr ? 'الحفاظ على فواصل الأسطر' : 'Preserve line breaks'}</span>
            </label>
          </div>
        )}

        {/* 9. Keyboard Fixer Options */}
        {tool.slug === 'arabic-keyboard-fixer' && (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">{isAr ? 'نوع التصحيح:' : 'Direction:'}</span>
              <div className="inline-flex rounded-lg bg-slate-100 p-1 text-xs font-medium border border-slate-200">
                <button
                  type="button"
                  onClick={() => setKeyboardDirection('enToAr')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    keyboardDirection === 'enToAr'
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isAr ? 'كتابة إنجليزية كيبورد عربي (lvpfh → مرحبا)' : 'English Keystrokes → Arabic'}
                </button>
                <button
                  type="button"
                  onClick={() => setKeyboardDirection('arToEn')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    keyboardDirection === 'arToEn'
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isAr ? 'كتابة عربية كيبورد إنجليزي (مرحبا → lvpfh)' : 'Arabic Keystrokes → English'}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSwap}
              className="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200/80 transition-colors"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>{isAr ? 'عكس الاتجاه والتبديل' : 'Swap Input & Output'}</span>
            </button>
          </div>
        )}

        {/* 10. Arabizi to Arabic Notice & Helper */}
        {tool.slug === 'arabizi-to-arabic' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-blue-50/50 p-3 rounded-lg border border-blue-100">
            <div className="flex items-start gap-2 text-slate-700">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                {isAr
                  ? 'تحويل الفرانكو عرب هو تقريب صوتي للأرقام (3=ع، 7=ح، 5=خ، 2=ء) وقد يتطلب تدقيقاً يدوياً لبعض اللهجات.'
                  : 'Arabizi conversion is an approximate phonetic mapping (3=ع, 7=ح, 5=خ, 2=ء) and may require manual touch-ups.'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="bg-white px-2 py-1 rounded border border-slate-200 font-mono text-[11px] text-slate-800">
                3 = ع | 7 = ح | 5 = خ | 9 = ص
              </span>
            </div>
          </div>
        )}

        {/* 11. Word Counter Live Stats Panel */}
        {tool.slug === 'arabic-word-counter' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-1">
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 text-center">
              <div className="text-xl font-bold text-blue-600">{inputStats.words}</div>
              <div className="text-[11px] text-slate-600 font-medium">{isAr ? 'الكلمات' : 'Words'}</div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 text-center">
              <div className="text-xl font-bold text-slate-900">{inputStats.arabicWords}</div>
              <div className="text-[11px] text-slate-600 font-medium">{isAr ? 'كلمات عربية' : 'Arabic Words'}</div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 text-center">
              <div className="text-xl font-bold text-slate-900">{inputStats.latinWords}</div>
              <div className="text-[11px] text-slate-600 font-medium">{isAr ? 'كلمات لاتينية' : 'Latin Words'}</div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 text-center">
              <div className="text-xl font-bold text-slate-900">{inputStats.characters}</div>
              <div className="text-[11px] text-slate-600 font-medium">{isAr ? 'الحروف مع الفراغ' : 'Chars'}</div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 text-center">
              <div className="text-xl font-bold text-slate-900">{inputStats.charactersNoSpaces}</div>
              <div className="text-[11px] text-slate-600 font-medium">{isAr ? 'الحروف بدون فراغ' : 'No Spaces'}</div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 text-center">
              <div className="text-xl font-bold text-slate-900">{inputStats.sentences}</div>
              <div className="text-[11px] text-slate-600 font-medium">{isAr ? 'الجمل' : 'Sentences'}</div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 text-center">
              <div className="text-xl font-bold text-slate-900">{inputStats.lines}</div>
              <div className="text-[11px] text-slate-600 font-medium">{isAr ? 'الأسطر' : 'Lines'}</div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 text-center">
              <div className="text-xl font-bold text-emerald-600">~{inputStats.readingTimeMinutes} {isAr ? 'د' : 'm'}</div>
              <div className="text-[11px] text-slate-600 font-medium">{isAr ? 'وقت القراءة' : 'Reading Time'}</div>
            </div>
          </div>
        )}
      </div>

      {/* Primary 2-Panel Editor Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUT PANEL */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl flex flex-col shadow-xs overflow-hidden focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/10 transition-all">
          {/* Panel Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs font-bold text-[#111827]">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#2563EB]" />
              <span>{isAr ? 'النص الأصلي (المدخل)' : 'Input Text'}</span>
            </div>

            {/* Top actions */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                id="btn-paste-input"
                onClick={handlePaste}
                title={isAr ? 'لصق من الحافظة' : 'Paste from clipboard'}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-[#E2E8F0] text-[#111827] transition-colors flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
              >
                <ClipboardPaste className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isAr ? 'لصق' : 'Paste'}</span>
              </button>

              <button
                type="button"
                id="btn-load-sample"
                onClick={() => setInputText(tool.defaultInput)}
                title={isAr ? 'تحميل نص تجريبي' : 'Load sample text'}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-[#E2E8F0] text-[#111827] transition-colors flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isAr ? 'مثال' : 'Sample'}</span>
              </button>

              <button
                type="button"
                id="btn-clear-input"
                onClick={() => setInputText('')}
                title={isAr ? 'مسح النص' : 'Clear text'}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-rose-50 border border-[#E2E8F0] hover:border-rose-200 text-[#64748B] hover:text-rose-600 transition-colors flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isAr ? 'مسح' : 'Clear'}</span>
              </button>
            </div>
          </div>

          {/* Textarea */}
          <textarea
            id="tool-input-textarea"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isAr ? 'ألصق أو اكتب النص هنا للمعالجة...' : 'Paste or type text here to process...'}
            className="w-full p-4 flex-1 min-h-[220px] lg:min-h-[360px] text-base text-[#111827] bg-transparent resize-y border-none focus:outline-none placeholder:text-[#94A3B8] font-sans leading-relaxed"
            dir={
              tool.slug === 'arabic-keyboard-fixer' && keyboardDirection === 'enToAr'
                ? 'ltr'
                : tool.slug === 'arabizi-to-arabic'
                ? 'ltr'
                : 'auto'
            }
          />

          {/* Panel Footer */}
          <div className="px-4 py-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B] font-medium">
            <div className="flex items-center gap-3">
              <span>
                {inputStats.characters} {isAr ? 'حرف' : 'chars'}
              </span>
              <span>•</span>
              <span>
                {inputStats.words} {isAr ? 'كلمة' : 'words'}
              </span>
              <span>•</span>
              <span>
                {inputStats.lines} {isAr ? 'سطر' : 'lines'}
              </span>
            </div>

            <div className="hidden sm:block text-[11px] text-[#94A3B8] font-semibold">
              Ctrl/Cmd + Enter {isAr ? 'للتنفيذ' : 'to run'}
            </div>
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl flex flex-col shadow-xs overflow-hidden focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/10 transition-all">
          {/* Panel Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs font-bold text-[#111827]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
              <span>{isAr ? 'النتيجة بعد المعالجة' : 'Result Output'}</span>
            </div>

            {/* Top Actions */}
            <div className="flex items-center gap-2">
              {/* Swap Button if supported */}
              {tool.supportsSwap && (
                <button
                  type="button"
                  id="btn-swap-panels"
                  onClick={handleSwap}
                  title={isAr ? 'تبديل المدخل والمخرج' : 'Swap Input and Output'}
                  className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-[#E2E8F0] text-[#111827] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isAr ? 'تبديل' : 'Swap'}</span>
                </button>
              )}

              {/* Download TXT */}
              <button
                type="button"
                id="btn-download-result"
                onClick={handleDownload}
                disabled={!outputText && tool.slug !== 'arabic-word-counter'}
                title={isAr ? 'تحميل كملف نصي' : 'Download as .txt'}
                className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-[#E2E8F0] disabled:opacity-50 text-[#111827] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">.txt</span>
              </button>

              {/* Copy Result Button */}
              <button
                type="button"
                id="btn-copy-result"
                onClick={handleCopy}
                disabled={!outputText && tool.slug !== 'arabic-word-counter'}
                className={`px-3.5 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white disabled:opacity-50'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{isAr ? 'تم النسخ!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isAr ? 'نسخ النتيجة' : 'Copy Result'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Result Area */}
          <div className="relative flex-1 flex flex-col">
            <textarea
              id="tool-output-textarea"
              readOnly={tool.slug !== 'arabic-word-counter'}
              value={tool.slug === 'arabic-word-counter' ? inputText : outputText}
              onChange={(e) => {
                if (tool.slug === 'arabic-word-counter') {
                  setInputText(e.target.value);
                } else {
                  setOutputText(e.target.value);
                }
              }}
              placeholder={isAr ? 'ستظهر النتيجة هنا فوراً...' : 'Result will appear here instantly...'}
              className="w-full p-4 flex-1 min-h-[220px] lg:min-h-[360px] text-base text-[#111827] bg-[#F8FAFC]/50 resize-y border-none focus:outline-none placeholder:text-[#94A3B8] font-sans leading-relaxed"
              dir="auto"
            />
          </div>

          {/* Panel Footer with Stats & Processing Trigger */}
          <div className="px-4 py-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B] font-medium">
            <div className="flex items-center gap-3">
              <span>
                {outputStats.characters} {isAr ? 'حرف' : 'chars'}
              </span>
              <span>•</span>
              <span>
                {outputStats.words} {isAr ? 'كلمة' : 'words'}
              </span>
            </div>

            {/* Live Toggle & Process Button */}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs text-[#64748B] font-semibold cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={liveMode}
                  onChange={(e) => setLiveMode(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-[#2563EB] focus:ring-[#2563EB] border-slate-300"
                />
                <span>{isAr ? 'معالجة تلقائية لحظية' : 'Live Auto-Process'}</span>
              </label>

              {!liveMode && (
                <button
                  type="button"
                  id="btn-manual-process"
                  onClick={processText}
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-3 py-1 rounded-lg text-xs shadow-xs transition-colors cursor-pointer"
                >
                  {isAr ? 'تنفيذ الآن' : 'Process Now'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SEO & Educational Sections Below Editor */}
      <div className="mt-16 space-y-10">
        {/* Section: How it Works & Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* How it works */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
            <h2 className="text-lg font-black text-[#111827] tracking-tight mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#2563EB]" />
              <span>{isAr ? 'كيف تعمل هذه الأداة؟' : 'How does it work?'}</span>
            </h2>
            <ul className="space-y-2.5 text-sm text-[#64748B] leading-relaxed list-disc list-inside">
              {tool.howItWorks[currentLang].map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>

          {/* Why use this tool */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
            <h2 className="text-lg font-black text-[#111827] tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#2563EB]" />
              <span>{isAr ? 'لماذا تستخدم هذه الأداة؟' : 'Why use this tool?'}</span>
            </h2>
            <ul className="space-y-2.5 text-sm text-[#64748B] leading-relaxed list-disc list-inside">
              {tool.whyUse[currentLang].map((reason, idx) => (
                <li key={idx}>{reason}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section: Real Interactive Examples */}
        {tool.examples && tool.examples.length > 0 && (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
            <h2 className="text-lg font-black text-[#111827] tracking-tight mb-4">
              {isAr ? 'أمثلة واقعية سريعة' : 'Real-World Examples'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tool.examples.map((example, idx) => (
                <div key={idx} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2563EB]">{example.title[currentLang]}</span>
                    <button
                      type="button"
                      onClick={() => setInputText(example.input)}
                      className="text-[11px] text-[#2563EB] hover:underline font-bold cursor-pointer"
                    >
                      {isAr ? 'تجربة هذا المثال' : 'Load this example'}
                    </button>
                  </div>
                  <div className="text-xs text-[#64748B] font-semibold">{isAr ? 'قبل المعالجة:' : 'Before:'}</div>
                  <div className="text-xs font-mono bg-white p-2.5 rounded-lg border border-[#E2E8F0] text-[#111827] break-all">
                    {example.input}
                  </div>
                  {example.output && (
                    <>
                      <div className="text-xs text-[#64748B] font-semibold">{isAr ? 'بعد المعالجة:' : 'After:'}</div>
                      <div className="text-xs font-mono bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200 text-emerald-950 break-all font-medium">
                        {example.output}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section: Privacy Guarantee */}
        <div className="bg-[#2563EB] text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 relative z-10">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm text-white shrink-0 mt-0.5">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight">
                {isAr ? 'نصوصك في أمان تام ولا تغادر جهازك' : 'Your text stays 100% private in your browser'}
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 mt-1 leading-relaxed max-w-2xl font-medium">
                {isAr
                  ? 'جميع العمليات الحسابية وتعديل النصوص تتم فورياً عبر محرك الجافاسكريبت الداخلي في متصفحك. لا نقوم بحفظ أو إرسال النصوص إلى أي خوادم أو أطراف ثالثة.'
                  : 'All processing runs entirely in your browser memory using client-side JavaScript. No text is ever uploaded, logged, or sent to external servers.'}
              </p>
            </div>
          </div>
          <div className="shrink-0 text-xs font-bold text-[#2563EB] bg-white px-3.5 py-2 rounded-xl shadow-xs relative z-10">
            {isAr ? 'بدون تسجيل حساب' : 'No Account Needed'}
          </div>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        {/* Section: Frequently Asked Questions */}
        {tool.faqs && tool.faqs.length > 0 && (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
            <h2 className="text-lg font-black text-[#111827] tracking-tight mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#2563EB]" />
              <span>{isAr ? 'الأسئلة الشائعة حول الأداة' : 'Frequently Asked Questions'}</span>
            </h2>
            <div className="space-y-3">
              {tool.faqs.map((faq, idx) => {
                const isOpen = activeFaqIndex === idx;
                return (
                  <div key={idx} className="border border-[#E2E8F0] rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                      className="w-full px-4 py-3.5 text-start bg-white hover:bg-slate-50 transition-colors flex items-center justify-between text-sm font-bold text-[#111827] cursor-pointer"
                    >
                      <span>{faq.question[currentLang]}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#64748B] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#64748B] shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 py-3.5 bg-[#F8FAFC] text-sm text-[#64748B] leading-relaxed border-t border-[#E2E8F0]">
                        {faq.answer[currentLang]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section: Related Tools */}
        {relatedTools.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-[#111827] tracking-tight">
                {isAr ? 'أدوات أخرى ذات صلة' : 'Related Arabic Tools'}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedTools.map((relTool) => (
                <ToolCard
                  key={relTool.slug}
                  tool={relTool}
                  currentLang={currentLang}
                  onSelect={onSelectTool}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import { convertArKeyboardToEn, convertEnKeyboardToAr } from './keyboard-map';
import { TextStats } from '../types';

/**
 * Unicode ranges for Arabic diacritics (Harakat)
 * Includes: Fathatan, Dammatan, Kasratan, Fatha, Damma, Kasra, Shadda, Sukun,
 * Superscript Alef, Quranic annotations, Maddah
 */
export const TASHKEEL_REGEX = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u08E3-\u08FF]/g;
export const TASHKEEL_WITHOUT_SHADDA_REGEX = /[\u0610-\u061A\u064B-\u0650\u0652-\u065F\u0670\u06D6-\u06ED\u08E3-\u08FF]/g;

/**
 * Tatweel (Kashida) character
 */
export const TATWEEL_CHAR = '\u0640';
export const TATWEEL_REGEX = /\u0640/g;

/**
 * Removes Tashkeel / Harakat from Arabic text
 */
export function removeTashkeel(text: string, keepShadda: boolean = false): string {
  if (!text) return '';
  return text.replace(keepShadda ? TASHKEEL_WITHOUT_SHADDA_REGEX : TASHKEEL_REGEX, '');
}

/**
 * Removes Tatweel / Kashida from Arabic text
 */
export function removeTatweel(text: string): string {
  if (!text) return '';
  return text.replace(TATWEEL_REGEX, '');
}

export interface CleanerOptions {
  removeExtraSpaces: boolean;
  removeDuplicateBlankLines: boolean;
  removeTatweel: boolean;
  removeTashkeel: boolean;
  normalizeLineBreaks: boolean;
  removeInvisibleChars: boolean;
  trimLines: boolean;
}

export const DEFAULT_CLEANER_OPTIONS: CleanerOptions = {
  removeExtraSpaces: true,
  removeDuplicateBlankLines: true,
  removeTatweel: true,
  removeTashkeel: false,
  normalizeLineBreaks: true,
  removeInvisibleChars: true,
  trimLines: true,
};

/**
 * Clean Arabic text with configurable options
 */
export function cleanArabicText(text: string, options: Partial<CleanerOptions> = {}): string {
  if (!text) return '';
  const opts = { ...DEFAULT_CLEANER_OPTIONS, ...options };
  let result = text;

  // 1. Normalize line breaks first
  if (opts.normalizeLineBreaks) {
    result = result.replace(/\r\n|\r/g, '\n');
  }

  // 2. Remove invisible characters
  if (opts.removeInvisibleChars) {
    result = removeInvisibleCharacters(result, 'safe').cleanedText;
  }

  // 3. Remove Tatweel if requested
  if (opts.removeTatweel) {
    result = removeTatweel(result);
  }

  // 4. Remove Tashkeel if requested
  if (opts.removeTashkeel) {
    result = removeTashkeel(result);
  }

  // 5. Trim per line or overall
  if (opts.trimLines) {
    result = result
      .split('\n')
      .map((line) => line.trim())
      .join('\n');
  }

  // 6. Remove extra horizontal spaces (keep newlines)
  if (opts.removeExtraSpaces) {
    result = result.replace(/[^\S\r\n]+/g, ' ');
  }

  // 7. Remove duplicate blank lines (max 1 empty line between paragraphs)
  if (opts.removeDuplicateBlankLines) {
    result = result.replace(/\n{3,}/g, '\n\n');
  }

  return result.trim();
}

/**
 * Number conversion maps
 */
const WESTERN_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const INDIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export type NumberConversionMode =
  | 'westernToIndic'
  | 'indicToWestern'
  | 'westernToPersian'
  | 'persianToWestern'
  | 'indicToPersian';

export function convertNumbers(text: string, mode: NumberConversionMode): string {
  if (!text) return '';

  switch (mode) {
    case 'westernToIndic':
      return text.replace(/[0-9]/g, (d) => INDIC_DIGITS[parseInt(d, 10)]);

    case 'indicToWestern':
      return text.replace(/[٠-٩]/g, (d) => {
        const idx = INDIC_DIGITS.indexOf(d);
        return idx !== -1 ? WESTERN_DIGITS[idx] : d;
      });

    case 'westernToPersian':
      return text.replace(/[0-9]/g, (d) => PERSIAN_DIGITS[parseInt(d, 10)]);

    case 'persianToWestern':
      return text.replace(/[۰-۹]/g, (d) => {
        const idx = PERSIAN_DIGITS.indexOf(d);
        return idx !== -1 ? WESTERN_DIGITS[idx] : d;
      });

    case 'indicToPersian':
      return text.replace(/[٠-٩]/g, (d) => {
        const idx = INDIC_DIGITS.indexOf(d);
        return idx !== -1 ? PERSIAN_DIGITS[idx] : d;
      });

    default:
      return text;
  }
}

/**
 * Calculate comprehensive statistics for Arabic / multilingual text
 */
export function calculateTextStats(text: string): TextStats {
  if (!text || text.length === 0) {
    return {
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      arabicWords: 0,
      latinWords: 0,
      numbers: 0,
      sentences: 0,
      lines: 0,
      readingTimeMinutes: 0,
    };
  }

  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;

  // Split words by whitespace
  const allTokens = text.trim().split(/\s+/).filter(Boolean);
  const words = allTokens.length;

  // Arabic regex matches Arabic Unicode characters
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
  const latinRegex = /[a-zA-Z]/;
  const numberRegex = /[0-9\u0660-\u0669\u06F0-\u06F9]/;

  let arabicWords = 0;
  let latinWords = 0;
  let numbers = 0;

  for (const token of allTokens) {
    const cleanToken = token.replace(/[.,/#!$%^&*;:{}=\-_`~()؟،؛]/g, '');
    if (!cleanToken) continue;

    if (numberRegex.test(cleanToken) && !arabicRegex.test(cleanToken) && !latinRegex.test(cleanToken)) {
      numbers++;
    } else if (arabicRegex.test(cleanToken)) {
      arabicWords++;
    } else if (latinRegex.test(cleanToken)) {
      latinWords++;
    }
  }

  // Sentences split by Arabic and Western sentence delimiters
  const sentencesMatch = text.split(/[.!?؟\n]+/).filter((s) => s.trim().length > 0);
  const sentences = sentencesMatch.length;

  // Lines
  const lines = text.split(/\r\n|\r|\n/).length;

  // Reading time (~180 words per minute average reading speed)
  const readingTimeMinutes = Math.max(1, Math.ceil(words / 180));

  return {
    characters,
    charactersNoSpaces,
    words,
    arabicWords,
    latinWords,
    numbers,
    sentences,
    lines,
    readingTimeMinutes: words > 0 ? readingTimeMinutes : 0,
  };
}

/**
 * Invisible character detection and removal
 */
export interface InvisibleCharResult {
  cleanedText: string;
  removedCount: number;
  detectedTypes: { name: string; count: number; code: string }[];
}

export function removeInvisibleCharacters(text: string, mode: 'safe' | 'aggressive' = 'safe'): InvisibleCharResult {
  if (!text) {
    return { cleanedText: '', removedCount: 0, detectedTypes: [] };
  }

  const typeCounts: Record<string, { count: number; code: string }> = {};

  const recordChar = (name: string, code: string) => {
    if (!typeCounts[name]) {
      typeCounts[name] = { count: 0, code };
    }
    typeCounts[name].count++;
  };

  let cleaned = '';
  let removedCount = 0;

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    const char = text[i];

    // Zero-width space
    if (code === 0x200B) {
      recordChar('Zero Width Space', 'U+200B');
      removedCount++;
      continue;
    }

    // Byte Order Mark / Zero Width No-Break Space
    if (code === 0xFEFF) {
      recordChar('Byte Order Mark (BOM)', 'U+FEFF');
      removedCount++;
      continue;
    }

    // Directional Marks (LTR/RTL marks, embeddings, overrides)
    if (
      (code >= 0x200E && code <= 0x200F) ||
      (code >= 0x202A && code <= 0x202E) ||
      (code >= 0x2066 && code <= 0x2069)
    ) {
      recordChar('Directional Formatting Mark', `U+${code.toString(16).toUpperCase()}`);
      removedCount++;
      continue;
    }

    // Soft Hyphen
    if (code === 0x00AD) {
      recordChar('Soft Hyphen', 'U+00AD');
      removedCount++;
      continue;
    }

    // Control Characters (excluding tab 0x09 and newlines 0x0A, 0x0D)
    if ((code >= 0x0000 && code <= 0x0008) || (code >= 0x000B && code <= 0x000C) || (code >= 0x000E && code <= 0x001F) || (code >= 0x007F && code <= 0x009F)) {
      recordChar('Control Character', `U+${code.toString(16).toUpperCase().padStart(4, '0')}`);
      removedCount++;
      continue;
    }

    // Non-breaking space: convert to standard space
    if (code === 0x00A0) {
      recordChar('Non-Breaking Space (Converted)', 'U+00A0');
      cleaned += ' ';
      continue;
    }

    // ZWNJ & ZWJ in aggressive mode
    if (mode === 'aggressive') {
      if (code === 0x200C) {
        recordChar('Zero Width Non-Joiner (ZWNJ)', 'U+200C');
        removedCount++;
        continue;
      }
      if (code === 0x200D) {
        recordChar('Zero Width Joiner (ZWJ)', 'U+200D');
        removedCount++;
        continue;
      }
      if (code === 0x2060) {
        recordChar('Word Joiner', 'U+2060');
        removedCount++;
        continue;
      }
    }

    cleaned += char;
  }

  const detectedTypes = Object.entries(typeCounts).map(([name, data]) => ({
    name,
    count: data.count,
    code: data.code,
  }));

  return {
    cleanedText: cleaned,
    removedCount,
    detectedTypes,
  };
}

/**
 * Normalization options for Arabic text
 */
export interface NormalizerOptions {
  normalizeAlef: boolean; // [أإآٱ] -> ا
  normalizeYa: boolean; // ى -> ي
  normalizeHamza: boolean; // ؤ, ئ -> ء
  normalizeTaMarbuta: boolean; // ة -> ه (Warning: alters semantics, unchecked by default)
  normalizePersianYa: boolean; // ی (U+06CC) -> ي (U+064A)
  normalizePersianKaf: boolean; // ک (U+06A9) -> ك (U+0643)
  normalizeNumbers: boolean; // Arabic-indic -> Western
  removeTatweel: boolean;
  removeTashkeel: boolean;
}

export const DEFAULT_NORMALIZER_OPTIONS: NormalizerOptions = {
  normalizeAlef: true,
  normalizeYa: true,
  normalizeHamza: false,
  normalizeTaMarbuta: false,
  normalizePersianYa: true,
  normalizePersianKaf: true,
  normalizeNumbers: false,
  removeTatweel: true,
  removeTashkeel: true,
};

export function normalizeArabicText(text: string, options: Partial<NormalizerOptions> = {}): string {
  if (!text) return '';
  const opts = { ...DEFAULT_NORMALIZER_OPTIONS, ...options };
  let res = text;

  if (opts.removeTashkeel) {
    res = removeTashkeel(res);
  }

  if (opts.removeTatweel) {
    res = removeTatweel(res);
  }

  if (opts.normalizeAlef) {
    res = res.replace(/[أإآٱ]/g, 'ا');
  }

  if (opts.normalizeYa) {
    res = res.replace(/ى/g, 'ي');
  }

  if (opts.normalizePersianYa) {
    res = res.replace(/\u06CC/g, 'ي'); // Persian Yeh to Arabic Yeh
  }

  if (opts.normalizePersianKaf) {
    res = res.replace(/\u06A9/g, 'ك'); // Persian Keheh to Arabic Kaf
  }

  if (opts.normalizeHamza) {
    res = res.replace(/[ؤئ]/g, 'ء');
  }

  if (opts.normalizeTaMarbuta) {
    res = res.replace(/ة/g, 'ه');
  }

  if (opts.normalizeNumbers) {
    res = convertNumbers(res, 'indicToWestern');
  }

  return res;
}

/**
 * Punctuation fixer for Arabic text
 */
export interface PunctuationFixerOptions {
  fixSpacing: boolean;
  fixBrackets: boolean;
  normalizeCommas: boolean;
  normalizeQuestionMarks: boolean;
}

export function fixArabicPunctuation(
  text: string,
  options: Partial<PunctuationFixerOptions> = {
    fixSpacing: true,
    fixBrackets: true,
    normalizeCommas: true,
    normalizeQuestionMarks: true,
  }
): string {
  if (!text) return '';
  let res = text;

  // Convert western comma in Arabic context to Arabic comma if requested
  if (options.normalizeCommas) {
    // replace western comma between arabic letters with Arabic comma
    res = res.replace(/([\u0600-\u06FF])\s*,\s*([\u0600-\u06FF])/g, '$1، $2');
  }

  // Convert western question mark following Arabic letters to Arabic question mark
  if (options.normalizeQuestionMarks) {
    res = res.replace(/([\u0600-\u06FF\s]+)\?/g, '$1؟');
  }

  // Fix spacing: remove space BEFORE punctuation: ، ؛ ؟ : . !
  if (options.fixSpacing) {
    // Remove space before punctuation
    res = res.replace(/[^\S\r\n]+([،؛؟:.!])/g, '$1');

    // Add space after punctuation if followed immediately by an Arabic/Latin word or number
    res = res.replace(/([،؛؟:.!])([^\s،؛؟:.!\r\n)"'»\]\}0-9])/g, '$1 $2');
  }

  // Fix brackets spacing: ( text ) -> (text), [ text ] -> [text], « text » -> «text»
  if (options.fixBrackets) {
    res = res.replace(/\(\s+/g, '(');
    res = res.replace(/\s+\)/g, ')');
    res = res.replace(/\[\s+/g, '[');
    res = res.replace(/\s+\]/g, ']');
    res = res.replace(/«\s+/g, '«');
    res = res.replace(/\s+»/g, '»');
    res = res.replace(/\{\s+/g, '{');
    res = res.replace(/\s+\}/g, '}');
  }

  return res;
}

/**
 * Extract Arabic text or specific parts
 */
export type ExtractMode = 'arabicOnly' | 'latinOnly' | 'numbersOnly' | 'arabicAndNumbers';

export function extractText(text: string, mode: ExtractMode, preserveLineBreaks: boolean = true): string {
  if (!text) return '';

  const arabicCharsPattern = '[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]';
  const latinCharsPattern = '[a-zA-Z]';
  const numbersPattern = '[0-9\u0660-\u0669\u06F0-\u06F9]';

  let regex: RegExp;
  switch (mode) {
    case 'arabicOnly':
      regex = new RegExp(`${arabicCharsPattern}+`, 'g');
      break;
    case 'latinOnly':
      regex = new RegExp(`${latinCharsPattern}+`, 'g');
      break;
    case 'numbersOnly':
      regex = new RegExp(`${numbersPattern}+`, 'g');
      break;
    case 'arabicAndNumbers':
      regex = new RegExp(`(?:${arabicCharsPattern}|${numbersPattern})+`, 'g');
      break;
  }

  if (preserveLineBreaks) {
    const lines = text.split(/\r\n|\r|\n/);
    const extractedLines = lines.map((line) => {
      const matches = line.match(regex);
      return matches ? matches.join(' ') : '';
    });
    return extractedLines.filter((l) => l.trim().length > 0).join('\n');
  } else {
    const matches = text.match(regex);
    return matches ? matches.join(' ') : '';
  }
}

/**
 * Arabic Presentation Forms to standard Unicode mapping
 * Fixes disconnected letters exported from broken PDFs / legacy software
 */
const PRESENTATION_FORMS_MAP: Record<number, string> = {
  // Arabic Presentation Forms-A & B (isolated, initial, medial, final)
  0xFE80: 'ء',
  0xFE81: 'آ', 0xFE82: 'آ',
  0xFE83: 'أ', 0xFE84: 'أ',
  0xFE85: 'ؤ', 0xFE86: 'ؤ',
  0xFE87: 'إ', 0xFE88: 'إ',
  0xFE89: 'ئ', 0xFE8A: 'ئ', 0xFE8B: 'ئ', 0xFE8C: 'ئ',
  0xFE8D: 'ا', 0xFE8E: 'ا',
  0xFE8F: 'ب', 0xFE90: 'ب', 0xFE91: 'ب', 0xFE92: 'ب',
  0xFE93: 'ة', 0xFE94: 'ة',
  0xFE95: 'ت', 0xFE96: 'ت', 0xFE97: 'ت', 0xFE98: 'ت',
  0xFE99: 'ث', 0xFE9A: 'ث', 0xFE9B: 'ث', 0xFE9C: 'ث',
  0xFE9D: 'ج', 0xFE9E: 'ج', 0xFE9F: 'ج', 0xFEA0: 'ج',
  0xFEA1: 'ح', 0xFEA2: 'ح', 0xFEA3: 'ح', 0xFEA4: 'ح',
  0xFEA5: 'خ', 0xFEA6: 'خ', 0xFEA7: 'خ', 0xFEA8: 'خ',
  0xFEA9: 'د', 0xFEAA: 'د',
  0xFEAB: 'ذ', 0xFEAC: 'ذ',
  0xFEAD: 'ر', 0xFEAE: 'ر',
  0xFEAF: 'ز', 0xFEB0: 'ز',
  0xFEB1: 'س', 0xFEB2: 'س', 0xFEB3: 'س', 0xFEB4: 'س',
  0xFEB5: 'ش', 0xFEB6: 'ش', 0xFEB7: 'ش', 0xFEB8: 'ش',
  0xFEB9: 'ص', 0xFEBA: 'ص', 0xFEBB: 'ص', 0xFEBC: 'ص',
  0xFEBD: 'ض', 0xFEBE: 'ض', 0xFEBF: 'ض', 0xFEC0: 'ض',
  0xFEC1: 'ط', 0xFEC2: 'ط', 0xFEC3: 'ط', 0xFEC4: 'ط',
  0xFEC5: 'ظ', 0xFEC6: 'ظ', 0xFEC7: 'ظ', 0xFEC8: 'ظ',
  0xFEC9: 'ع', 0xFECA: 'ع', 0xFECB: 'ع', 0xFECC: 'ع',
  0xFECD: 'غ', 0xFECE: 'غ', 0xFECF: 'غ', 0xFED0: 'غ',
  0xFED1: 'ف', 0xFED2: 'ف', 0xFED3: 'ف', 0xFED4: 'ف',
  0xFED5: 'ق', 0xFED6: 'ق', 0xFED7: 'ق', 0xFED8: 'ق',
  0xFED9: 'ك', 0xFEDA: 'ك', 0xFEDB: 'ك', 0xFEDC: 'ك',
  0xFEDD: 'ل', 0xFEDE: 'ل', 0xFEDF: 'ل', 0xFEE0: 'ل',
  0xFEE1: 'م', 0xFEE2: 'م', 0xFEE3: 'م', 0xFEE4: 'م',
  0xFEE5: 'ن', 0xFEE6: 'ن', 0xFEE7: 'ن', 0xFEE8: 'ن',
  0xFEE9: 'ه', 0xFEEA: 'ه', 0xFEEB: 'ه', 0xFEEC: 'ه',
  0xFEED: 'و', 0xFEEE: 'و',
  0xFEEF: 'ى', 0xFEF0: 'ى',
  0xFEF1: 'ي', 0xFEF2: 'ي', 0xFEF3: 'ي', 0xFEF4: 'ي',
  0xFEF5: 'لآ', 0xFEF6: 'لآ',
  0xFEF7: 'لأ', 0xFEF8: 'لأ',
  0xFEF9: 'لإ', 0xFEFA: 'لإ',
  0xFEFB: 'لا', 0xFEFC: 'لا',
};

export function normalizePresentationForms(text: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (PRESENTATION_FORMS_MAP[code]) {
      result += PRESENTATION_FORMS_MAP[code];
    } else {
      result += text[i];
    }
  }
  return result;
}

export type ReverseMode = 'perLine' | 'fullReverse' | 'reverseLines' | 'fixPdfForms';

export function fixReversedArabic(text: string, mode: ReverseMode): string {
  if (!text) return '';

  // Always normalize presentation forms first to restore real Arabic cursive connectivity
  const base = normalizePresentationForms(text);

  switch (mode) {
    case 'perLine': {
      // Reverse characters in each line separately
      return base
        .split('\n')
        .map((line) => [...line].reverse().join(''))
        .join('\n');
    }
    case 'fullReverse': {
      // Reverse entire string including newlines
      return [...base].reverse().join('');
    }
    case 'reverseLines': {
      // Reverse line order without changing character order inside lines
      return base.split('\n').reverse().join('\n');
    }
    case 'fixPdfForms': {
      // Specifically target broken PDF copy: characters reversed per line AND presentation forms
      return base
        .split('\n')
        .map((line) => [...line].reverse().join(''))
        .join('\n');
    }
    default:
      return base;
  }
}

/**
 * Arabizi to Arabic Transliteration
 */
const ARABIZI_WORD_DICTIONARY: Record<string, string> = {
  marhaba: 'مرحبا',
  mar7aba: 'مرحبا',
  salam: 'سلام',
  shukran: 'شكرا',
  chokran: 'شكرا',
  choukran: 'شكرا',
  shokran: 'شكرا',
  afwan: 'عفوا',
  '3afwan': 'عفوا',
  ahlan: 'أهلا',
  keefak: 'كيفك',
  kifak: 'كيفك',
  keefek: 'كيفك',
  inshallah: 'إن شاء الله',
  inshaallah: 'إن شاء الله',
  inshallah2: 'إن شاء الله',
  alhamdulillah: 'الحمد لله',
  alhamdolelah: 'الحمد لله',
  habibi: 'حبيبي',
  '7abibi': 'حبيبي',
  habibti: 'حبيبتي',
  '7abibti': 'حبيبتي',
  tamam: 'تمام',
  mzyan: 'مزيان',
  mezyan: 'مزيان',
  labas: 'لاباس',
  wahed: 'واحد',
  whed: 'واحد',
  tbarkellah: 'تبارك الله',
  yallah: 'يلا',
  yalla: 'يلا',
  sa7a: 'صحة',
  saha: 'صحة',
  sbah: 'صباح',
  sba7: 'صباح',
  massa: 'مساء',
  masae: 'مساء',
  kbeer: 'كبير',
  kbir: 'كبير',
  sagheer: 'صغير',
  sghir: 'صغير',
  ktir: 'كتير',
  keteer: 'كتير',
  bzaf: 'بزاف',
  bezzaf: 'بزاف',
  mashi: 'ماشي',
  mesh: 'مش',
  mish: 'مش',
  wala: 'ولا',
  wallah: 'والله',
  walah: 'والله',
};

const ARABIZI_CHAR_MAP: [RegExp, string][] = [
  // Multi-character combinations first
  [/3'/gi, 'غ'],
  [/gh/gi, 'غ'],
  [/kh/gi, 'خ'],
  [/5/g, 'خ'],
  [/sh/gi, 'ش'],
  [/ch/gi, 'ش'],
  [/th/gi, 'ث'],
  [/dh/gi, 'ذ'],
  [/ou/gi, 'و'],
  [/ee/gi, 'ي'],
  [/oo/gi, 'و'],
  [/aa/gi, 'ا'],

  // Numbers to Arabic letters
  [/2/g, 'ء'],
  [/3/g, 'ع'],
  [/6/g, 'ط'],
  [/7/g, 'ح'],
  [/8/g, 'ق'],
  [/9/g, 'ص'],

  // Individual consonants
  [/b/gi, 'ب'],
  [/t/gi, 'ت'],
  [/j/gi, 'ج'],
  [/d/gi, 'د'],
  [/r/gi, 'ر'],
  [/z/gi, 'ز'],
  [/s/gi, 'س'],
  [/f/gi, 'ف'],
  [/q/gi, 'ق'],
  [/k/gi, 'ك'],
  [/l/gi, 'ل'],
  [/m/gi, 'م'],
  [/n/gi, 'ن'],
  [/h/gi, 'ه'],
  [/w/gi, 'و'],
  [/y/gi, 'ي'],
  [/a/gi, 'ا'],
  [/e/gi, 'ا'],
  [/i/gi, 'ي'],
  [/o/gi, 'و'],
  [/u/gi, 'و'],
];

export function convertArabiziToArabic(text: string): string {
  if (!text) return '';

  // Process word by word to match dictionary first
  const words = text.split(/(\s+|[.,!?:;،؟]+)/);

  const translatedWords = words.map((token) => {
    // If it's punctuation or whitespace, keep it
    if (/^[\s.,!?:;،؟]+$/.test(token)) return token;

    const lower = token.toLowerCase();
    if (ARABIZI_WORD_DICTIONARY[lower]) {
      return ARABIZI_WORD_DICTIONARY[lower];
    }

    // Check if it already has Arabic
    if (/[\u0600-\u06FF]/.test(token)) {
      return token;
    }

    let converted = token;
    for (const [pattern, replacement] of ARABIZI_CHAR_MAP) {
      converted = converted.replace(pattern, replacement);
    }

    // Replace multiple alifs if accidentally produced
    converted = converted.replace(/ا{3,}/g, 'اا');

    return converted;
  });

  return translatedWords.join('');
}

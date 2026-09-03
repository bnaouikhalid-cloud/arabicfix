// Standard Arabic 101/102 QWERTY Keyboard Mapping
export const EN_TO_AR_MAP: Record<string, string> = {
  '`': 'ذ',
  '~': 'ّ',
  'q': 'ض',
  'Q': 'َ',
  'w': 'ص',
  'W': 'ً',
  'e': 'ث',
  'E': 'ُ',
  'r': 'ق',
  'R': 'ٌ',
  't': 'ف',
  'T': 'لإ',
  'y': 'غ',
  'Y': 'إ',
  'u': 'ع',
  'U': '‘',
  'i': 'ه',
  'I': '÷',
  'o': 'خ',
  'O': '×',
  'p': 'ح',
  'P': '؛',
  '[': 'ج',
  '{': '<',
  ']': 'د',
  '}': '>',
  'a': 'ش',
  'A': 'ِ',
  's': 'س',
  'S': 'ٍ',
  'd': 'ي',
  'D': ']',
  'f': 'ب',
  'F': '[',
  'g': 'ل',
  'G': 'لأ',
  'h': 'ا',
  'H': 'أ',
  'j': 'ت',
  'J': 'ـ',
  'k': 'ن',
  'K': '،',
  'l': 'م',
  'L': '/',
  ';': 'ك',
  ':': ':',
  "'": 'ط',
  '"': '"',
  'z': 'ئ',
  'Z': '~',
  'x': 'ء',
  'X': 'ْ',
  'c': 'ؤ',
  'C': '}',
  'v': 'ر',
  'V': '{',
  'b': 'لا',
  'B': 'لآ',
  'n': 'ى',
  'N': 'آ',
  'm': 'ة',
  'M': '’',
  ',': 'و',
  '<': ',',
  '.': 'ز',
  '>': '.',
  '/': 'ظ',
  '?': '؟',
};

// Build reverse map (Arabic to English)
export const AR_TO_EN_MAP: Record<string, string> = {};

// Handle multi-character ligatures first
AR_TO_EN_MAP['لإ'] = 'T';
AR_TO_EN_MAP['لأ'] = 'G';
AR_TO_EN_MAP['لآ'] = 'B';
AR_TO_EN_MAP['لا'] = 'b';

// Populate standard single character mapping
for (const [en, ar] of Object.entries(EN_TO_AR_MAP)) {
  if (!AR_TO_EN_MAP[ar]) {
    AR_TO_EN_MAP[ar] = en;
  }
}

export function convertEnKeyboardToAr(input: string): string {
  let result = '';
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    result += EN_TO_AR_MAP[char] !== undefined ? EN_TO_AR_MAP[char] : char;
  }
  return result;
}

export function convertArKeyboardToEn(input: string): string {
  let result = '';
  let i = 0;
  while (i < input.length) {
    // Check 2-character ligatures
    const twoChars = input.slice(i, i + 2);
    if (AR_TO_EN_MAP[twoChars]) {
      result += AR_TO_EN_MAP[twoChars];
      i += 2;
      continue;
    }
    const oneChar = input[i];
    result += AR_TO_EN_MAP[oneChar] !== undefined ? AR_TO_EN_MAP[oneChar] : oneChar;
    i++;
  }
  return result;
}

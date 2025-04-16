export const supportedLocales = {
  en: { label: "English", flag: "🇺🇸" },
  ko: { label: "한국어", flag: "🇰🇷" },
  ja: { label: "日本語", flag: "🇯🇵" },
};

export type Locale = keyof typeof supportedLocales;

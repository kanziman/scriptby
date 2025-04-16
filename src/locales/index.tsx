// src/i18n/index.tsx
import { ReactNode } from "react";
import { IntlProvider } from "react-intl";
import { useSettings } from "../context/SettingsContext";

// 번역 메시지들
import en from "../locales/messages/en";
import ja from "../locales/messages/ja";
import ko from "../locales/messages/ko";

const messages = {
  en,
  ko,
  ja,
};

interface I18nProviderProps {
  children: ReactNode;
}

function I18nProvider({ children }: I18nProviderProps) {
  const { locale } = useSettings();
  return (
    <IntlProvider
      locale={locale}
      defaultLocale="ko"
      messages={messages[locale as keyof typeof messages]}
    >
      {children}
    </IntlProvider>
  );
}

export default I18nProvider;

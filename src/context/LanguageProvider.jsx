import { createContext, useContext, useState } from "react";
import { IntlProvider } from "react-intl";

// 메시지 가져오기
import enMessages from "../locales/en.json";
import koMessages from "../locales/ko.json";

// 메시지 매핑
export const messages = {
  ko: koMessages,
  en: enMessages,
};

const LanguageContext = createContext({
  locale: "ko",
  changeLanguage: () => {},
});

function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("ko");

  const changeLanguage = (newLocale) => {
    if (messages[newLocale]) {
      setLocale(newLocale);
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage }}>
      <IntlProvider
        messages={messages[locale]}
        locale={locale}
        defaultLocale="ko"
      >
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
}

function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined)
    throw new Error("LanguageContext was used outside of the QuizProvider");
  return context;
}

export { LanguageProvider, useLanguage };

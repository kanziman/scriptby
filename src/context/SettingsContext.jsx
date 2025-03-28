import { createContext, useContext, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

// 메시지 가져오기
import enMessages from "../locales/en.json";
import koMessages from "../locales/ko.json";

// 메시지 매핑
const messages = {
  en: enMessages,
  ko: koMessages,
};

const SettingsContext = createContext();

function SettingsProvider({ children }) {
  // 초기값: localStorage에 저장된 값이 없으면 기본값 { locale: "ko", darkMode: system default } 사용
  const initialSettings = {
    locale: "ko",
    darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
  };

  // settings 객체를 localStorage에 "settings" 키로 저장
  const [settings, setSettings] = useLocalStorageState(
    initialSettings,
    "settings"
  );

  // 다크모드 적용: settings.darkMode 값에 따라 document 클래스 토글
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [settings.darkMode]);

  // 다크모드 토글 함수
  function toggleDarkMode() {
    setSettings((prevSettings) => ({
      ...prevSettings,
      darkMode: !prevSettings.darkMode,
    }));
  }

  // 언어 변경 함수

  function changeLanguage(newLocale) {
    if (messages[newLocale]) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        locale: newLocale,
      }));
    }
  }

  return (
    <SettingsContext.Provider
      value={{ ...settings, toggleDarkMode, changeLanguage }}
    >
      <IntlProvider
        messages={messages[settings.locale]}
        locale={settings.locale}
        defaultLocale="ko"
      >
        {children}
      </IntlProvider>
    </SettingsContext.Provider>
  );
}

function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("SettingsContext must be used within a SettingsProvider");
  }
  return context;
}

export { SettingsProvider, useSettings };

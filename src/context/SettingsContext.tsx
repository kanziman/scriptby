import { createContext, ReactNode, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { Locale } from "../locales/supportedLocales";

// -------- 타입 정의 --------
interface SettingsContextType {
  locale: Locale;
  darkMode: boolean;
  toggleDarkMode: () => void;
  changeLanguage: (newLocale: Locale) => void;
}
type Settings = { locale: Locale; darkMode: boolean };

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

// -------- Provider 컴포넌트 --------
interface SettingsProviderProps {
  children: ReactNode;
}

function SettingsProvider({ children }: SettingsProviderProps): JSX.Element {
  const initialSettings: Settings = {
    locale: "ko",
    darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
  };

  const [settings, setSettings] = useLocalStorageState<Settings>(
    initialSettings,
    "settings"
  );

  // 다크모드 반영
  useEffect(() => {
    const root = document.documentElement;
    if (settings.darkMode) {
      root.classList.add("dark-mode");
      root.classList.remove("light-mode");
    } else {
      root.classList.add("light-mode");
      root.classList.remove("dark-mode");
    }
  }, [settings.darkMode]);

  // 다크모드 토글
  const toggleDarkMode = () => {
    setSettings((prev) => ({
      ...prev,
      darkMode: !prev.darkMode,
    }));
  };

  // 언어 변경
  const changeLanguage = (newLocale: Locale) => {
    setSettings((prev) => ({ ...prev, locale: newLocale }));
  };
  return (
    <SettingsContext.Provider
      value={{
        locale: settings.locale,
        darkMode: settings.darkMode,
        toggleDarkMode,
        changeLanguage,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

// -------- 커스텀 훅 --------
function useSettings(): SettingsContextType {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

export { SettingsProvider, useSettings };

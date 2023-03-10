import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IntlProvider } from "react-intl";
import English from "../languages/eg-US.json";
import Thai from "../languages/th.json";
import { ALL_LANGUAGES } from "../types/constants";

interface Props {
  children: ReactNode;
}

interface LanguageState {
  locale: string;
  changeLanguage: (languageCode: string, setLs: boolean) => void;
}

const LanguageContext = createContext<LanguageState | undefined>(undefined);

const LanguageContextProvider = ({ children }: Props) => {
  const [locale, setLocale] = useState<string>(ALL_LANGUAGES.English);
  const [messages, setMessages] = useState(English);

  const changeLanguage = (languageCode: string, setLs: boolean) => {
    switch (languageCode) {
      case ALL_LANGUAGES.English:
        setMessages(English);
        break;
      case ALL_LANGUAGES.Thai:
        setMessages(Thai);
        break;
      default:
        setMessages(English);
    }

    let locale = "";

    if (Object.values(ALL_LANGUAGES).includes(languageCode)) {
      locale = languageCode;
    } else {
      locale = ALL_LANGUAGES.English;
    }

    setLocale(locale);

    // store it in local storage
    setLs && localStorage.setItem("locale", locale);
  };

  useEffect(() => {
    const preference = localStorage.getItem("locale");

    // if present in ls, use it
    if (preference) {
      changeLanguage(preference, false);
    } else if (navigator.language) {
      // else try to get user's locale
      changeLanguage(navigator.language, true);
    } else {
      changeLanguage(ALL_LANGUAGES.English, true);
    }
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        locale,
        changeLanguage,
      }}
    >
      <IntlProvider
        messages={messages}
        locale={locale}
        defaultLocale={ALL_LANGUAGES.English}
      >
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

// custom hook
export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error(
      "useLanguage must be used within a LanguageContextProvider"
    );
  }

  return context;
};

export default LanguageContextProvider;

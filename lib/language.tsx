import {
  getStoredLanguage,
  getNavigatorLanguage,
} from "lib/helpers";

export type Language = "english" | "espanol";

const storedLanguage = getStoredLanguage();

function getDefaultBrowserLanguage(): Language {
  const navigatorLanguage = getNavigatorLanguage();
  const browserLanguage = navigatorLanguage?.includes("en")
    ? "english"
    : "espanol";

  return browserLanguage;
}
// Get Language
export function getPreferredLanguage(): Language {
  let language;

  if (!storedLanguage) {
    language = getDefaultBrowserLanguage();
    setPreferredLanguage(language);
  } else {
    language = storedLanguage;
  }

  if (language === "espanol") {
    return "espanol";
  }
  return "english";
}

// Set Language
export function setPreferredLanguage(language: Language) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("user_language", language);
  }
}

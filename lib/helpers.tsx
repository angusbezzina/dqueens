import { STRAPI_API_URL } from "./constants";

export const getStoredLanguage = () => {
  if(typeof window !== "undefined") {
    const storedLanguage = window.localStorage.getItem("user_language");

    return storedLanguage;
  }
}

export const getNavigatorLanguage = () => {
  if (typeof window !== "undefined") {
    const navigatorLanguage = window.navigator.language;

    return navigatorLanguage;
  }
};

export const urlBuilder = (urlPartial: string) => {
  return STRAPI_API_URL + urlPartial;
}

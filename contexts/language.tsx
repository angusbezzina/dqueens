import React from "react";
import {
  Language,
  setPreferredLanguage,
  getPreferredLanguage,
} from "lib/helpers/language";

interface LanguageState {
  language: Language;
}

interface SetLanguageAction {
  type: "set";
  payload: Language;
}

type LanguageAction = SetLanguageAction;

interface LanguageContext {
  state: LanguageState;
  setLanguage(language: Language): void;
}

const defaultState: LanguageState = { language: getPreferredLanguage() };

export const LanguageContext = React.createContext<LanguageContext>({
  state: defaultState,
  setLanguage() {},
});

export const useLanguage = () => React.useContext(LanguageContext);

function languageReducer(
  prevState: LanguageState,
  action: LanguageAction
): LanguageState {
  switch (action.type) {
    case "set":
      return {
        ...prevState,
        language: action.payload,
      };
    default:
      return prevState;
  }
}
export const LanguageContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(languageReducer, defaultState);
  function setLanguage(language: Language) {
    dispatch({ type: "set", payload: language });
    setPreferredLanguage(language);
  }
  return (
    <LanguageContext.Provider value={{ state, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

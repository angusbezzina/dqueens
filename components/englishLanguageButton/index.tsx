import React from "react";

import { LanguageContext } from "contexts/language";

const EnglishLanguageButton = () => {
  const { state, setLanguage } = React.useContext(LanguageContext);
  const isActive = state.language === "english";

  return (
    <button
      className={`${
        isActive
          ? "bg-secondary"
          : "bg-white"
      } px-3 py-2 rounded-tr rounded-br`}
      onClick={() => {
        setLanguage("english");
      }}
      title="English"
    >
      🇬🇧
    </button>
  );
};

export default EnglishLanguageButton;

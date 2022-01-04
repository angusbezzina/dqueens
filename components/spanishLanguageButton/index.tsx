import React from "react";

import { LanguageContext } from "contexts/language";

const SpanishLanguageButton = () => {
  const { state, setLanguage } = React.useContext(LanguageContext);
  const isActive = state.language === "espanol";

  return (
    <button
      className={`${
        isActive
          ? "bg-secondary"
          : "bg-white"
      } px-3 py-2 rounded-tl rounded-bl`}
      onClick={() => {
        setLanguage("espanol");
      }}
      title="Espanol"
    >
      🇲🇽
    </button>
  );
};

export default SpanishLanguageButton;

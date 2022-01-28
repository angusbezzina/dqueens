import React from "react";
import { useRouter } from "next/router";

const EnglishLanguageButton = () => {
  const { locale, asPath, push } = useRouter();
  const isActive = locale === "en";

  return (
    <button
      className={`${
        isActive ? "bg-secondary" : "bg-white"
      } px-3 py-2 rounded-tr rounded-br border-secondary`}
      onClick={() => {
        push(asPath, asPath, { locale: "en"});
      }}
      title="English"
    >
      🇺🇸
    </button>
  );
};

export default EnglishLanguageButton;

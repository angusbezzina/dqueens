import React from "react";
import { useRouter } from "next/router";

interface EnglishLanguageButtonProps {
  localizedPageUrl?: string;
}

const EnglishLanguageButton = ({ localizedPageUrl }: EnglishLanguageButtonProps) => {
  const { asPath, locale, push } = useRouter();
  const isActive = locale === "en";

  return (
    <button
      className={`${
        isActive ? "bg-secondary" : "bg-white"
      } px-3 py-2 rounded-tr rounded-br border-secondary`}
      onClick={() => {
        if (localizedPageUrl) {
          push(localizedPageUrl, localizedPageUrl, { locale: "en" });
        } else {
          push(asPath, asPath, { locale: "en" });
        }
      }}
      title="English"
    >
      🇺🇸
    </button>
  );
};

export default EnglishLanguageButton;

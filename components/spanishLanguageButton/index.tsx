import React from "react";
import { useRouter } from "next/router";

interface SpanishLanguageButtonProps {
  localizedPageUrl?: string;
}

const SpanishLanguageButton = ({ localizedPageUrl }: SpanishLanguageButtonProps) => {
  const { asPath, locale, push } = useRouter();
  const isActive = locale === "es-MX";

  return (
    <button
      className={`${
        isActive
          ? "bg-secondary"
          : "bg-white"
      } px-3 py-2 rounded-tl rounded-bl`}
      onClick={() => {
        if (localizedPageUrl) {
          push(localizedPageUrl, localizedPageUrl, { locale: "es-MX" });
        } else {
          push(asPath, asPath, { locale: "es-MX" });
        }
      }}
      title="Espanol"
    >
      🇲🇽
    </button>
  );
};

export default SpanishLanguageButton;

import React from "react";
import { useRouter } from "next/router";

const SpanishLanguageButton = () => {
  const { locale, asPath, push } = useRouter();
  const isActive = locale === "es-MX";

  return (
    <button
      className={`${
        isActive
          ? "bg-secondary"
          : "bg-white"
      } px-3 py-2 rounded-tl rounded-bl`}
      onClick={() => {
        push(asPath, asPath, { locale: "es-MX" });
      }}
      title="Espanol"
    >
      🇲🇽
    </button>
  );
};

export default SpanishLanguageButton;

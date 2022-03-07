import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointUp } from "@fortawesome/free-solid-svg-icons";

import { buttonLabels } from "lib/data/labels";

const ScrollToTopButton = () => {
  const { locale } = useRouter();
  const language = locale === "en" ? "en" : "es-MX";
  const [visible, setVisible] = useState(false);
  const [chameleonText, setChameleonText] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleChameleonText = () => {
    const scrolled = window.scrollY;
    const body = document.body;
    const html = document.documentElement;

    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    if (scrolled + window.innerHeight > height - 64) {
      setChameleonText(false);
    } else {
      setChameleonText(true);
    }
  };

  const toggleVisible = () => {
    const pageHeight = window.innerHeight;
    const scrolled = window.scrollY;

    if (scrolled > pageHeight) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", () => toggleVisible());
    document.addEventListener("scroll", () => toggleChameleonText());
    return () => {
      document.removeEventListener("scroll", () => toggleVisible());
      document.removeEventListener("scroll", () => toggleChameleonText());
    };
  }, []);

  return (
    <button
      className={`${
        visible ? "flex flex-row" : "hide"
      } fixed bottom-4 md:bottom-5 ${
        chameleonText ? "chameleonText" : ""
      } text-secondary scroll-up items-center z-40`}
      onClick={scrollToTop}
      type="button"
    >
      <p
        className={`inline text mr-2 ${chameleonText ? "text-secondary" : "text-white"}`}
      >
        {buttonLabels.scrollUp[language]}
      </p>
      <FontAwesomeIcon
        icon={faHandPointUp}
        className={`inline h-4 link-hover-animated ${
          chameleonText ? "text-secondary" : "text-white"
        }`}
      />
    </button>
  );
};

export default ScrollToTopButton;

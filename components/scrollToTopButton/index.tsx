import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointUp } from "@fortawesome/free-solid-svg-icons";

import { buttonLabels } from "lib/data/labels";

const ScrollToTopButton = () => {
  const { locale } = useRouter();
  const language = locale === "en" ? "en" : "es-MX";
  const [visible, setVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
    return () => document.removeEventListener("scroll", () => toggleVisible());
  }, []);

  return (
    <button
      className={`${
        visible ? "flex flex-row" : "hide"
      } fixed bottom-4 md:bottom-5 right-2 md:right-5 text-secondary scroll-up items-center z-40`}
      onClick={scrollToTop}
      type="button"
    >
      <p className="inline text mr-2">{buttonLabels.scrollUp[language]}</p>
      <FontAwesomeIcon
        icon={faHandPointUp}
        className="inline h-4 link-hover-animated"
      />
    </button>
  );
};

export default ScrollToTopButton;

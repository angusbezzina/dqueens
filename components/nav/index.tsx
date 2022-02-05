import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import SpanishLanguageButton from "components/spanishLanguageButton";
import EnglishLanguageButton from "components/englishLanguageButton";

import { navItems } from "lib/data/labels";

interface NavProps {
  headerActive: boolean;
  localizedPageUrl?: string;
}

const Nav = ({ headerActive, localizedPageUrl }: NavProps) => {
  const { locale } = useRouter();
  const language = locale === "en" ? "en" : "es-MX";
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);

  useEffect(() => {
    function calculateIsMobile() {
      const windowWidth = window.innerWidth;

      if (windowWidth <= 1024) {
        return setIsMobile(true);
      }

      return setIsMobile(false);
    }

    calculateIsMobile();
    window.addEventListener("resize", calculateIsMobile);

    return () => window.removeEventListener("resize", calculateIsMobile);
  }, [isMobile]);

  function toggleMobileMenu(mobileMenuState: boolean) {
    setIsMobileNavActive(!mobileMenuState);
  }

  if (isMobile) {
    return (
      <nav className="w-1/2 flex relative z-0 justify-end items-center">
        <button
          className="absolute top-4 right-0 z-20"
          type="button"
          onClick={() => toggleMobileMenu(isMobileNavActive)}
        >
          {isMobileNavActive ? (
            <FontAwesomeIcon
              icon={faTimes}
              className={`burger-menu text-white text-2xl hover:text-secondary`}
            />
          ) : (
            <FontAwesomeIcon
              icon={faBars}
              className={`burger-menu ${
                headerActive ? "text-primary" : "text-white"
              }  text-2xl hover:text-secondary`}
            />
          )}
        </button>
        <div
          className={`fixed top-0 right-0 bg-primary text-white h-screen w-full flex flex-col items-center justify-center z-10 transition-transform duration-300 ${
            isMobileNavActive ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-col items-center justify-center mr-5">
            <li>
              <Link href="/servicios" locale={language}>
                <a
                  className="inline-block mb-5 text-3xl link-underline"
                  title="Reservar Cita"
                >
                  {navItems.reservation[language]}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/servicios" locale={language}>
                <a
                  className="inline-block mb-5 text-3xl link-underline"
                  title="Servicios de Belleza"
                >
                  {navItems.services[language]}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/blog" locale={language}>
                <a
                  className="inline-block text-3xl mb-5 link-underline"
                  title="Blog"
                >
                  {navItems.blog[language]}
                </a>
              </Link>
            </li>
          </ul>
          <div className="absolute top-4 left-2 bg-white rounded">
            <SpanishLanguageButton localizedPageUrl={localizedPageUrl} />
            <EnglishLanguageButton localizedPageUrl={localizedPageUrl} />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-1/2 flex justify-end items-center">
      <ul className="flex items-center justify-end mr-5">
        <li>
          <Link href="/servicios" locale={language}>
            <a className="ml-2 mr-5 link-underline" title="Reservar Cita">
              Servicios de Belleza
            </a>
          </Link>
        </li>
        <li>
          <Link href="/blog" locale={language}>
            <a className="ml-2 mr-5 link-underline" title="Reservar Cita">
              Blog
            </a>
          </Link>
        </li>
      </ul>
      <div className="bg-white rounded">
        <SpanishLanguageButton localizedPageUrl={localizedPageUrl} />
        <EnglishLanguageButton localizedPageUrl={localizedPageUrl} />
      </div>
    </nav>
  );
};

export default Nav;

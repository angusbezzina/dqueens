import { useEffect, useState } from "react";
import Link from "next/link";

import SpanishLanguageButton from "components/spanishLanguageButton";
import EnglishLanguageButton from "components/englishLanguageButton";

const Nav = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);

  useEffect(() => {
    const windowWidth = window.innerWidth;

    const calculateIsMobile = () => {
      if (windowWidth <= 768) {
        console.log("is mobile");
        return setIsMobile(true);
      }

      return setIsMobile(false);
    };

    calculateIsMobile();
    window.addEventListener("resize", calculateIsMobile);

    return window.removeEventListener("resize", calculateIsMobile);
  }, [isMobile]);

  if (isMobile) {
    return (
      <nav className="w-1/2 flex justify-end items-center">
        Mobile
        {/* <ul className="flex items-center justify-end mr-5">
          <li>
            <Link href="/servicios">
              <a className="ml-2 mr-5 link-underline" title="Reservar Cita">
                Servicios de Belleza
              </a>
            </Link>
          </li>
          <li>
            <Link href="/blog">
              <a className="ml-2 mr-5 link-underline" title="Reservar Cita">
                Blog
              </a>
            </Link>
          </li>
        </ul>
        <div className="bg-white rounded">
          <SpanishLanguageButton />
          <EnglishLanguageButton />
        </div> */}
      </nav>
    );
  }

  return (
    <nav className="w-1/2 flex justify-end items-center">
      <ul className="flex items-center justify-end mr-5">
        <li>
          <Link href="/servicios">
            <a className="ml-2 mr-5 link-underline" title="Reservar Cita">
              Servicios de Belleza
            </a>
          </Link>
        </li>
        <li>
          <Link href="/blog">
            <a className="ml-2 mr-5 link-underline" title="Reservar Cita">
              Blog
            </a>
          </Link>
        </li>
      </ul>
      <div className="bg-white rounded">
        <SpanishLanguageButton />
        <EnglishLanguageButton />
      </div>
    </nav>
  );
};

export default Nav;

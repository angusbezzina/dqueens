import Link from "next/link";

import SpanishLanguageButton from "components/spanishLanguageButton";
import EnglishLanguageButton from "components/englishLanguageButton";

const Nav = () => {
  
  return (
    <nav className="w-1/2 flex justify-end items-center">
      <ul className="flex items-center justify-end mr-5">
        <li>
          <Link href="/services">
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

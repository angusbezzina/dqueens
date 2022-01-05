import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

import SpanishLanguageButton from "components/spanishLanguageButton";
import EnglishLanguageButton from "components/englishLanguageButton";

const Nav = () => {
  return (
    <nav className="w-1/2 md:w-1/4 flex justify-end items-center">
      <ul className="flex items-center justify-end mr-5">
        <li>
          <a
            href="https://angry-beaver-170c64.netlify.app"
            className="ml-2 link-underline"
            title="AR Experience"
          >
            <FontAwesomeIcon icon={faCrown} />
          </a>
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

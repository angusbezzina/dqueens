import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import Logo from "components/logo";
import ScrollToTopButton from "components/scrollToTopButton";

interface FooterProps {
  socialDetails: any;
}

const Footer = ({ socialDetails }: FooterProps) => {
  const {
    attributes: { horario, instagram, facebook, twitter },
  } = socialDetails;

  return (
    <footer className="absolute bottom-0 left-0 w-full h-16 bg-tertiary bg-opacity-90 text-white">
      <div className="relative h-full p-2 w-full max-w-7xl mx-auto flex items-center justify-center">
        <div className="absolute bottom-1 left-2 md:left-10">
          <Logo size="small" />
        </div>
        <div className="absolute left-24 text-sm max-w-xxs hidden md:inline-block">
          {horario}
        </div>
        <div className="grid grid-cols-2 gap-4 lg:gap-8">
          <a
            href={instagram}
            className="hover:text-secondary"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className="inline-block text-lg md:text-2xl"
            />
          </a>
          <a
            href={facebook}
            className="hover:text-secondary"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              className="inline-block text-lg md:text-2xl w-12"
            />
          </a>
          {/* {twitter && (
            <a
              href={twitter}
              className="hover:text-secondary"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon
                icon={faTwitter}
                className="inline-block text-lg md:text-2xl w-12"
              />
            </a>
          )} */}
        </div>
        <ScrollToTopButton />
      </div>
    </footer>
  );
};

export default Footer;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import Logo from "components/logo";

interface FooterProps {
  socialDetails: any;
}

const Footer = ({ socialDetails }: FooterProps) => {
  const {
    attributes: { horario, instagram, facebook, twitter },
  } = socialDetails;

  return (
    <footer className="absolute bottom-0 left-0 w-full h-16 p-2 flex items-center justify-center bg-tertiary bg-opacity-90 text-white">
      <div className="absolute bottom-1 left-2 md:left-10">
        <Logo size="small" />
      </div>
      <div className="absolute left-24 text-sm max-w-xxs hidden md:inline-block">
        {horario}
      </div>
      <div className="grid grid-cols-3 gap-4 lg:gap-8">
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
      </div>
    </footer>
  );
};

export default Footer;

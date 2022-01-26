import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import Logo from "components/logo";
import Container from "components/container";

interface FooterProps {
  socialDetails: any;
}

const Footer = ({ socialDetails }: FooterProps) => {
  const {
    attributes: { horario, instagram, facebook, twitter },
  } = socialDetails;

  return (
    <footer className="absolute bottom-0 left-0 w-full h-16 p-2 flex items-center justify-center bg-tertiary bg-opacity-90 text-white">
      <div className="absolute bottom-1 left-8">
        <Logo size="small" />
      </div>
      <div className="absolute left-24 text-sm max-w-xxs hidden md:inline-block">{horario}</div>
      <div className="">
        <a
          href={instagram}
          className="hover:text-secondary"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            icon={faInstagram}
            className="inline-block h-4 w-12 mr-5"
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
            className="inline-block h-4 w-12 mr-5"
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
            className="inline-block h-4 w-12 mr-5"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

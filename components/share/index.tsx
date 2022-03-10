import React from "react";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ShareProps {
  url: string;
  title: string;
}

const Share = ({ url, title }: ShareProps) => {
  return (
    <div className="w-full text-center mt-10">
      <h6 className="text-secondary">{title}:</h6>
      <ul className="flex justify-center items-center text-primary">
        <li>
          <a
            className="hover hover:text-secondary"
            href={`https://www.facebook.com/sharer.php?u=${url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} className="h-4 md:h-8 mx-5" />
          </a>
        </li>
        <li>
          <a
            className="hover hover:text-secondary"
            href={`https://twitter.com/intent/tweet?url=${url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} className="h-4 md:h-8 mx-5" />
          </a>
        </li>
        <li>
          <a
            className="hover hover:text-secondary"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} className="h-4 md:h-8 mx-5" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Share;

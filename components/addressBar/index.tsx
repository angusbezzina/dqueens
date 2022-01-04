import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import { useLanguage } from "contexts/language";

import { sectionTitles } from "lib/data/labels";

const AddressBar = () => {
  const languageState = useLanguage();
  const language = languageState.state.language;

  return (
    <div className="md:absolute md:bottom-0 md:left-0 px-2 py-10 md:p-10 shadow-lg bg-white w-full md:w-1/3 z-10">
      <h3>{sectionTitles.contact[language]}</h3>
      <address className="grid grid-cols-1 gap-5 bg-white">
        <a
          href="tel:+5555555555"
          className="flex items-center hover:text-primary"
        >
          <FontAwesomeIcon icon={faPhone} className="h-4 w-12 mr-5" />
          +55 5555 5555
        </a>
        <a
          href="mailto:youremailhere@dqueens.com"
          className="flex items-center hover:text-primary"
        >
          <FontAwesomeIcon icon={faEnvelope} className="h-4 w-12 mr-5" />
          karen@dqueens.com.mx
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=5555555555"
          className="flex items-center hover:text-primary"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-12 mr-5" />
          WhatsApp
        </a>
        <a
          href="https://www.google.com/maps/place/Santiago+de+Quer%C3%A9taro,+Qro./data=!4m2!3m1!1s0x85d35b8fdc5b9255:0x97b094aa561b832f?sa=X&ved=2ahUKEwiCvILNxIn1AhU5SGwGHV5xBz0Q8gF6BAhGEAE"
          target="_blank"
          rel="noreferrer"
          className="flex items-center hover:text-primary"
        >
          <FontAwesomeIcon icon={faMapMarkerAlt} className="h-4 w-12 mr-5" />
          <p className="inline-block">
            Av Constituyentes 57, Cimatario, 76030,
            <br />
            Santiago de Querétaro, Qro.
          </p>
        </a>
      </address>
    </div>
  );
};

export default AddressBar;

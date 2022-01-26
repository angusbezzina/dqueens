import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import { useLanguage } from "contexts/language";

import { sectionTitles } from "lib/data/labels";
import { formatMarkdown } from "lib/markdown";

interface AddressBarProps {
  contactDetails: any;
}

const AddressBar = ({ contactDetails }: AddressBarProps ) => {
  const languageState = useLanguage();
  const language = languageState.state.language;

  console.log(contactDetails);

  const {
    attributes: {
      numeroDeTelefono,
      correoElectronico,
      numeroDeWhatsApp,
      direccion,
      enlaceDeDireccion,
    },
  } = contactDetails;

  return (
    <div className="md:absolute md:bottom-0 md:left-0 px-2 py-10 md:p-10 shadow-lg bg-white w-full md:w-1/2 xl:w-1/3 z-10">
      <h3>{sectionTitles.contact[language]}</h3>
      <address className="grid grid-cols-1 gap-5 bg-white">
        <a
          href={`tel:+${numeroDeTelefono.replace(/ /g, "")}`}
          className="flex items-center hover:text-primary"
        >
          <FontAwesomeIcon icon={faPhone} className="h-4 w-12 mr-5" />+
          {numeroDeTelefono}
        </a>
        <a
          href={`mailto:${correoElectronico}`}
          className="flex items-center hover:text-primary"
        >
          <FontAwesomeIcon icon={faEnvelope} className="h-4 w-12 mr-5" />
          {correoElectronico}
        </a>
        <a
          href={`https://api.whatsapp.com/send?phone=${numeroDeWhatsApp.replace(/ /g, "")}`}
          className="flex items-center hover:text-primary"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-12 mr-5" />
          WhatsApp
        </a>
        <a
          href={enlaceDeDireccion}
          target="_blank"
          rel="noreferrer"
          className="flex items-center hover:text-primary"
        >
          <FontAwesomeIcon icon={faMapMarkerAlt} className="h-4 w-12 mr-5" />
          <p className="inline-block max-w-sm">{formatMarkdown(direccion)}</p>
        </a>
      </address>
    </div>
  );
};

export default AddressBar;

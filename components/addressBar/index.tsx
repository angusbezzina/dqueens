import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import { sectionTitles } from "lib/data/labels";
import { formatMarkdown } from "lib/markdown";

interface AddressBarProps {
  contactDetails: any;
}

const AddressBar = ({ contactDetails }: AddressBarProps) => {
  const { locale } = useRouter();
  const language = locale === "en" ? "en" : "es-MX";

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
          className="flex items-center hover hover:ease-in hover:duration-300 hover:text-primary"
        >
          <div className="flex items-center justify-start w-6 mr-2">
            <FontAwesomeIcon icon={faPhone} className="w-4  " />+
          </div>
          {numeroDeTelefono}
        </a>
        <a
          href={`mailto:${correoElectronico}`}
          className="flex items-center hover hover:text-primary"
        >
          <div className="flex items-center justify-start w-6 mr-2">
            <FontAwesomeIcon icon={faEnvelope} className="w-4  " />
          </div>
          {correoElectronico}
        </a>
        <a
          href={`https://api.whatsapp.com/send?phone=${numeroDeWhatsApp.replace(
            / /g,
            ""
          )}`}
          className="flex items-center hover hover:text-primary"
        >
          <div className="flex items-center justify-start w-6 mr-2">
            <FontAwesomeIcon icon={faWhatsapp} className="w-4  " />
          </div>
          WhatsApp
        </a>
        <a
          href={enlaceDeDireccion}
          target="_blank"
          rel="noreferrer"
          className="flex items-center hover hover:text-primary"
        >
          <div className="flex items-center justify-start w-6 mr-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4  " />
          </div>
          <p className="inline-block max-w-xs">{formatMarkdown(direccion)}</p>
        </a>
      </address>
    </div>
  );
};

export default AddressBar;

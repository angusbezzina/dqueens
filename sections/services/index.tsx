import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Container from "components/container";
import Carousel from "components/carousel";

import { sectionTitles } from "lib/data/labels";

const Services = (serviceData: any) => {
  const { locale } = useRouter();
  const language = locale === "en" ? "en" : "es-MX";

  const { serviceList } = serviceData;

  const serviceSlides = serviceList.map((service: any, index: number) => {
    const {
      attributes: { titulo, slug, fotoPrincipal },
    } = service;

    const {
      data: {
        attributes: { url: fotoUrl },
      },
    } = fotoPrincipal;

    return (
      <Link href={`/servicios/${slug}`} key={index}>
        <a className="flex flex-col p-5 items-center rounded-lg justify-start shadow-none hover-text-white hover hover:bg-primary hover:shadow-lg">
          {fotoUrl && (
            <Image
              alt={titulo}
              className="block border-hidden rounded-full object-cover object-center"
              height={300}
              priority={true}
              src={fotoUrl}
              width={300}
            />
          )}
          <h4 className="mt-5 mb-0 text-center">{titulo}</h4>
        </a>
      </Link>
    );
  });

  return (
    <Container classNames="px-2 py-10 md:p-10 border-bottom-gold">
      <Link href="/servicios">
        <a className="block text-center">
          <h3 className="inline-block link-underline text-center">
            {sectionTitles.services[language]}
          </h3>
        </a>
      </Link>
      {serviceList && <Carousel slides={serviceSlides} />}
    </Container>
  );
};

export default Services;

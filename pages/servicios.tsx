import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Carousel from "components/carousel";
import Hero from "components/hero";
import Page from "components/page";
import ScrollToTopButton from "components/scrollToTopButton";

import About from "sections/about";
import Contact from "sections/contact";

import { buttonLabels, sectionTitles } from "lib/data/labels";
import { getStrapiCollection } from "lib/strapi-api";
import Container from "components/container";

const Services: NextPage = ({
  contenido,
  informacionDelContacto,
  services,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { locale } = useRouter();
  const language = locale === "en" ? "en" : "es-MX";

  const {
    data: {
      attributes: {
        titulo: titulo,
        subtitulo: subtitulo,
        contenido: contenidoPrincipal,
        fotoPrincipal: fotoPrincipal,
        videoURL,
      },
    },
  } = contenido;

  const {
    data: {
      attributes: { url: fotoUrl },
    },
  } = fotoPrincipal;

  const serviceSlides = services?.data
    .sort((a: any, b: any) =>
      a?.attributes?.titulo.localeCompare(b?.attributes?.titulo)
    )
    .map((service: any, index: number) => {
      const {
        attributes: { titulo, slug, extracto, fotoPrincipal },
      } = service;

      const {
        data: {
          attributes: { url: serviceFotoUrl },
        },
      } = fotoPrincipal;

      return (
        <Link href={`/servicios/${slug}`} key={index}>
          <a className="flex flex-col m-2 p-5 items-center rounded-lg justify-center shadow-none hover-text-white hover:bg-primary hover:text-white hover:shadow-md">
            {serviceFotoUrl && (
              <Image
                alt={titulo}
                className="block border-hidden rounded-full object-cover oject-center"
                height={300}
                src={serviceFotoUrl}
                width={300}
              />
            )}
            <h4 className="my-5 text-center">{titulo}</h4>
            <p className="text-center">{extracto}</p>
            <span className="mt-5 link-underline">
              {buttonLabels.bookNow[language]}
            </span>
          </a>
        </Link>
      );
    });

  return (
    <Page
      classNames="relative"
      title={titulo}
      image={fotoUrl}
      description={contenidoPrincipal.substring(0, 100)}
      socialDetails={informacionDelContacto?.data}
    >
      <Hero
        title={titulo}
        subtitle={subtitulo}
        photo={fotoUrl}
        video={videoURL}
        scrollButton={buttonLabels.scrollDown[language]}
      />
      <About content={contenidoPrincipal} />
      <Container classNames="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2 py-10 md:p-10">
        {serviceSlides}
      </Container>
      <Contact contactDetails={informacionDelContacto?.data} />
      <ScrollToTopButton />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async (PageContext) => {
  const { locale } = PageContext;
  const contenido = await getStrapiCollection(
    "servicios-de-belleza",
    "*",
    locale
  );
  const services = await getStrapiCollection("servicios", "*", locale);
  const informacionDelContacto = await getStrapiCollection(
    "informacion-del-contacto",
    "*",
    locale
  );

  if (!contenido || !informacionDelContacto || !services) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      services,
      contenido,
      informacionDelContacto,
    },
  };
};

export default Services;

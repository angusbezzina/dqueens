import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";

import Carousel from "components/carousel";
import Hero from "components/hero";
import Page from "components/page";
import ScrollToTopButton from "components/scrollToTopButton";

import { useLanguage } from "contexts/language";

import About from "sections/about";
import Contact from "sections/contact";

import { buttonLabels, sectionTitles } from "lib/data/labels";
import { getStoredLanguage, urlBuilder } from "lib/helpers";
import { getStrapiCollection } from "lib/strapi-api";
import Container from "components/container";

const Services: NextPage = ({
  contenido,
  services,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const languageState = useLanguage();
  const language = languageState.state.language;

  const {
    data: {
      attributes: {
        Titulo: titulo,
        Subtitulo: subtitulo,
        Contenido: contenidoPrincipal,
        FotoPrincipal: fotoPrincipal,
      },
    },
  } = contenido;

  const {
    data: {
      attributes: { url: fotoUrl },
    },
  } = fotoPrincipal;

  getStoredLanguage();

  const serviceSlides = services?.data.map((service: any, index: number) => {
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
        <a className="flex flex-col p-5 items-center rounded-lg justify-center shadow-none hover:bg-white hover:shadow-md">
          {serviceFotoUrl && (
            <Image
              alt={titulo}
              className="block border-hidden rounded-full object-cover oject-center"
              height={300}
              src={urlBuilder(serviceFotoUrl)}
              width={300}
            />
          )}
          <h4 className="my-5 text-center">{titulo}</h4>
          <p className="text-center">
            {extracto}
          </p>
          <span className="mt-5 text-primary link-underline">
            {buttonLabels.bookNow[language]}
          </span>
        </a>
      </Link>
    );
  });

  return (
    <Page classNames="relative">
      <Hero
        title={titulo}
        subtitle={subtitulo}
        photo={fotoUrl}
        scrollButton={buttonLabels.scrollDown[language]}
      />
      <About content={contenidoPrincipal} />
      <Container classNames="px-2 py-10 md:p-10">
        <Carousel slides={serviceSlides} />
      </Container>
      <Contact />
      <ScrollToTopButton />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const contenido = await getStrapiCollection("servicios-de-belleza");
  const services = await getStrapiCollection("servicios");

  if (!contenido) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      services,
      contenido,
    },
  };
};

export default Services;

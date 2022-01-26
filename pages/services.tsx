import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";

import Page from "components/page";
import Hero from "components/hero";
import ScrollToTopButton from "components/scrollToTopButton";

import { useLanguage } from "contexts/language";

import About from "sections/about";
import Contact from "sections/contact";

import { buttonLabels } from "lib/data/labels";
import { getStoredLanguage } from "lib/helpers";
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
        {services?.data.map((service: any, index: number) => {
          const {
            attributes: {
              titulo,
              extracto,
              precio,
              contenido,
              fotoPrincipal: {
                data: {
                  attributes: { url: fotoUrl },
                },
              },
            },
          } = service;
          return (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3">
              <h2>{titulo}</h2>
            </div>
          );
        })}
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

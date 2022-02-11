import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

import Page from "components/page";
import Hero from "components/hero";

import About from "sections/about";
import Contact from "sections/contact";
import Services from "sections/services";
import Testimonials from "sections/testimonials";

import { buttonLabels } from "lib/data/labels";
import { getStrapiCollection } from "lib/strapi-api";
import { formatMetaDescription } from "lib/helpers";

const Home: NextPage = ({
  contenido,
  informacionDelContacto,
  servicios,
  testimonials,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { asPath, locale } = useRouter();
  const language = locale === "en" ? "en" : "es-MX";
  const isHome = asPath === '/';

  const {
    data: {
      attributes: {
        titulo: titulo,
        subtitulo: subtitulo,
        contenido: contenidoPrincipal,
        mediaPrincipal,
      },
    },
  } = contenido;

  const {
    data: {
      attributes: { url: mediaUrl, mime },
    },
  } = mediaPrincipal;

  let videoUrl = undefined;
  let fotoUrl = undefined;

  if (mime && mime.indexOf("video") >= 0) {
    videoUrl = mediaUrl;
  } else {
    fotoUrl = mediaUrl;
  }

  return (
    <Page
      classNames="relative"
      title={titulo}
      image={fotoUrl}
      description={contenidoPrincipal ? formatMetaDescription(contenidoPrincipal) : titulo}
      socialDetails={informacionDelContacto?.data}
    >
      <Hero
        isHome={isHome}
        title={titulo}
        subtitle={subtitulo}
        photo={fotoUrl}
        video={videoUrl}
        scrollButton={buttonLabels.scrollDown[language]}
      />
      <About content={contenidoPrincipal} />
      <Services serviceList={servicios?.data} />
      <Testimonials testimonialList={testimonials?.data} />
      <Contact contactDetails={informacionDelContacto?.data} />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async (PageContext) => {
  const { locale } = PageContext;
  const contenido = await getStrapiCollection("inicio", "*", locale);
  const servicios = await getStrapiCollection("servicios", "*", locale);
  const testimonials = await getStrapiCollection("testimonios", "*", locale);
  const informacionDelContacto = await getStrapiCollection(
    "informacion-del-contacto",
    "*",
    locale
  );

  if (!contenido || !servicios || !informacionDelContacto) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      contenido,
      informacionDelContacto,
      servicios,
      testimonials,
    },
    revalidate: 1,
  };
};

export default Home;

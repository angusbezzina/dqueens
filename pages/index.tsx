import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

import Page from "components/page";
import Hero from "components/hero";
import ScrollToTopButton from "components/scrollToTopButton";

import About from "sections/about";
import Contact from "sections/contact";
import Services from "sections/services";
import Testimonials from "sections/testimonials";

import { getVideo } from "lib/pexels";
import { buttonLabels } from "lib/data/labels";
import { getStrapiCollection } from "lib/strapi-api";

const Home: NextPage = ({
  contenido,
  informacionDelContacto,
  servicios,
  testimonials,
  video,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { locale } = useRouter();
  const language = locale === 'en' ? 'en' : 'es-MX';

  const {
    data: {
      attributes: {
        titulo: titulo,
        subtitulo: subtitulo,
        contenido: contenidoPrincipal,
        fotoPrincipal: fotoPrincipal,
        videoUrl,
      },
    },
  } = contenido;

  const {
    data: {
      attributes: { url: fotoUrl },
    },
  } = fotoPrincipal;

  const heroVideo = videoUrl ? videoUrl : video?.video_files[0]?.link;

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
        video={heroVideo}
        scrollButton={buttonLabels.scrollDown[language]}
      />
      <About content={contenidoPrincipal} />
      <Services serviceList={servicios?.data} />
      <Testimonials testimonialList={testimonials?.data} />
      <Contact contactDetails={informacionDelContacto?.data} />
      <ScrollToTopButton />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async (PageContext) => {
  const { locale } = PageContext;
  const contenido = await getStrapiCollection("inicio", "*", locale);
  const servicios = await getStrapiCollection("servicios", "*", locale);
  const testimonials = await getStrapiCollection("testimonios", "*", locale);
  const video = await getVideo(5524244);
  const informacionDelContacto = await getStrapiCollection("informacion-del-contacto","*", locale);

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
      video,
    },
  };
};

export default Home;

import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";

import Page from "components/page";
import Hero from "components/hero";
import ScrollToTopButton from "components/scrollToTopButton";

import { useLanguage } from "contexts/language";

import About from "sections/about";
import Contact from "sections/contact";
import Services from "sections/services";
import OpenHours from "sections/openHours";

import { getVideo } from "lib/pexels";
import { buttonLabels } from "lib/data/labels";
import { getStoredLanguage } from "lib/helpers";
import { getStrapiCollection } from "lib/strapi-api";

const Home: NextPage = ({
  contenido,
  video,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const languageState = useLanguage();
  const language = languageState.state.language;

  console.log(contenido);

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

  getStoredLanguage();

  return (
    <Page classNames="relative">
      <Hero
        title={titulo}
        subtitle={subtitulo}
        video={video?.video_files[0]?.link}
        scrollButton={buttonLabels.scrollDown[language]}
      />
      <About content={contenidoPrincipal} />
      <Services />
      <OpenHours />
      <Contact />
      <ScrollToTopButton />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const contenido = await getStrapiCollection("inicio");
  const video = await getVideo(5524244);

  if (!contenido) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      video,
      contenido,
    },
  };
};

export default Home;

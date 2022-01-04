import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";

import Page from "components/page";
import Hero from "components/hero";
import ScrollToTopButton from "components/scrollToTopButton";

import { useLanguage } from "contexts/language";

import Contact from "sections/contact";
import Services from "sections/services";
import OpenHours from "sections/openHours";

import { getVideo } from "lib/pexels";
import { heroTitles, buttonLabels } from "lib/data/labels";
import { getStoredLanguage } from "lib/helpers/miscellaneous";

const Home: NextPage = ({
  video,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const languageState = useLanguage();
  const language = languageState.state.language;

  getStoredLanguage();

  return (
    <Page classNames="relative">
      <Hero
        title="D'Queens"
        subtitle={heroTitles.subtitle[language]}
        video={video?.video_files[0]?.link}
        scrollButton={buttonLabels.scrollDown[language]}
      />
      <Services />
      <OpenHours />
      <Contact />
      <ScrollToTopButton />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const video = await getVideo(5524244);

  if (!video) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      video,
    },
  };
};

export default Home;

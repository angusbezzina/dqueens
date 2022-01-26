import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
  InferGetStaticPropsType,
} from "next";
import slugify from "slugify";
import { useRouter } from "next/router";

import Page from "components/page";
import Hero from "components/hero";
import ScrollToTopButton from "components/scrollToTopButton";

import { useLanguage } from "contexts/language";

import Contact from "sections/contact";
import Services from "sections/services";

import { buttonLabels, sectionTitles } from "lib/data/labels";
import { formatMarkdown } from "lib/markdown";
import { getStrapiCollection, getStrapiPostBySlug } from "lib/strapi-api";
import Container from "components/container";

const Article: NextPage = ({
  article,
  services,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const languageState = useLanguage();
  const language = languageState.state.language;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const {
    attributes: {
      titulo,
      contenido,
      fotoPrincipal: {
        data: {
          attributes: { url: fotoUrl },
        },
      },
    },
  } = article;

  return (
    <Page classNames="relative">
      <Hero
        isSinglePost
        photo={fotoUrl}
        scrollButton={buttonLabels.scrollDown[language]}
        title={titulo}
      />
      <Container classNames="px-2 py-10 md:p-10 border-bottom-gold">
        <div
          className="markdown-styles"
          dangerouslySetInnerHTML={{
            __html: contenido ? formatMarkdown(contenido) : "",
          }}
        />
      </Container>
      <Services serviceList={services?.data} />
      <ScrollToTopButton />
    </Page>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getStrapiCollection("articulos");

  const paths = articles?.data.map((article: any) => ({
    params: { slug: slugify(article?.attributes?.titulo, { lower: true }) },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let slug = params?.slug;
  slug = typeof slug === "string" ? slug : "";

  let article = await getStrapiPostBySlug("articulos", slug);

  const services = await getStrapiCollection("servicios");

  if (Array.isArray(article?.data) && article?.data.length === 1) {
    article = article?.data[0];
  } else {
    throw new Error("Unexpected number of posts received");
  }

  return {
    props: {
      article,
      services,
    },
  };
};

export default Article;

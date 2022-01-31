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

import Services from "sections/services";

import { buttonLabels } from "lib/data/labels";
import { formatMarkdown } from "lib/markdown";
import { formatDate } from "lib/helpers";
import { getStrapiCollection } from "lib/strapi-api";
import Container from "components/container";

const Article: NextPage = ({
  article,
  informacionDelContacto,
  services,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { locale, isFallback } = useRouter();
  const language = locale === "en" ? "en" : "es-MX";

  if (isFallback) {
    return <div>Loading...</div>;
  }

  const {
    attributes: {
      titulo,
      contenido,
      createdAt,
      fotoPrincipal: {
        data: {
          attributes: { url: fotoUrl },
        },
      },
    },
  } = article;

  return (
    <Page
      classNames="relative"
      title={titulo}
      image={fotoUrl}
      description={contenido.substring(0, 100)}
      socialDetails={informacionDelContacto?.data}
    >
      <Hero
        isSinglePost
        photo={fotoUrl}
        scrollButton={buttonLabels.scrollDown[language]}
        title={titulo}
      />
      <Container classNames="px-2 py-10 md:p-10 border-bottom-gold">
        <h4 className="text-secondary">{formatDate(createdAt)}</h4>
        <div
          className="markdown-styles"
          dangerouslySetInnerHTML={{
            __html: contenido ? formatMarkdown(contenido) : "",
          }}
        />
      </Container>
      <Services serviceList={services?.data} />
    </Page>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const articles = await getStrapiCollection("articulos");

  let paths: any[] = [];

  articles?.data.forEach((article: any) => {
    if (locales) {
      for (const locale of locales) {
        paths.push({
          params: {
            slug: slugify(article?.attributes?.titulo, { lower: true }),
          },
          locale,
        });
      }
    } else {
      paths = articles?.data.map((article: any) => ({
        params: {
          slug: slugify(article?.attributes?.titulo, { lower: true }),
        },
      }));
    }
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  let slug = params?.slug;
  slug = typeof slug === "string" ? slug : "";

  let article = await getStrapiCollection("articulos", "*", locale, slug);

  const services = await getStrapiCollection("servicios", "*", locale);
  const informacionDelContacto = await getStrapiCollection(
    "informacion-del-contacto",
    "*",
    locale
  );

  if (Array.isArray(article?.data) && article?.data.length === 1) {
    article = article?.data[0];
  } else if (Array.isArray(article?.data) && article?.data.length > 1) {
    article = article?.data.find(
      (article: any) => article.attributes.slug === slug
    );
  } else {
    throw new Error("Unexpected number of posts received");
  }

  if (!article || !informacionDelContacto || !services) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article,
      informacionDelContacto,
      services,
    },
    revalidate: 1,
  };
};

export default Article;

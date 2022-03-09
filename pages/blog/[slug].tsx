import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
  InferGetStaticPropsType,
} from "next";
import slugify from "slugify";
import { useRouter } from "next/router";

import Container from "components/container";
import Hero from "components/hero";
import Page from "components/page";

import Services from "sections/services";

import { buttonLabels, sectionTitles } from "lib/data/labels";
import { formatMarkdown } from "lib/markdown";
import { formatDate, formatMetaDescription } from "lib/helpers";
import { getStrapiCollection } from "lib/strapi-api";
import { faFacebook, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Article: NextPage = ({
  article,
  localizedArticle,
  informacionDelContacto,
  services,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { locale, isFallback, asPath } = useRouter();
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
      description={contenido ? formatMetaDescription(contenido) : titulo}
      socialDetails={informacionDelContacto?.data}
      localizedPageUrl={`/blog/${localizedArticle}`}
    >
      <Hero
        isSinglePost
        photo={fotoUrl}
        scrollButton={buttonLabels.scrollDown[language]}
        title={titulo}
      />
      <div className="md:bg-secondary md:bg-opacity-80 md:py-10">
        <Container classNames="px-2 py-10 md:rounded-lg md:bg-white md:p-10 border-bottom-gold">
          <h4 className="text-secondary">{formatDate(createdAt)}</h4>
          <div
            className="markdown-styles"
            dangerouslySetInnerHTML={{
              __html: contenido ? formatMarkdown(contenido) : "",
            }}
          />
          <div className="text-center mt-10">
            <h6 className="text-secondary">{sectionTitles.share[language]}:</h6>
            <ul className="flex justify-center items-center text-primary">
              <li>
                <a
                  className="hover hover:text-secondary"
                  href={`https://www.facebook.com/sharer.php?u=https://dqueens.com.mx${asPath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="text-2xl mx-5"
                  />
                </a>
              </li>
              <li>
                <a
                  className="hover hover:text-secondary"
                  href={`https://twitter.com/intent/tweet?url=https://dqueens.com.mx${asPath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faTwitter} className="text-2xl mx-5" />
                </a>
              </li>
              <li>
                <a
                  className="hover hover:text-secondary"
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=https://dqueens.com.mx${asPath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="text-2xl mx-5"
                  />
                </a>
              </li>
            </ul>
          </div>
        </Container>
      </div>
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
    fallback: "blocking",
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

  const {
    attributes: {
      localizations: { data: localizationData },
    },
  } = article;

  const localizedArticle = localizationData.find((article: any) =>
    locale === "en"
      ? article.attributes.locale === "es-MX"
      : article.attributes.locale === "en"
  ).attributes.slug;

  return {
    props: {
      article,
      localizedArticle,
      informacionDelContacto,
      services,
    },
    revalidate: 1,
  };
};

export default Article;

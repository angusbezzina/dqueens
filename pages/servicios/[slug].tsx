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

import Testimonials from "sections/testimonials";

import { buttonLabels, sectionTitles } from "lib/data/labels";
import { formatMarkdown } from "lib/markdown";
import { getStrapiCollection, getStrapiPostBySlug } from "lib/strapi-api";
import Container from "components/container";

const Service: NextPage = ({
  service,
  testimonials,
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
      enlaceDeReserva,
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
    <Page classNames="relative">
      <Hero
        isSinglePost
        photo={fotoUrl}
        scrollButton={buttonLabels.scrollDown[language]}
        title={titulo}
      />
      <a
        href={enlaceDeReserva}
        target="_blank"
        rel="noreferrer"
        className="block w-full p-5 bg-secondary text-white text-center hover:bg-primary"
      >
        <h6 className="text-white mb-0 pb-0">
          {buttonLabels.bookNow[language]}
        </h6>
      </a>
      <Container classNames="px-2 py-10 md:p-10 border-bottom-gold">
        <div
          className="markdown-styles"
          dangerouslySetInnerHTML={{
            __html: contenido ? formatMarkdown(contenido) : "",
          }}
        />
        <div className="flex flex-col items-start">
          <h3 className="mt-8 normal-case">{sectionTitles.prices[language]}</h3>
          <p>{precio}</p>
          <a
            href={enlaceDeReserva}
            target="_blank"
            rel="noreferrer"
            className="inline-block self-center mt-10"
          >
            <h6 className="mb-0 p-5 rounded-lg bg-primary text-white hover:bg-secondary">
              {buttonLabels.bookNow[language]}
            </h6>
          </a>
        </div>
      </Container>
      <Testimonials testimonialList={testimonials?.data} />
      <ScrollToTopButton />
    </Page>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const services = await getStrapiCollection("servicios");

  const paths = services?.data.map((service: any) => ({
    params: { slug: slugify(service?.attributes?.titulo, { lower: true }) },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let slug = params?.slug;
  slug = typeof slug === "string" ? slug : "";

  let service = await getStrapiPostBySlug("servicios", slug);

  const testimonials = await getStrapiCollection("testimonios");

  if (Array.isArray(service?.data) && service?.data.length === 1) {
    service = service?.data[0];
  } else {
    throw new Error("Unexpected number of posts received");
  }

  return {
    props: {
      service,
      testimonials,
    },
  };
};

export default Service;

import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
  InferGetStaticPropsType,
} from "next";
import slugify from "slugify";
import { useRouter } from "next/router";

import Container from "components/container";
import Page from "components/page";
import Hero from "components/hero";

import Testimonials from "sections/testimonials";
import Contact from "sections/contact";

import { buttonLabels, sectionTitles } from "lib/data/labels";
import { formatMarkdown } from "lib/markdown";
import { getStrapiCollection } from "lib/strapi-api";
import { formatMetaDescription } from "lib/helpers";

const Service: NextPage = ({
  informacionDelContacto,
  localizedService,
  service,
  testimonials,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { isFallback, locale } = useRouter();
  const language = locale === "en" ? "en" : "es-MX";

  if (isFallback) {
    return <div>Loading...</div>;
  }

  const {
    attributes: {
      titulo,
      enlaceDeReserva,
      precio,
      contenido,
      testimonios: { data: serviceTestimonios },
      fotoPrincipal: {
        data: {
          attributes: { url: fotoUrl },
        },
      },
    },
  } = service;

  const testimonialList =
    !serviceTestimonios || serviceTestimonios.length < 1
      ? testimonials?.data
      : serviceTestimonios;

  return (
    <Page
      classNames="relative"
      title={titulo}
      image={fotoUrl}
      description={contenido ? formatMetaDescription(contenido) : titulo}
      socialDetails={informacionDelContacto?.data}
      localizedPageUrl={`/servicios/${localizedService}`}
    >
      <Hero
        isSinglePost
        photo={fotoUrl}
        scrollButton={buttonLabels.scrollDown[language]}
        title={titulo}
      />
      <a
        href={enlaceDeReserva}
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
          <a href={enlaceDeReserva} className="inline-block self-center mt-10">
            <h6 className="mb-0 p-5 rounded-lg bg-primary text-white hover:bg-secondary">
              {buttonLabels.bookNow[language]}
            </h6>
          </a>
        </div>
      </Container>
      <Testimonials testimonialList={testimonialList} />
      <Contact contactDetails={informacionDelContacto?.data} />
    </Page>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const services = await getStrapiCollection("servicios", "*");
  let paths: any[] = [];

  services?.data.forEach((service: any) => {
    if (locales) {
      for (const locale of locales) {
        paths.push({
          params: {
            slug: slugify(service?.attributes?.titulo, { lower: true }),
          },
          locale,
        });
      }
    } else {
      paths = services?.data.map((service: any) => ({
        params: { slug: slugify(service?.attributes?.titulo, { lower: true }) },
      }));
    }
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (PageContext) => {
  const { params, locale } = PageContext;
  let slug = params?.slug;
  slug = typeof slug === "string" ? slug : "";

  let service = await getStrapiCollection("servicios", "*", locale, slug);

  const testimonials = await getStrapiCollection("testimonios", "*", locale);
  const informacionDelContacto = await getStrapiCollection(
    "informacion-del-contacto",
    "*",
    locale
  );

  if (Array.isArray(service?.data) && service?.data.length === 1) {
    service = service?.data[0];
  } else if (Array.isArray(service?.data) && service?.data.length > 1) {
    service = service?.data.find(
      (service: any) => service.attributes.slug === slug
    );
  } else {
    throw new Error("Unexpected number of posts received");
  }

  if (!service || !informacionDelContacto) {
    return {
      notFound: true,
    };
  }

  const {
    attributes: {
      localizations: { data: localizationData },
    },
  } = service;

  const localizedService = localizationData.find((service: any) =>
    locale === "en"
      ? service.attributes.locale === "es-MX"
      : service.attributes.locale === "en"
  ).attributes.slug;

  return {
    props: {
      informacionDelContacto,
      service,
      localizedService,
      testimonials,
    },
    revalidate: 1,
  };
};

export default Service;

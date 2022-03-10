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
import Share from "components/share";

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
  const { isFallback, locale, asPath } = useRouter();
  const language = locale === "en" ? "en" : "es-MX";
  const pageUrl = `https://www.dqueens.com.mx${
    locale === "en" ? "/en" : ""
  }${asPath}`;

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
        isSinglePost="servicio"
        photo={fotoUrl}
        scrollButton={buttonLabels.scrollDown[language]}
        title={titulo}
      />
      {/* <a
        href={enlaceDeReserva}
        className="block w-full p-5 bg-secondary text-white text-center hover hover:bg-primary"
      >
        <h6 className="text-white mb-0 pb-0">
          {buttonLabels.bookNow[language]}
        </h6>
      </a> */}
      <div className="xl:bg-secondary xl:bg-opacity-80 xl:py-10">
        <Container classNames="px-2 py-10 xl:rounded-lg xl:bg-white md:p-10">
          <div
            className="markdown-styles"
            dangerouslySetInnerHTML={{
              __html: contenido ? formatMarkdown(contenido) : "",
            }}
          />
          <div className="flex flex-col items-start">
            <h4 className="mt-8 normal-case">
              {sectionTitles.prices[language]}
            </h4>
            <p>{precio}</p>
            <a
              href={enlaceDeReserva}
              className="w-full text-center inline-block mt-10"
            >
              <h6 className="mb-0 p-5 w-full rounded-lg bg-primary border-white border-2 text-white hover hover:border-primary hover:text-primary hover:bg-white">
                {buttonLabels.bookNow[language]}
              </h6>
            </a>
            <Share url={pageUrl} title={sectionTitles.share[language]} />
          </div>
        </Container>
      </div>
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

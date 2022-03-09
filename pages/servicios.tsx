import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import Container from "components/container";
import Hero from "components/hero";
import Page from "components/page";

import About from "sections/about";
import Contact from "sections/contact";

import { buttonLabels, sectionTitles } from "lib/data/labels";
import { getStrapiCollection } from "lib/strapi-api";
import { formatMetaDescription, usePagination } from "lib/helpers";
import Pagination from "components/pagination";

const Services: NextPage = ({
  contenido,
  informacionDelContacto,
  categories,
  services,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { locale } = useRouter();
  const language = locale === "en" ? "en" : "es-MX";
  const [activeCategories, setActiveCategories] = useState(["all"]);
  const [results, setResults] = useState([]);
  const {
    getResults,
    currentPage,
    totalPages,
    visibleResults,
    pageForwards,
    pageBackwards,
  } = usePagination(results);
  const filterResults = (category: string) => {
    if (activeCategories.includes(category)) {
      const newCategories = activeCategories.filter(
        (activeCategory: string) => activeCategory !== category
      );
      setActiveCategories(newCategories);
    } else {
      const newCategories = [...activeCategories, category];
      setActiveCategories(newCategories);
    }
  };

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

  useMemo(() => getResults(currentPage, results), [currentPage, results]);

  useEffect(() => {
    const resultList = services?.data
      .filter((service: any) => {
        const {
          attributes: { categorias },
        } = service;

        if (
          !activeCategories.length ||
          (!activeCategories.includes("all") &&
            !categorias?.data.some((category: any) =>
              activeCategories.includes(category?.attributes.titulo)
            ))
        ) {
          return false;
        }

        return true;
      })
      .sort((a: any, b: any) =>
        a?.attributes?.titulo.localeCompare(b?.attributes?.titulo)
      );

    setResults(resultList);

    return () => {};
  }, [activeCategories, services]);

  return (
    <Page
      classNames="relative"
      title={titulo}
      image={fotoUrl}
      description={
        contenidoPrincipal ? formatMetaDescription(contenidoPrincipal) : titulo
      }
      socialDetails={informacionDelContacto?.data}
    >
      <Hero
        title={titulo}
        subtitle={subtitulo}
        photo={fotoUrl}
        video={videoUrl}
        scrollButton={buttonLabels.scrollDown[language]}
      />
      <About content={contenidoPrincipal} />
      <h4 className="text-center pb-0 my-5">{sectionTitles.categories[language]}</h4>
      <div className="w-full mx-auto flex flex-row justify-center px-4 md:px-0 my-5 md:container">
        <div className="max-w-full mx-auto overflow-x-auto">
          <button
            className={`rounded-lg border-2 text-lg px-5 py-2 mr-2 border-secondary ${
              activeCategories.includes("all")
                ? "bg-secondary text-white"
                : "bg-white text-secondary"
            } `}
            onClick={() => filterResults("all")}
            data-category="all"
          >
            All
          </button>
          {categories &&
            categories?.data.map((category: any) => {
              const {
                id,
                attributes: { titulo },
              } = category;

              return (
                <button
                  key={id}
                  className={`rounded-lg text-xl border-2 px-5 py-2 mr-2 border-secondary ${
                    activeCategories.includes(titulo)
                      ? "bg-secondary text-white"
                      : "bg-white text-secondary"
                  }`}
                  onClick={() => filterResults(titulo)}
                  data-category={titulo}
                >
                  {titulo}
                </button>
              );
            })}
        </div>
      </div>
      <Container classNames="px-2 py-10 md:p-10 md:pt-0">
        <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleResults &&
            visibleResults?.map((service: any, index: number) => {
              const {
                attributes: { titulo, slug, extracto, fotoPrincipal },
              } = service;

              const {
                data: {
                  attributes: { url: serviceFotoUrl },
                },
              } = fotoPrincipal;

              return (
                <Link href={`/servicios/${slug}`} key={index}>
                  <a className="relative flex flex-col m-2 p-5 pb-16 items-center rounded-lg justify-start shadow-none hover-text-white hover hover:bg-primary hover:text-white hover:shadow-lg">
                    {serviceFotoUrl && (
                      <Image
                        alt={titulo}
                        className="block border-hidden rounded-full object-cover oject-center"
                        height={300}
                        priority={true}
                        src={serviceFotoUrl}
                        width={300}
                      />
                    )}
                    <h4 className="my-5 text-center">{titulo}</h4>
                    <p className="text-center">{extracto}</p>
                    <span className="block bottom-5 link-underline link-underline--absolute">
                      {buttonLabels.bookNow[language]}
                    </span>
                  </a>
                </Link>
              );
            })}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={pageForwards}
          prevPage={pageBackwards}
        />
      </Container>
      <Contact contactDetails={informacionDelContacto?.data} />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async (PageContext) => {
  const { locale } = PageContext;
  const contenido = await getStrapiCollection(
    "servicios-de-belleza",
    "*",
    locale
  );
  const services = await getStrapiCollection("servicios", "*", locale);
  const informacionDelContacto = await getStrapiCollection(
    "informacion-del-contacto",
    "*",
    locale
  );
  const categories = await getStrapiCollection("categorias", "*", locale);

  if (!contenido || !informacionDelContacto || !services) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      services,
      contenido,
      categories,
      informacionDelContacto,
    },
    revalidate: 1,
  };
};

export default Services;

import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import Container from "components/container";
import Page from "components/page";
import Hero from "components/hero";
import Pagination from "components/pagination";

import About from "sections/about";
import Contact from "sections/contact";

import { buttonLabels, sectionTitles } from "lib/data/labels";
import { getStrapiCollection } from "lib/strapi-api";
import { formatMetaDescription, usePagination } from "lib/helpers";

const Blog: NextPage = ({
  articulos,
  contenido,
  categories,
  informacionDelContacto,
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
        fotoPrincipal: fotoPrincipal,
      },
    },
  } = contenido;

  const {
    data: {
      attributes: { url: fotoUrl },
    },
  } = fotoPrincipal;

  useMemo(() => getResults(currentPage, results), [currentPage, results]);

  useEffect(() => {
    const resultList = articulos?.data
      .filter((articulo: any) => {
        console.log(articulo);
        const {
          attributes: { categoria_de_articulos: categorias },
        } = articulo;

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
      .sort((a: any, b: any) => {
        const dateA: any = new Date(a?.attributes?.updatedAt);
        const dateB: any = new Date(b?.attributes?.updatedAt);

        return dateB - dateA;
      }
      );

    setResults(resultList);

    return () => {};
  }, [activeCategories, articulos]);

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
        scrollButton={buttonLabels.scrollDown[language]}
      />
      <About content={contenidoPrincipal} />
      <h4 className="text-center pb-0 my-5">
        {sectionTitles.categories[language]}
      </h4>
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
            visibleResults?.map((articulo: any, index: number) => {
              const {
                attributes: {
                  titulo,
                  slug,
                  fotoPrincipal: {
                    data: {
                      attributes: { url: fotoUrl },
                    },
                  },
                },
              } = articulo;

              return (
                <Link key={index} href={`/blog/${slug}`}>
                  <a className="p-5 block flex flex-col justify-start items-center hover-text-white rounded-lg text-white md:text-primary bg-primary md:bg-white hover md:hover:bg-primary md:hover:text-white md:shadow-none md:hover:shadow-lg">
                    <div className="relative block h-48 w-full mb-5">
                      {fotoUrl && (
                        <Image
                          className="object-cover rounded-lg"
                          src={fotoUrl}
                          alt={titulo}
                          layout="fill"
                          priority={true}
                        />
                      )}
                    </div>
                    <div className="w-full">
                      <h6 className="text-white md:text-primary">{titulo}</h6>
                      <span className="absolute left-0 bottom-0 link-underline">
                        {buttonLabels.readMore[language]}
                      </span>
                    </div>
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
  const contenido = await getStrapiCollection("blog", "*", locale);
  const articulos = await getStrapiCollection("articulos", "*", locale);
  const informacionDelContacto = await getStrapiCollection(
    "informacion-del-contacto",
    "*",
    locale
  );

  const categories = await getStrapiCollection(
    "articulo-categorias",
    "*",
    locale
  );

  if (!contenido || !articulos || !informacionDelContacto) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      articulos,
      contenido,
      categories,
      informacionDelContacto,
    },
    revalidate: 1,
  };
};

export default Blog;

import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Page from "components/page";
import Hero from "components/hero";
import ScrollToTopButton from "components/scrollToTopButton";

import About from "sections/about";
import Contact from "sections/contact";

import { buttonLabels, sectionTitles } from "lib/data/labels";
import { urlBuilder } from "lib/helpers";
import { getStrapiCollection } from "lib/strapi-api";
import Container from "components/container";

const Blog: NextPage = ({
  articulos,
  contenido,
  informacionDelContacto,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { locale } = useRouter();
    const language = locale === "en" ? "en" : "es-MX";

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

  const {
    data: {
      attributes: { url: fotoUrl },
    },
  } = fotoPrincipal;

  return (
    <Page classNames="relative" socialDetails={informacionDelContacto?.data}>
      <Hero
        title={titulo}
        subtitle={subtitulo}
        photo={fotoUrl}
        scrollButton={buttonLabels.scrollDown[language]}
      />
      <About content={contenidoPrincipal} />
      <Container classNames="grid grid-cols-1 gap-2 md:grid-cols-3 px-2 py-10 md:p-10">
        <h2 className="text-center md:col-span-3">
          {sectionTitles.articles[language]}
        </h2>
        {articulos?.data.map((articulo: any, index: number) => {
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
              <a className="p-5 block flex flex-col justify-center items-center hover-text-white rounded-lg text-white md:text-primary bg-primary md:bg-white md:hover:bg-primary md:hover:text-white md:shadow-none md:hover:shadow-md">
                <div className="relative block h-48 w-full mb-5">
                  <Image
                    className="rounded-lg"
                    src={urlBuilder(fotoUrl)}
                    alt={titulo}
                    layout="fill"
                  />
                </div>
                <div>
                  <h6 className="text-white md:text-primary">{titulo}</h6>
                  <span className="text-left link-underline">
                    {buttonLabels.readMore[language]}
                  </span>
                </div>
              </a>
            </Link>
          );
        })}
      </Container>
      <Contact contactDetails={informacionDelContacto?.data} />
      <ScrollToTopButton />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async (PageContext) => {
  const { locale } = PageContext;
  const contenido = await getStrapiCollection("blog", "*", locale);
  const articulos = await getStrapiCollection("articulos", "*", locale);
  const informacionDelContacto = await getStrapiCollection("informacion-del-contacto", "*", locale);

  if (!contenido || !articulos || !informacionDelContacto) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      articulos,
      contenido,
      informacionDelContacto,
    },
  };
};

export default Blog;

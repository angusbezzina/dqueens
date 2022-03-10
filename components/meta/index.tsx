import Head from "next/head";
import { useRouter } from "next/router";

export interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
}

const Meta = ({ title, description, image }: MetaProps) => {
  const { locale, asPath } = useRouter();
  const pageUrl = `https://www.dqueens.com.mx${
    locale === "en" ? "/en" : ""
  }${asPath}`;

  return (
    <Head>
      <title>{title ? title : `D'Queens Salon de Belleza`}</title>
      <meta
        name="description"
        content={
          description ? description : `Beauty Salon in Queretaro, Mexico`
        }
      />
      <meta
        name="keywords"
        content="Belleza, Salon de Belleza, Queretaro, Beauty, Beauty Salon"
      />

      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      {image && <meta property="og:image" content={image} />}
      <meta
        property="og:url"
        content={pageUrl}
      />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="D'Queens Salon de Belleza" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:url"
        content={pageUrl}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Head>
  );
};

export default Meta;

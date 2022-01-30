import Head from "next/head";
import { useRouter } from "next/router";

export interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
}

const Meta = ({ title, description, image }: MetaProps) => {
  const { asPath } = useRouter();

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
      <meta property="og:url" content={`https://www.dqueens.com.mx${asPath}`} />
      <meta name="twitter:card" content="summary_large_image" />

      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="D'Queens Salon de Belleza" />
    </Head>
  );
};

export default Meta;

import Head from "next/head";

export interface MetaProps {
  title?: string;
  description?: string;
  image?: string; 
}

const Meta = ({ title, description, image }: MetaProps) => {

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
      ></meta>
    </Head>
  );
};

export default Meta;

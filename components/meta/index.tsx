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
      <meta name="description" content={description ? description : `Beauty Salon in Queretaro, Mexico`} />
      <meta name="description" content={description ? description : `Beauty Salon in Queretaro, Mexico`} />
      {/* <script async src="https://aframe.io/releases/1.0.0/aframe.min.js" />
      <script
        async
        src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"
      /> */}
    </Head>
  );
};

export default Meta;

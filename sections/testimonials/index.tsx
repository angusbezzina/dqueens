import Image from "next/image";
import { useRouter } from "next/router";

import Container from "components/container";
import Carousel from "components/carousel";

import { sectionTitles } from "lib/data/labels";
import { urlBuilder } from "lib/helpers";

const Testimonials = (testimonialData: any) => {
  const { locale } = useRouter();
  const language = locale === "en" ? "en" : "es-MX";

  const { testimonialList } = testimonialData;

  console.log(testimonialList);

  const testimonialSlides = testimonialList.map(
    (testimonial: any, index: number) => {
      const {
        attributes: { titulo, comentario, foto },
      } = testimonial;

      return (
        <div
          key={index}
          className="flex flex-col p-5 items-center bg-primary text-white rounded-lg justify-center text-center shadow-md"
        >
          {foto && (
            <Image
              className="object-cover object-center border-hidden rounded-full"
              src={urlBuilder(foto.data?.attributes?.url)}
              alt={titulo}
              height={200}
              width={200}
            />
          )}
          <h6 className="mt-5 text-white underline underline-offset-8 decoration-secondary">
            {titulo}
          </h6>
          <div>{comentario}</div>
        </div>
      );
    }
  );

  return (
    <Container classNames="px-2 py-10 md:p-10 border-bottom-gold">
      <h3 className="text-center">{sectionTitles.testimonials[language]}</h3>
      {testimonialList && <Carousel slides={testimonialSlides} />}
    </Container>
  );
};

export default Testimonials;

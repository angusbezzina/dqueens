import Image from "next/image";

import Container from "components/container";
import Carousel from "components/carousel";

import { sectionTitles } from "lib/data/labels";
import { urlBuilder } from "lib/helpers";

import { useLanguage } from "contexts/language";

const Testimonials = (testimonialData: any) => {
  const languageState = useLanguage();
  const language = languageState.state.language;
  const { testimonialList } = testimonialData;

  const testimonialSlides = testimonialList.map(
    (testimonial: any, index: number) => {
      const {
        attributes: { titulo, comentario, foto },
      } = testimonial;

      const {
        data: {
          attributes: { url: fotoUrl },
        },
      } = foto;

      return (
        <div
          key={index}
          className="flex p-5 items-center bg-primary text-white rounded-lg justify-center text-center shadow-md"
        >
          {fotoUrl && (
            <Image
              className="object-cover oject-center border-hidden rounded-full"
              src={urlBuilder(fotoUrl)}
              alt={titulo}
              height={200}
              width={200}
            />
          )}
          <h6 className="mt-5 text-white underline underline-offset-8 decoration-secondary-100">
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

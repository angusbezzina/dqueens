import React, { ReactNode } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/splide/dist/css/themes/splide-default.min.css";

interface CarouselProps {
  slides: ReactNode[];
}

const Carousel = ({ slides }: CarouselProps) => {
  return (
    <Splide
      options={{
        perPage: 3,
        breakpoints: {
          1024: {
            perPage: 2,
          },
          768: {
            perPage: 1,
          },
        },
        drag: true,
        lazyLoad: true,
        autoplay: true,
        pagination: false,
        rewind: true,
        trimSpace: false,
        speed: 400,
        padding: "0.5rem",
        classes: {
          arrows: "splide__arrows carousel-arrows",
          arrow: "splide__arrow carousel-arrow",
          prev: "splide__arrow--prev carousel-prev",
          next: "splide__arrow--next carousel-next",
        },
      }}
    >
      {slides.map((slide, index) => (
        <SplideSlide key={index}>{slide}</SplideSlide>
      ))}
    </Splide>
  );
};

export default Carousel;

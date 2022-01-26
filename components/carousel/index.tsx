import React, { ReactNode } from "react";
import Slider from "react-slick";

interface CarouselProps {
  slides: ReactNode[];
}

const Carousel = ({ slides }: CarouselProps) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {slides}
    </Slider>
  );
};

export default Carousel;

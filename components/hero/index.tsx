import Image from "next/image";

import Container from "components/container";

import ScrollDownButton from "components/scrollDownButton";
import { urlBuilder } from "lib/helpers";

interface HeroProps {
  title: string;
  subtitle?: string;
  video?: string;
  photo?: string;
  scrollButton?: string;
  isSinglePost?: boolean;
}

const Hero = ({ title, isSinglePost, subtitle, photo, video, scrollButton }: HeroProps) => {
  const photoUrl = photo ? urlBuilder(photo) : "";

  if (video) {
    return (
      <div className="relative h-108 md:h-screen w-full black-shade">
        <Container classNames="p-2 md:py-2 md:px-10 relative z-10 text-white">
          <h1 className="mt-12 md:mt-0 feature-title">{title}</h1>
          <h5 className="feature-subtitle">{subtitle}</h5>
        </Container>
        <video
          className="absolute top-0 left-0 w-full h-full object-cover object-center z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {scrollButton && (
          <ScrollDownButton
            text={scrollButton}
            classNames="absolute scroll-down right-5 md:right-10 bottom-5 z-10"
          />
        )}
      </div>
    );
  }

  return (
    <div className="relative flex items-center h-108 max-h-screen black-shade w-full">
      <Container classNames="relative z-10 p-2 md:py-2 md:w-1/2 md:px-10 text-white">
        <h1 className={`feature-title-photo text-white md:text-primary mt-12 md:mt-0 ${isSinglePost ? 'single-post-title' : '' }`}>
          {title}
        </h1>
        <h5 className="feature-subtitle">{subtitle}</h5>
      </Container>
      <div className="hidden md:block absolute top-0 right-0 h-full w-1/3 bg-primary" />
      <div className="absolute right-0 md:right-10 w-full h-full md:ml-10 md:h-96 md:w-1/2 z-0">
        <Image
          className="object-cover md:rounded-lg"
          alt={title}
          src={photoUrl}
          layout="fill"
        />
      </div>
      {scrollButton && (
        <ScrollDownButton
          text={scrollButton}
          classNames="absolute scroll-down right-5 md:right-10 bottom-5 z-10 hover:text-white"
        />
      )}
    </div>
  );
};

export default Hero;

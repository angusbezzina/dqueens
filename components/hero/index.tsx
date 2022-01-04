import Container from "components/container";

import ScrollDownButton from "components/scrollDownButton";

interface HeroProps {
  title: string;
  subtitle?: string;
  video?: string;
  scrollButton?: string;
}

const Hero = ({ title, subtitle, video, scrollButton }: HeroProps) => {
  return (
    <div className="relative h-108 md:h-screen w-full white-shade">
      <Container classNames="p-2 md:py-2 md:px-10 relative z-10 text-white">
        <h1 className="mt-12 md:mt-0 feature-title">{title}</h1>
        <h5 className="feature-subtitle">{subtitle}</h5>
      </Container>
      {video && (
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
      )}
      {scrollButton && (
        <ScrollDownButton
          text={scrollButton}
          classNames="absolute scroll-down right-5 md:right-10 bottom-5 z-10"
        />
      )}
    </div>
  );
};

export default Hero;

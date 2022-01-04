interface ScrollDownProps {
  text: string;
  classNames?: string;
}

const ScrollDownButton = ({ text, classNames }: ScrollDownProps) => {
  const scrollIntoView = () => {
    const pageHeight = window.innerHeight;
    const pageWidth = window.innerWidth;
    const distanceToScroll = pageWidth >= 768 ? pageHeight - 80 : 464;  
    window.scrollTo({
      top: distanceToScroll,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`text-white link-underline-animate flex hover:text-primary items-center ${classNames}`}
      onClick={scrollIntoView}
      type="button"
    >
      {text}
    </button>
  );
};

export default ScrollDownButton;

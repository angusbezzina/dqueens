import Logo from "components/logo";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 w-full h-16 p-2 flex items-center justify-between bg-tertiary bg-opacity-90 text-white">
      <Logo size="small" />
    </footer>
  );
};

export default Footer;

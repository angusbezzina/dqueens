import Link from "next/link";

import Logo from "components/logo";
import Nav from "components/nav";

const Header = () => {
  return (
    <header className="fixed top-0 right-0 w-full bg-primary text-white h-20 p-2 md:py-2 md:px-10 flex justify-between align-center shadow-lg z-50">
      <Link href="/">
        <a className="block" title="home">
          <Logo size="large" />
        </a>
      </Link>
      <Nav />
    </header>
  );
};

export default Header;

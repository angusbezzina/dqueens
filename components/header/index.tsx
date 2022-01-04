import React, { useEffect, useState } from "react";

import Link from "next/link";

import Logo from "components/logo";
import Nav from "components/nav";

const Header = () => {
  const [active, setActive] = useState(false);
  const toggleActive = () => {
    const scrollDistance = 110;
    const scrolled = window.scrollY;

    if (scrolled > scrollDistance) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", () => toggleActive());
    return document.removeEventListener("scroll", () => toggleActive());
  }, []);

  return (
    <header
      className={`${
        active ? "bg-primary text-white  shadow-lg" : "text-primary"
      } fixed top-0 right-0 w-full h-20 p-2 md:py-2 md:px-10 flex justify-between align-center z-50`}
    >
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

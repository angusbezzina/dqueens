import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

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

  const { pathname: page, locale } = useRouter();
  const alternateTextColor = page !== "/";
  const language = locale === "en" ? "en" : "es-MX";

  useEffect(() => {
    document.addEventListener("scroll", () => toggleActive());
    return () => document.removeEventListener("scroll", () => toggleActive());
  }, []);

  return (
    <header
      className={`${
        active
          ? "bg-white shadow-lg text-primary"
          : `${alternateTextColor ? "text-white" : "text-primary"}`
      } fixed top-0 right-0 w-full h-20 p-2 md:py-2 md:px-10 flex justify-between align-center z-50`}
    >
      <Link href="/" locale={language}>
        <a className="block" title="home">
          <Logo size="large" />
        </a>
      </Link>
      <Nav headerActive={active} />
    </header>
  );
};

export default Header;

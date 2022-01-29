/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "dqueens.herokuapp.com"],
  },
  i18n: {
    locales: ["en", "es-MX"],
    defaultLocale: "es-MX",
  }
};

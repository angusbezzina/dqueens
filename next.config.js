/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "dqueens.herokuapp.com",
      "dqueens-files.s3.us-west-2.amazonaws.com",
    ],
  },
  i18n: {
    locales: ["en", "es-MX"],
    defaultLocale: "es-MX",
  },
};

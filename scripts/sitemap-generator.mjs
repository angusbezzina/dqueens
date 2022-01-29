import { writeFileSync } from "fs";
import { globby } from "globby";
import prettier from "prettier";
import fetch from "node-fetch";

async function getStrapiCollection(collection) {
  let headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = await fetch(
      `https://dqueens.herokuapp.com/api/${collection}`,
      {
        method: "GET",
        headers,
      }
    );

    if (response.statusCode === 403) {
      throw new Error("Strapi content not found, has it been created?");
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

async function generate() {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  let pages = await globby([
    "pages/*.tsx",
    "data/**/*.mdx",
    "!data/*.mdx",
    "!pages/_*.tsx",
    "!pages/api",
    "!pages/404.tsx",
  ]);
  const services = await getStrapiCollection("servicios");
  const serviceList = services?.data.map(
    (service) => `/servicios/${service?.attributes?.slug}`
  );
  const blogPosts = await getStrapiCollection("articulos");
  const blogPostList = blogPosts?.data.map(
    (blogPost) => `/blog/${blogPost?.attributes?.slug}`
  );

  pages = [...pages, ...serviceList, ...blogPostList];

  const enPages = pages.map((page) =>
    page === "pages/index.tsx" ? "/en/" : `/en${page}`
  );

  pages = [...pages, ...enPages];

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            const path = page
              .replace("pages", "")
              .replace("data", "")
              .replace(".tsx", "")
              .replace(".mdx", "");
            const route = path === "/index" ? "" : path;

            return `
            <url>
              <loc>https://dqueens.com.mx${route}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
            `;
          })
          .join("")}
    </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  // eslint-disable-next-line no-sync
  writeFileSync("public/sitemap.xml", formatted);
}

generate();

const { SitemapStream, streamToPromise } = require("sitemap");
import { IncomingMessage, ServerResponse } from "http";

import { getStrapiCollection } from "lib/strapi-api";

export default async function createSitemap(
  req: IncomingMessage,
  res: ServerResponse
) {
  res.setHeader("Content-Type", "text/xml");
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
      cacheTime: 600000,
    });

    // List of posts
    let posts: any = [];

    const services = await getStrapiCollection("servicios");
    const serviceList = services?.data.map(
      (service: any) => `/servicios/${service?.attributes?.slug}`
    );
    const blogPosts = await getStrapiCollection("articulos");
    const blogPostList = blogPosts?.data.map(
      (blogPost: any) => `/blog/${blogPost?.attributes?.slug}`
    );

    posts = ["/servicios/", "/blog/", ...serviceList, ...blogPostList];

    const enPosts = posts.map((post: string) => `/en${post}`);

    posts = ["/", "/en/", ...posts, ...enPosts];

    // Create each URL row
    for (const post of posts) {
      smStream.write({
        url: post,
        changefreq: "daily",
        priority: 0.9,
      });
    }

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();
    res.write(sitemapOutput);
    res.end();
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end();
  }
}

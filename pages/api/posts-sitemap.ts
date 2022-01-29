import { SitemapStream, streamToPromise } from "sitemap";
import { getStrapiCollection } from "lib/strapi-api";

export default async function (req: any, res: any) {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
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
    posts.forEach((post: string) => {
      smStream.write({
        url: post,
        changefreq: "daily",
        priority: 0.9,
      });
    });

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      "Content-Type": "application/xml",
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch (e) {
    console.log(e);
    res.send(JSON.stringify(e));
  }
}

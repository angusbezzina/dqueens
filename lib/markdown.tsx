import snarkdown from "snarkdown";
import insane from "insane";

const MARKDOWN_SANITISE_OPTIONS: any = {
  allowedAttributes: {
    a: ["href", "name", "target", "rel", "title"],
    iframe: ["allowfullscreen", "frameborder", "src"],
    img: ["src"],
  },
  allowedClasses: {},
  allowedSchemes: ["http", "https", "mailto"],
  allowedTags: [
    "a",
    "article",
    "b",
    "blockquote",
    "br",
    "caption",
    "code",
    "del",
    "details",
    "div",
    "em",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "i",
    "img",
    "li",
    "ol",
    "p",
    "pre",
    "section",
    "span",
    "strike",
    "strong",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "th",
    "thead",
    "tr",
    "u",
    "ul",
  ],
};

export const formatMarkdown = (html: string) =>
  insane(snarkdown(html), MARKDOWN_SANITISE_OPTIONS);

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

import { formatMarkdown } from "lib/markdown";

interface AboutProps {
  content: string;
}

const About = ({ content }: AboutProps) => {
  return (
    <section className="">
      <div
        className="mb-10 px-4"
        dangerouslySetInnerHTML={{
          __html: content ? formatMarkdown(content) : "",
        }}
      />
    </section>
  );
};

export default About;

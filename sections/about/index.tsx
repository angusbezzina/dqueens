import Container from "components/container";

import { formatMarkdown } from "lib/markdown";

interface AboutProps {
  content: string;
}

const About = ({ content }: AboutProps) => {
  return (
    <Container classNames="px-2 py-10 md:p-10 text-center border-bottom-gold">
      <div
        dangerouslySetInnerHTML={{
          __html: content ? formatMarkdown(content) : "",
        }}
      />
    </Container>
  );
};

export default About;

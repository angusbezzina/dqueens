import Container from "components/container";
import Header from "components/header";
import Footer from "components/footer";
import Meta, { MetaProps } from "components/meta";

interface PageProps extends MetaProps {
  children?: React.ReactNode;
  classNames?: string;
  socialDetails: any;
}

const Page = ({ classNames, children, title, description, image, socialDetails, ...props }: PageProps) => {

  return (
    <Container classNames={`min-h-screen relative pb-16 ${classNames}`}>
      <Meta title={title} description={description} image={image} />
      <Header />

      <main className="w-full">
        { children }
      </main>

      <Footer socialDetails={socialDetails} />
    </Container>
  );
};

export default Page;

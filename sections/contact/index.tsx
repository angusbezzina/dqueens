import AddressBar from "components/addressBar";
import Container from "components/container";
import GoogleMap from "components/googleMap";

interface ContactProps {
  contactDetails: any;
}

const Contact = ({ contactDetails }: ContactProps) => {
  return (
    <Container classNames="relative h-three-fifths-md z-0 max-w-none">
      <GoogleMap />
      <AddressBar contactDetails={contactDetails} />
    </Container>
  );
};

export default Contact;

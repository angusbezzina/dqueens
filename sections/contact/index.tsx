import AddressBar from "components/addressBar";
import Container from "components/container";
import GoogleMap from "components/googleMap";

const Contact = () => {
  return (
    <Container classNames="relative h-three-fifths-md z-0">
      <GoogleMap />
      <AddressBar />
    </Container>
  );
};

export default Contact;

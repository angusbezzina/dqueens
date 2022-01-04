import Container from "components/container";

import Table from "components/table";

import { sectionTitles } from "lib/data/labels";
import { services } from "lib/data/services";
import { useLanguage } from "contexts/language";

const Services = () => {
  const languageState = useLanguage();
  const language = languageState.state.language;
  
  return (
    <Container classNames="px-2 py-10 md:p-10 blue-shade">
      <h3>{sectionTitles.services[language]}</h3>
      <Table data={services[language]} />
    </Container>
  );
};

export default Services;

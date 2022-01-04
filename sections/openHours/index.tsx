import Container from "components/container";

import Table from "components/table";

import { useLanguage } from "contexts/language";

import { sectionTitles } from "lib/data/labels";
import { openHours } from "lib/data/openHours";

const OpenHours = () => {
  const languageState = useLanguage();
  const language = languageState.state.language;

  return (
    <Container classNames="px-2 py-10 md:p-10 bg-lightGrey">
      <h3>{sectionTitles.openHours[language]}</h3>
      <Table data={openHours[language]} />
    </Container>
  );
};

export default OpenHours;

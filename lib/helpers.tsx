export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
};

export const formatMetaDescription = (markdownText: string) => {
  const regEx = /^(?!#) *((?:\S+( |$)+){1,20})/gm;
  return markdownText.match(regEx);
};

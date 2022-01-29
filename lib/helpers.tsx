import { STRAPI_API_URL } from "./constants";

export const urlBuilder = (urlPartial: string) => {
  return STRAPI_API_URL + urlPartial;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
};

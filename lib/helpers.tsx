import { STRAPI_API_URL } from "./constants";

export const urlBuilder = (urlPartial: string) => {
  return STRAPI_API_URL + urlPartial;
}

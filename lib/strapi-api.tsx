import { STRAPI_API_URL } from "lib/constants";
import qs from "qs";

let headers = {
  "Content-Type": "application/json",
};

export const getStrapiCollection = async (
  collection: string,
  populate: any = "*",
  locale?: string,
  slug?:string,
) => {
  const query = qs.stringify(
    {
      populate,
      "_locale": locale,
      slug,
    },
    {
      encodeValuesOnly: true,
    }
    );

    console.log(`${STRAPI_API_URL}/api/${collection}?${query}`);

    try {
    const response: any = await fetch(
      `${STRAPI_API_URL}/api/${collection}?${query}`,
      {
        method: "GET",
        headers,
      }
    );

    if (response.statusCode === 403) {
      throw new Error("Strapi content not found, has it been created?");
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};



export const getStrapiUpload = async (collection: string) => {
  try {
    const response: any = await fetch(`${STRAPI_API_URL}/api/${collection}`, {
      method: "GET",
      headers,
    });

    if (response.statusCode === 403) {
      throw new Error("Strapi content not found, has it been created?");
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

// Add to a Collection (Not used in this project)

// Update a Collection (Not used in this project)

export const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "";

export const dqueensLocation = { lat: 20.59377, lng: -100.39746 };

export const STRAPI_API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_STRAPI_API_LOCAL
    : process.env.NEXT_PUBLIC_STRAPI_API_PROD;

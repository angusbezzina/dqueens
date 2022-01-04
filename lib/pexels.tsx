import { createClient } from "pexels";

const PEXELS_API_KEY = process.env.PEXELS_API_KEY ?? "";

export const getVideo = async (id: number) => {
  try {
    const client = createClient(PEXELS_API_KEY);
    const video = client.videos.show({ id: id });

    return video;
  } catch (error) {
    console.error(error);
    throw new Error("Whoops! Something went wrong with Pexel");
  }
};
